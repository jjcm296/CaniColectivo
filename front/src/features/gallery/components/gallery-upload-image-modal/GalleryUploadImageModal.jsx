"use client";

import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import styles from "./GalleryUploadImageModal.module.css";

export default function GalleryUploadImageModal({
                                                    isOpen,
                                                    onClose,
                                                    onUpload,
                                                    onSuccess,
                                                }) {
    if (!isOpen) return null;

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const titleId = "gallery-upload-title";
    const descId = "gallery-upload-desc";

    function handleFileChange(event) {
        const selected = event.target.files?.[0];
        if (!selected) return;

        setFile(selected);
        setError("");
        setPreview(URL.createObjectURL(selected));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!file) {
            setError("Selecciona una imagen para continuar.");
            return;
        }

        if (!onUpload) {
            setError("No se ha configurado la acción de subida.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const created = await onUpload(file);

            if (onSuccess) {
                onSuccess(created);
            }

            setFile(null);
            setPreview(null);
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.message || "No se pudo subir la imagen.");
        } finally {
            setSubmitting(false);
        }
    }

    function handleClose() {
        if (submitting) return;
        setFile(null);
        setPreview(null);
        setError("");
        onClose();
    }

    return (
        <div className={styles.backdrop}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
            >
                <header className={styles.header}>
                    <div className={styles.headerText}>
                        <h2 id={titleId} className={styles.title}>
                            Agregar imagen a la galería
                        </h2>
                    </div>

                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={handleClose}
                        aria-label="Cerrar modal de subida de imagen"
                    >
                        <FiX />
                    </button>
                </header>

                <form className={styles.body} onSubmit={handleSubmit}>
                    <label className={styles.fileLabel}>
                        <span className={styles.fileIconWrapper}>
                            <span className={styles.fileIcon}>
                                <FiUpload />
                            </span>
                        </span>

                        <div className={styles.fileTextBlock}>
                            <span className={styles.fileLabelText}>
                                {file ? "Cambiar imagen" : "Seleccionar imagen"}
                            </span>
                            <span className={styles.fileHint}>
                                Formatos: JPG, PNG, WEBP · Máx. recomendado 5 MB
                            </span>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={submitting}
                        />
                    </label>

                    {preview && (
                        <div className={styles.previewWrapper}>
                            <img
                                src={preview}
                                alt="Vista previa de la imagen seleccionada"
                                className={styles.previewImage}
                            />
                        </div>
                    )}

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.footer}>
                        <button
                            type="button"
                            className={styles.secondaryBtn}
                            onClick={handleClose}
                            disabled={submitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.primaryBtn}
                            disabled={submitting || !file}
                        >
                            {submitting ? "Subiendo..." : "Subir imagen"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}