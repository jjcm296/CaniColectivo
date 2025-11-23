// src/features/gallery/gallery-image-card/GalleryImageCard.jsx
"use client";

import { HiOutlineStar, HiStar } from "react-icons/hi";
import styles from "./GalleryImageCard.module.css";

export default function GalleryImageCard({
                                             item,
                                             isAdmin,
                                             onToggleFeatured,
                                             onToggleActive,
                                             onRemove,
                                         }) {
    const active = item.isActive ?? true;

    return (
        <article
            className={`${styles.card} ${!active ? styles.cardInactive : ""}`}
        >
            <div className={styles.mediaWrapper}>
                <img
                    src={item.url}
                    alt={item.title}
                    className={styles.image}
                    loading="lazy"
                />

                {isAdmin && (
                    <button
                        type="button"
                        className={`${styles.starBtn} ${
                            item.isFeatured ? styles.starActive : ""
                        }`}
                        onClick={() => onToggleFeatured(item.id)}
                    >
                        {item.isFeatured ? (
                            <HiStar className={styles.starIconFilled} />
                        ) : (
                            <HiOutlineStar className={styles.starIcon} />
                        )}
                    </button>
                )}

                <div className={styles.overlay}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {item.type && (
                        <span className={styles.badge}>{item.type}</span>
                    )}
                </div>
            </div>
        </article>
    );
}
