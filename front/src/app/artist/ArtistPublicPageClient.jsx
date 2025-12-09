"use client";

import { useEffect, useState } from "react";
import ArtistProfile from "@/features/artists/componensts/artist-profile/ArtistProfile";
import { getArtistById } from "@/features/artists/api/artistApi";
import { approveOrRejectArtist } from "@/features/artists/api/artistAdminApi";
import { useAuth } from "@/features/auth/hooks/useAuth";

function mapArtist(apiArtist) {
    if (!apiArtist) return null;

    return {
        ...apiArtist,
        city: apiArtist.location,
        social: apiArtist.socialMedia || {},
        tags: Array.isArray(apiArtist.specialities)
            ? apiArtist.specialities.map((s) => s.name).filter(Boolean)
            : [],
    };
}

export default function ArtistPublicPageClient() {
    const { token } = useAuth();

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fromPending, setFromPending] = useState(false);

    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const [actionError, setActionError] = useState("");

    useEffect(() => {
        async function loadArtist() {
            try {
                const storedId =
                    typeof window !== "undefined"
                        ? sessionStorage.getItem("selectedArtistId")
                        : null;

                const fromPendingFlag =
                    typeof window !== "undefined"
                        ? sessionStorage.getItem("selectedArtistFromPending") === "true"
                        : false;

                setFromPending(fromPendingFlag);

                if (!storedId) {
                    setError("No se encontró un artista seleccionado.");
                    setLoading(false);
                    return;
                }

                const id = Number(storedId);
                if (Number.isNaN(id)) {
                    setError("El identificador del artista es inválido.");
                    setLoading(false);
                    return;
                }

                const result = await getArtistById(id);

                if (!result.ok) {
                    setError(result.error || "No se pudo cargar el artista.");
                    setLoading(false);
                    return;
                }

                const mapped = mapArtist(result.data);
                setArtist(mapped);
                setLoading(false);
            } catch (e) {
                console.error("Error cargando artista:", e);
                setError("Ocurrió un error al cargar el artista.");
                setLoading(false);
            }
        }

        loadArtist();
    }, []);

    async function handleDecision(approve) {
        if (!fromPending) return; // solo tiene sentido desde pendientes
        if (!artist?.id) return;

        if (!token) {
            setActionError("Necesitas iniciar sesión para moderar perfiles.");
            return;
        }

        setActionLoading(true);
        setActionMessage("");
        setActionError("");

        const res = await approveOrRejectArtist(artist.id, approve, token);

        setActionLoading(false);

        if (!res.ok) {
            setActionError(
                res.error || "No se pudo actualizar el estado del artista."
            );
            return;
        }

        setActionMessage(
            approve
                ? "Perfil aprobado correctamente."
                : "Perfil rechazado correctamente."
        );
    }

    const handleApprove = () => handleDecision(true);
    const handleReject = () => handleDecision(false);

    if (loading) {
        return (
            <main className="page-container">
                <p>Cargando artista...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <p>{error}</p>
            </main>
        );
    }

    if (!artist) {
        return (
            <main className="page-container">
                <p>No se encontró información del artista.</p>
            </main>
        );
    }

    return (
        <main className="page-container">
            <ArtistProfile
                artist={artist}
                isOwner={false}
                showModeration={fromPending}
                onApprove={fromPending ? handleApprove : undefined}
                onReject={fromPending ? handleReject : undefined}
                moderationLoading={actionLoading}
                moderationMessage={actionMessage}
                moderationError={actionError}
            />
        </main>
    );
}
