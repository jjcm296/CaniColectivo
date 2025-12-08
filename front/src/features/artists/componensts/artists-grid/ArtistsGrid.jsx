"use client";

import { useApprovedArtists } from "@/features/artists/hooks/useApprovedArtists";
import ArtistCard from "./components/ArtistCard";
import styles from "./ArtistsGrid.module.css";

export default function ArtistsGrid({ onSelectArtist }) {
    const { artists, isLoading, error, reload } = useApprovedArtists();

    const handleSelect = (artist) => {
        if (onSelectArtist) {
            onSelectArtist(artist);
        }
    };

    return (
        <section className={styles.gridSection} aria-label="Artistas">
            <div className={styles.gridHeader}>
                <h2 className={styles.gridTitle}>Artistas</h2>
                <button type="button" onClick={reload} className={styles.reloadButton}>
                    Recargar
                </button>
            </div>

            {isLoading && (
                <p className={styles.emptyState}>Cargando artistas...</p>
            )}

            {error && !isLoading && (
                <p className={styles.errorState}>{error}</p>
            )}

            {!isLoading && !error && (
                <div className={styles.grid}>
                    {artists.length === 0 ? (
                        <p className={styles.emptyState}>No hay artistas aún.</p>
                    ) : (
                        artists.map((artist) => (
                            <ArtistCard
                                key={artist.id}
                                {...artist}
                                onSelect={handleSelect}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    );
}
