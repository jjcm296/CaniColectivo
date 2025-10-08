'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
    const { title, dateISO, venue, poster, slug, registerUrl, isCause } = event;

    const fecha = new Intl.DateTimeFormat('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric'
    }).format(new Date(dateISO));

    const hora = new Intl.DateTimeFormat('es-MX', {
        hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateISO));

    return (
        <article className={styles.card}>
            <div className={styles.posterWrap}>
                <div className={styles.badgeRail}>
                    {isCause && <span className={styles.badge}>Evento con causa</span>}
                </div>
                <div className={styles.posterFrame}>
                    <Image
                        src={poster}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 33vw, 320px"
                        className={styles.poster}
                        priority={false}
                    />
                </div>
            </div>

            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>

                <p className={styles.meta}>
                    <span className={styles.date}>{fecha} · {hora}</span>
                    <span className={styles.dot} />
                    <span className={styles.venue}>{venue}</span>
                </p>

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
                        <Link className={styles.btnPrimary} href={`/eventos/${slug}`}>
                            Registrarme
                        </Link>
                    )}
                    <Link className={styles.btnGhost} href={`/eventos/${slug}`}>
                        Detalles
                    </Link>
                </div>
            </div>
        </article>
    );
}
