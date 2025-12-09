"use client";

import Image from "next/image";
import styles from "./ArtistProfileHeader.module.css";

export default function ArtistProfileHeader({ artist }) {
    const { name, city, photoUrl, headline } = artist || {};

    const displayHeadline =
        headline || "Artista local y colaborador de la comunidad";

    return (
        <header className={styles.header}>
            <div className={styles.avatar}>
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={name}
                        fill
                        sizes="180px"
                        className={styles.avatarImg}
                    />
                ) : (
                    <div className={styles.avatarFallback}>
                        {name?.[0]?.toUpperCase() || "?"}
                    </div>
                )}
            </div>

            <div className={styles.headerInfo}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.headline}>{displayHeadline}</p>
                <p className={styles.city}>{city}</p>
            </div>
        </header>
    );
}
