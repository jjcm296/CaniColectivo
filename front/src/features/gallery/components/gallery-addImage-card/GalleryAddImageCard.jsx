"use client";

import { FiPlus } from "react-icons/fi";
import styles from "./GalleryAddImageCard.module.css";

export default function GalleryAddImageCard({ onClick }) {
    return (
        <button
            type="button"
            className={`${styles.card} ${styles.addCard}`}
            onClick={onClick}
        >
            <div className={styles.addInner}>
                <span className={styles.addIcon}>
                    <FiPlus />
                </span>
                <span className={styles.addText}>Agregar Foto</span>
            </div>
        </button>
    );
}
