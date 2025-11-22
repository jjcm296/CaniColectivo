'use client';

import Link from 'next/link';
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

    const eventUrl = slug ? `/events/${slug}` : '#';

    return (
        <article className={styles.card}>
            <div className={styles.posterWrap}>
                <div className={styles.badgeRail}>
                    {isCause && (
                        <span className={styles.badge}>Evento con causa</span>
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
                {title && <h3 className={styles.title}>{title}</h3>}

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
                                <span className={styles.venue}>{venue}</span>
                            </>
                        )}
                    </p>
                )}

                <div className={styles.divider} />

                <div className={styles.ctaRow}>
                    {registerUrl ? (
                        <a
                            className={styles.btnPrimary}
                            href={registerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Registrarme
                        </a>
                    ) : (
                        slug && (
                            <Link
                                className={styles.btnPrimary}
                                href={eventUrl}
                            >
                                Registrarme
                            </Link>
                        )
                    )}

                    {slug && (
                        <Link className={styles.btnGhost} href={eventUrl}>
                            Detalles
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
