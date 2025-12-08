"use client";

import { useEffect, useState } from "react";
import ArtistProfile from "@/features/artists/componensts/artist-profile/ArtistProfile";
import { getArtistById } from "@/features/artists/api/artistApi";

// Mapeo para que el artist tenga la misma forma
// que en getMyArtistProfile / getArtistBySlug
function mapArtist(apiArtist) {
    if (!apiArtist) return null;

    return {
        ...apiArtist,
        // lo que usan tus componentes:
        city: apiArtist.location,
        social: apiArtist.socialMedia || {},
        tags: Array.isArray(apiArtist.specialities)
            ? apiArtist.specialities.map((s) => s.name).filter(Boolean)
            : [],
    };
}

export default function ArtistPublicPage() {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadArtist() {
            try {
                const storedId = typeof window !== "undefined"
                    ? sessionStorage.getItem("selectedArtistId")
                    : null;

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
            <ArtistProfile artist={artist} />
        </main>
    );
}
