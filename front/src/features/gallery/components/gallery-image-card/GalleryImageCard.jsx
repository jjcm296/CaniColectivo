"use client";

import { useState, useEffect, useRef } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { FiMoreVertical, FiEyeOff, FiEye, FiTrash2 } from "react-icons/fi";
import styles from "./GalleryImageCard.module.css";

export default function GalleryImageCard({
                                             item,
                                             isAdmin,
                                             onToggleFeatured,
                                             onToggleActive,
                                             onRemove,
                                         }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const active = item.isActive ?? true;
    const featured = item.isFeatured ?? false;

    const menuRef = useRef(null);

    const handleToggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleFeaturedClick = () => {
        onToggleFeatured?.(item.id);
        setMenuOpen(false);
    };

    const handleToggleActiveClick = () => {
        onToggleActive?.(item.id);
        setMenuOpen(false);
    };

    const handleRemoveClick = () => {
        onRemove?.(item.id);
        setMenuOpen(false);
    };

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

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

                {/* ⭐ Botón de destacado siempre visible (solo admin) */}
                {isAdmin && (
                    <button
                        type="button"
                        className={`${styles.starBtn} ${
                            featured ? styles.starActive : ""
                        }`}
                        onClick={handleFeaturedClick}
                        aria-label={featured ? "Quitar destacado" : "Marcar como destacado"}
                    >
                        {featured ? (
                            <HiStar className={styles.starIconFilled} />
                        ) : (
                            <HiOutlineStar className={styles.starIcon} />
                        )}
                    </button>
                )}

                {/* Menú de 3 puntos: solo Ocultar/Mostrar y Eliminar */}
                {isAdmin && (
                    <div className={styles.menuWrapper} ref={menuRef}>
                        <button
                            type="button"
                            className={styles.menuButton}
                            onClick={handleToggleMenu}
                        >
                            <FiMoreVertical />
                        </button>

                        {menuOpen && (
                            <div className={styles.menu}>
                                {/* OCULTAR / MOSTRAR */}
                                <button
                                    type="button"
                                    className={styles.menuItem}
                                    onClick={handleToggleActiveClick}
                                >
                  <span className={styles.menuIcon}>
                    {active ? <FiEyeOff /> : <FiEye />}
                  </span>
                                    <span>{active ? "Ocultar" : "Mostrar"}</span>
                                </button>

                                {/* ELIMINAR */}
                                <button
                                    type="button"
                                    className={`${styles.menuItem} ${styles.menuItemDanger}`}
                                    onClick={handleRemoveClick}
                                >
                  <span className={styles.menuIcon}>
                    <FiTrash2 />
                  </span>
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className={styles.overlay}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {item.type && <span className={styles.badge}>{item.type}</span>}
                </div>
            </div>
        </article>
    );
}
