'use client';

import ArtistCard from './components/ArtistCard';
import styles from './ArtistsGrid.module.css';

export default function ArtistsGrid({ artists = [], onSelectArtist }) {

    const handleSelect = (artist) => {
        if (onSelectArtist) {
            onSelectArtist(artist);
        }
    };

    return (
        <section className={styles.gridSection} aria-label="Artistas">
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
        </section>
    );
}
