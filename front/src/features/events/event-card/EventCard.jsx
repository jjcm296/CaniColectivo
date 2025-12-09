'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './EventCard.module.css';

export default function EventCard({ event }) {
    if (!event) return null;

    const {
        title,
        dateISO,
        venue,
        poster,
        slug,
        registerUrl,
        isCause,
    } = event;

    const fecha = dateISO
        ? new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateISO))
        : '';

    const hora = dateISO
        ? new Intl.DateTimeFormat('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateISO))
        : '';

    // === Estado para el modal ===
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'register' | 'details' | null

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    const handleBackdropClick = (e) => {
        // Si hace clic fuera del contenido, cierra el modal
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    let modalTitle = '';
    let modalMessage = '';

    if (modalType === 'register') {
        modalTitle = 'Registro no disponible aún';
        modalMessage =
            'Aún no se encuentra habilitado el registro para este evento. Muy pronto podrás inscribirte desde aquí.';
    } else if (modalType === 'details') {
        modalTitle = 'Detalles no disponibles';
        modalMessage =
            'Todavía no hay una ficha de detalles publicada para este evento. Estamos trabajando en ello.';
    }

    return (
        <>
            <article className={styles.card}>
                <div className={styles.posterWrap}>
                    <div className={styles.badgeRail}>
                        {isCause && (
                            <span className={styles.badge}>
                                Evento con causa
                            </span>
                        )}
                    </div>

                    <div className={styles.posterFrame}>
                        {poster && (
                            <Image
                                src={poster}
                                alt={title || 'Evento'}
                                fill
                                sizes="(max-width: 640px) 80vw,
                                       (max-width: 1024px) 35vw,
                                       320px"
                                className={styles.poster}
                                priority={false}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.body}>
                    {title && (
                        <h3 className={styles.title}>
                            {title}
                        </h3>
                    )}

                    {(fecha || hora || venue) && (
                        <p className={styles.meta}>
                            {(fecha || hora) && (
                                <span className={styles.date}>
                                    {fecha}
                                    {fecha && hora ? ' · ' : ''}
                                    {hora}
                                </span>
                            )}

                            {venue && (
                                <>
                                    {(fecha || hora) && (
                                        <span
                                            className={styles.dot}
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className={styles.venue}>
                                        {venue}
                                    </span>
                                </>
                            )}
                        </p>
                    )}

                    <div className={styles.divider} />

                    <div className={styles.ctaRow}>
                        {/* Antes navegaban, ahora sólo abren el modal */}
                        <button
                            type="button"
                            className={styles.btnPrimary}
                            onClick={() => handleOpenModal('register')}
                        >
                            Registrarme
                        </button>

                        {slug && (
                            <button
                                type="button"
                                className={styles.btnGhost}
                                onClick={() => handleOpenModal('details')}
                            >
                                Detalles
                            </button>
                        )}
                    </div>
                </div>
            </article>

            {isModalOpen && (
                <div
                    className={styles.modalBackdrop}
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h4 className={styles.modalTitle}>{modalTitle}</h4>
                        <p className={styles.modalMessage}>{modalMessage}</p>

                        <div className={styles.modalActions}>
                            <button
                                type="button"
                                className={styles.modalButton}
                                onClick={handleCloseModal}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
