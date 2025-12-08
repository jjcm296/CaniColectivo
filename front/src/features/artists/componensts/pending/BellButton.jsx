import { FiBell } from "react-icons/fi";
import styles from "./BellButton.module.css";

export default function BellButton({ hasPending, count, onToggle }) {
    return (
        <button
            type="button"
            className={`${styles.button} ${
                hasPending ? styles.buttonActive : ""
            }`}
            aria-label={
                hasPending
                    ? `Hay ${count} perfiles de artistas pendientes por revisar`
                    : "Sin perfiles pendientes por revisar"
            }
            onClick={onToggle}
        >
            <FiBell
                className={`${styles.icon} ${
                    hasPending ? styles.iconPending : ""
                }`}
            />
            {hasPending && <span className={styles.badge}>{count}</span>}
        </button>
    );
}
