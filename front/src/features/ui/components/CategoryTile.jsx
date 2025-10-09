"use client";
import styles from "../styles/CategoryTile.module.css";

/**
 * CategoryTile
 * Recuadro de categoría con degradado, ícono y etiqueta.
 *
 * Props:
 * - icon: componente React de ícono (ej. <Music />) o función (componente)
 * - label: string
 * - active: boolean
 * - onClick: () => void
 * - gradient: string (CSS linear-gradient; usa var(--*) de tu paleta)
 * - decor: boolean (muestra puntitos decorativos)
 */
export default function CategoryTile({
                                         icon: Icon,
                                         label,
                                         active = false,
                                         onClick,
                                         gradient = "linear-gradient(135deg, var(--bl) 0%, #1c8ad0 100%)",
                                         decor = false,
                                     }) {
    return (
        <button
            type="button"
            className={`${styles.tile} ${active ? styles.active : ""}`}
            style={{ backgroundImage: gradient }}
            onClick={onClick}
        >
            {decor && (
                <>
                    <span className={`${styles.dot} ${styles.dotTL}`} />
                    <span className={`${styles.dot} ${styles.dotBR}`} />
                </>
            )}
            <div className={styles.content}>
                {Icon ? <Icon className={styles.icon} size={22} strokeWidth={2.4} /> : null}
                <span className={styles.label}>{label}</span>
            </div>
        </button>
    );
}
