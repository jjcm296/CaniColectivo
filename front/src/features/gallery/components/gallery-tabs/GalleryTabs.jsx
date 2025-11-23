// src/features/gallery/gallery-tabs/GalleryTabs.jsx
"use client";

import { FiGrid, FiStar, FiEyeOff } from "react-icons/fi";
import styles from "./GalleryTabs.module.css";

export default function GalleryTabs({ isAdmin, view, onChange }) {
    const tabs = [
        { id: "all",        icon: <FiGrid /> },
        { id: "featured",   icon: <FiStar /> },
        { id: "hidden",     icon: <FiEyeOff /> }
    ];

    const activeIndex = Math.max(
        0,
        tabs.findIndex((t) => t.id === view)
    );

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.tabs}
                style={{
                    "--tabs-count": tabs.length,
                    "--active-index": activeIndex,
                }}
            >
                {/* Pastilla que se desliza */}
                <div className={styles.slider} />

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        className={`${styles.tab} ${
                            view === tab.id ? styles.active : ""
                        }`}
                        onClick={() => onChange(tab.id)}
                    >
                        <span className={styles.icon}>{tab.icon}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
