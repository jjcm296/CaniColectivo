// src/features/artists/componensts/pending/PendingArtistsBell.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    getPendingArtists,
    approveOrRejectArtist,
} from "@/features/artists/api/artistAdminApi";
import { slugify } from "@/features/utils/slugify";

import BellButton from "./BellButton";
import PendingArtistsDropdown from "./PendingArtistsDropdown";
import styles from "./PendingArtistsBell.module.css";

export default function PendingArtistsBell({ token, initialCount = 0 }) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(initialCount);
    const [pending, setPending] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [loadingActionId, setLoadingActionId] = useState(null);
    const [error, setError] = useState("");

    const hasPending = count > 0;
    const wrapperRef = useRef(null);
    const router = useRouter();

    if (!token) return null;

    // Sincronizar con el valor que viene de NavBar
    useEffect(() => {
        setCount(initialCount);
    }, [initialCount]);

    // Cargar la lista sólo cuando se abre el dropdown
    useEffect(() => {
        if (open) {
            void loadList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Cerrar al hacer click fuera
    useEffect(() => {
        if (!open) return;

        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    async function loadList() {
        setLoadingList(true);
        setError("");

        const res = await getPendingArtists(token);

        if (res.ok) {
            const list = res.data || [];
            setPending(list);
            setCount(list.length);
        } else {
            setError(res.error || "No se pudieron cargar los artistas.");
        }

        setLoadingList(false);
    }

    async function handleDecision(id, approve) {
        setLoadingActionId(id);
        const res = await approveOrRejectArtist(id, approve, token);
        setLoadingActionId(null);

        if (!res.ok) {
            setError(res.error || "No se pudo actualizar el artista.");
            return;
        }

        setPending((prev) => prev.filter((a) => a.id !== id));
        setCount((prev) => Math.max(prev - 1, 0));
    }

    const handleApprove = (id) => handleDecision(id, true);
    const handleReject = (id) => handleDecision(id, false);

    // 👉 Abrir el perfil completo del artista pendiente
    const handleOpenArtist = (artist) => {
        if (!artist?.id) return;

        if (typeof window !== "undefined") {
            // guardamos el ID y marcamos que viene de pendientes
            sessionStorage.setItem("selectedArtistId", String(artist.id));
            sessionStorage.setItem("selectedArtistFromPending", "true");
        }

        const nameSlug = slugify(artist.name || "artista");
        const slug = `${nameSlug}-${artist.id}`;

        // Usamos el mismo detalle que el flujo anterior: /artist/[slug]
        router.push(`/artist/${slug}`);
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <BellButton
                hasPending={hasPending}
                count={count}
                onToggle={() => setOpen((v) => !v)}
            />

            <PendingArtistsDropdown
                open={open}
                count={count}
                pending={pending}
                loadingList={loadingList}
                loadingActionId={loadingActionId}
                error={error}
                onApprove={handleApprove}
                onReject={handleReject}
                onOpenArtist={handleOpenArtist}
            />
        </div>
    );
}
