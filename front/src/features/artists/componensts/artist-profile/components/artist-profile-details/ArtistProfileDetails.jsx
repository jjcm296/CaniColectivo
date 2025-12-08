// features/artists/artist-profile/ArtistProfileDetails.jsx
"use client";

import { Tag } from "lucide-react";
import styles from "./ArtistProfileDetails.module.css";

export default function ArtistProfileDetails({ artist }) {
    const { tags = [] } = artist || {};
    const mainTag = tags[0] || "Artista independiente";

    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Detalles del artista</h2>

            <div className={styles.infoGroup}>
                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <Tag className={styles.icon} aria-hidden="true" />
                    </div>
                    <div>
                        <p className={styles.label}>Principal</p>
                        <p className={styles.value}>{mainTag}</p>
                    </div>
                </div>

                {tags.length > 0 && (
                    <>
                        <p className={styles.label} style={{ marginTop: "10px" }}>
                            Etiquetas
                        </p>
                        <div className={styles.tags}>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
