"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useApprovedArtists } from "@/features/artists/hooks/useApprovedArtists";
import ArtistCard from "./components/ArtistCard";
import styles from "./ArtistsGrid.module.css";

export default function ArtistsGrid({ onSelectArtist }) {
    const { artists, isLoading, error } = useApprovedArtists();
    const params = useSearchParams();
    const [hasMounted, setHasMounted] = useState(false);

    const q = params.get("q")?.trim().toLowerCase() ?? "";

    // 🎛 filtro del dropdown
    const filter = params.get("filter") ?? "all";

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const handleSelect = (artist) => {
        if (onSelectArtist) {
            onSelectArtist(artist);
        }
    };

    const skeletons = Array.from({ length: 6 });

    const filteredArtists = useMemo(() => {
        if (!artists) return [];

        // 1) BÚSQUEDA
        let base = artists;
        if (q) {
            base = base.filter((artist) => {
                const name = artist.name?.toLowerCase() ?? "";
                const location = artist.location?.toLowerCase() ?? "";
                const description = artist.description?.toLowerCase() ?? "";
                const specialities =
                    artist.specialities
                        ?.map((s) => s.name.toLowerCase())
                        .join(" ") ?? "";

                return (
                    name.includes(q) ||
                    location.includes(q) ||
                    description.includes(q) ||
                    specialities.includes(q)
                );
            });
        }

        // 2) FILTRO EXTRA (dropdown)
        switch (filter) {
            case "with-photo":
                base = base.filter((a) => !!a.photoUrl);
                break;
            case "with-social":
                base = base.filter(
                    (a) =>
                        a.socialMedia &&
                        Object.values(a.socialMedia).some((v) => !!v)
                );
                break;
            case "with-specialities":
                base = base.filter(
                    (a) => Array.isArray(a.specialities) && a.specialities.length > 0
                );
                break;
            case "all":
            default:
                // sin filtro extra
                break;
        }

        return base;
    }, [artists, q, filter]);

    const hasArtists =
        Array.isArray(filteredArtists) && filteredArtists.length > 0;
    const isEmptyAfterLoad =
        !isLoading && !error && Array.isArray(filteredArtists) && filteredArtists.length === 0;

    const showEmptyState = hasMounted && isEmptyAfterLoad;
    const showSkeletons = isLoading && !(artists?.length > 0);

    return (
        <section className={styles.gridSection} aria-label="Artistas">
            <div className={styles.gridHeader}>
                <h2 className={styles.gridTitle}>Artistas</h2>
            </div>

            {/* LOADING */}
            {showSkeletons && (
                <div className={styles.grid}>
                    {skeletons.map((_, idx) => (
                        <div key={idx} className={styles.skeletonCard}></div>
                    ))}
                </div>
            )}

            {/* ERROR */}
            {!isLoading && error && (
                <p className={styles.errorState}>{error}</p>
            )}

            {/* LISTA */}
            {!isLoading && !error && (
                <div className={styles.grid}>
                    {showEmptyState ? (
                        <p className={styles.emptyState}>
                            No se encontraron artistas que coincidan
                            {q ? ` con "${q}"` : ""}.
                        </p>
                    ) : (
                        hasArtists &&
                        filteredArtists.map((artist) => (
                            <ArtistCard
                                key={artist.id}
                                id={artist.id}
                                name={artist.name}
                                city={artist.location}
                                tags={artist.specialities?.map((s) => s.name) ?? []}
                                imageUrl={artist.photoUrl}
                                social={artist.socialMedia || {}}
                                onSelect={handleSelect}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    );
}
