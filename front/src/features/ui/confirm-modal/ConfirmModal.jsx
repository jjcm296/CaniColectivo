"use client";

import { FiAlertTriangle } from "react-icons/fi";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal(props) {
    const {
        open,
        title,
        description,
        confirmLabel = "Confirmar",
        cancelLabel = "Cancelar",
        loading = false,
        onCancel,
        onConfirm,
        variant = "default",
        icon,
    } = props;

    if (!open) return null;

    const isDanger = variant === "danger";

    return (
        <div className={styles.modalBackdrop}>
            <div
                className={`${styles.modal} ${
                    isDanger ? styles.modalDangerVariant : ""
                }`}
            >
                {isDanger && (
                    <div className={styles.modalIconWrapper}>
                        {icon ?? (
                            <FiAlertTriangle
                                className={styles.modalIcon}
                                aria-hidden="true"
                            />
                        )}
                    </div>
                )}

                <h3 className={styles.modalTitle}>{title}</h3>
                <p className={styles.modalText}>{description}</p>

                <div className={styles.modalActions}>
                    <button
                        type="button"
                        className={styles.modalCancel}
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className={
                            isDanger ? styles.modalDanger : styles.modalConfirm
                        }
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Procesando..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
