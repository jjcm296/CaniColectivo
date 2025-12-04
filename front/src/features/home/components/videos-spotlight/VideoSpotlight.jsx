'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import styles from './VideoSpotlight.module.css';
import TiktokVideoCard from './TiktokVideoCard';
import { useBannerVideos } from '../../hooks/useBannerVideos';
import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";

const DEFAULT_VIDEOS = [
    {
        id: 'v1',
        url: 'https://www.tiktok.com/@cani.colectivo/video/7555272248484007175?_r=1&_t=ZS-91LoQueQKQx',
        title: 'Cani',
    },
    {
        id: 'v2',
        url: 'https://www.tiktok.com/@cani.colectivo/video/7559994915350973704',
        title: 'Mi amiga',
    },
    {
        id: 'v3',
        url: 'https://www.tiktok.com/@cani.colectivo/photo/7568908647720291602?embed_source=121374463%2C121468991%2C121439635%2C121749182%2C121433650%2C121404359%2C121497414%2C121477481%2C121351166%2C121947600%2C121811500%2C121896267%2C121860360%2C121487028%2C121331973%2C120811592%2C120810756%2C121885509%3Bnull%3Bembed_masking',
        title: 'Momentos con la comunidad',
    },
];

export default function VideoSpotlight({ isAdmin = true }) {
    const { items, loading, error, createVideo, removeVideo } = useBannerVideos();
    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const [currentIndex, setCurrentIndex] = useState(0);

    // Modal para agregar video
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    // Estado para confirmar eliminación
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Adaptar videos del backend
    const apiVideos = (items || [])
        .filter((item) => item.type === 'video' && item.isActive !== false)
        .map((item) => ({
            id: item.id,
            url: item.url,
            title: item.title || 'Video de Cani',
        }));

    const list = apiVideos.length > 0 ? apiVideos : DEFAULT_VIDEOS;
    const total = list.length;

    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
    const goNext = () => setCurrentIndex((prev) => (prev + 1) % total);

    useEffect(() => {
        if (total <= 1) return;

        const AUTO_MS = 30000;
        const id = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % total);
        }, AUTO_MS);

        return () => clearInterval(id);
    }, [total]);

    if (total === 0) return null;

    const current = list[currentIndex];

    // Saber si el video actual viene del backend
    const isCurrentFromApi = apiVideos.some((v) => v.id === current.id);
    const canDeleteCurrent = isAdmin && isCurrentFromApi;

    // Abrir modal de alta
    const handleOpenModal = () => {
        setVideoUrl('');
        setCreateError(null);
        setShowModal(true);
    };

    // Cerrar modal de alta
    const handleCloseModal = () => {
        if (!creating) {
            setShowModal(false);
            setVideoUrl('');
            setCreateError(null);
        }
    };

    // Guardar video en backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmed = videoUrl.trim();
        if (!trimmed) {
            setCreateError('Ingresa la URL del video de TikTok.');
            return;
        }

        try {
            setCreating(true);
            setCreateError(null);

            showLoading('Guardando video...');
            await createVideo(trimmed);

            hide();
            showSuccess('Video agregado correctamente.');

            handleCloseModal();
        } catch (err) {
            console.error(err);
            hide();
            showError('No se pudo registrar el video. Intenta de nuevo.');
            setCreateError('No se pudo registrar el video. Intenta de nuevo.');
        } finally {
            setCreating(false);
        }
    };

    // Click en botón "Eliminar" => solo abre modal de confirmación
    const handleOpenConfirmDelete = () => {
        if (!canDeleteCurrent || deleting) return;
        setShowConfirmDelete(true);
    };

    const handleCloseConfirmDelete = () => {
        if (deleting) return;
        setShowConfirmDelete(false);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (!canDeleteCurrent || deleting) return;

        try {
            setDeleting(true);
            showLoading('Eliminando video...');

            await removeVideo(current.id);

            hide();
            showSuccess('Video eliminado correctamente.');
            setShowConfirmDelete(false);

            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } catch (err) {
            console.error(err);
            hide();
            showError('No se pudo eliminar el video. Intenta de nuevo.');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <section className={styles.section} aria-labelledby="vid-title">
            {/* Encabezado */}
            <div className={styles.header}>
                <div>
                    <h2 id="vid-title" className={styles.title}>
                        Videos recientes
                    </h2>
                    <p className={styles.subtitle}>
                        Mira algunos de los momentos especiales de Cani en TikTok.
                    </p>
                </div>

                <div className={styles.headerActions}>
                    {isAdmin && (
                        <button
                            type="button"
                            className={styles.addBtn}
                            onClick={handleOpenModal}
                        >
                            + Agregar video
                        </button>
                    )}
                    <Link
                        className={styles.linkAll}
                        href="https://www.tiktok.com/@cani.colectivo/"
                        target="_blank"
                    >
                        Ver todos
                    </Link>
                </div>
            </div>

            {/* Carrusel */}
            <div className={styles.scroller} role="region">
                <button
                    className={`${styles.navBtn} ${styles.navLeft}`}
                    onClick={goPrev}
                >
                    ‹
                </button>

                <div className={styles.viewport}>
                    <div className={styles.track}>
                        <div className={styles.cardShell}>
                            <TiktokVideoCard
                                key={current.id ?? currentIndex}
                                url={current.url}
                                title={current.title}
                            />
                        </div>
                    </div>
                </div>

                <button
                    className={`${styles.navBtn} ${styles.navRight}`}
                    onClick={goNext}
                >
                    ›
                </button>

                {/* Contador + botón eliminar */}
                <div className={styles.counterRow}>
                    <p className={styles.counter}>
                        {currentIndex + 1} / {total}
                    </p>

                    {canDeleteCurrent && (
                        <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={handleOpenConfirmDelete}
                            aria-label="Eliminar este video"
                            disabled={deleting}
                        >
                            <FiTrash2 className={styles.deleteIcon} />
                            <span className={styles.deleteText}>
                                {deleting ? 'Eliminando...' : 'Eliminar'}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Modal agregar video */}
            {isAdmin && showModal && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>Agregar video de TikTok</h3>
                        <p className={styles.modalText}>
                            Pega la URL pública del video de TikTok que quieres mostrar.
                        </p>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <input
                                type="url"
                                className={styles.modalInput}
                                placeholder="https://www.tiktok.com/..."
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                required
                                disabled={creating}
                            />

                            {createError && (
                                <p className={styles.modalError}>{createError}</p>
                            )}

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.modalCancel}
                                    onClick={handleCloseModal}
                                    disabled={creating}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={styles.modalSubmit}
                                    disabled={creating}
                                >
                                    {creating ? 'Guardando...' : 'Guardar video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {isAdmin && showConfirmDelete && (
                <div className={styles.modalBackdrop}>
                    <div className={`${styles.modal} ${styles.modalDelete}`}>
                        <div className={styles.modalDeleteIcon}>
                            <FiAlertTriangle
                                className={styles.modalDeleteIconMark}
                                aria-hidden="true"
                            />
                        </div>
                        <h3 className={styles.modalTitle}>
                            Eliminar video
                        </h3>
                        <p className={styles.modalText}>
                            ¿Seguro que quieres eliminar este video del carrusel? Esta acción no se puede deshacer.
                        </p>

                        <div className={styles.modalActions}>
                            <button
                                type="button"
                                className={styles.modalCancel}
                                onClick={handleCloseConfirmDelete}
                                disabled={deleting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={styles.modalDanger}
                                onClick={handleConfirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? 'Eliminando...' : 'Eliminar definitivamente'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}