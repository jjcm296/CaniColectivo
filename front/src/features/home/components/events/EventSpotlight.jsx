'use client';

import Link from 'next/link';
import EventCard from './EventCard';
import styles from './EventSpotlight.module.css';

export default function EventSpotlight({ events = [] }) {
    const count = events.length;

    if (count === 0) {
        return (
            <section className={styles.section} aria-labelledby="ev-title">
                <div className={styles.header}>
                    <h2 id="ev-title" className={styles.title}>Próximos eventos</h2>
                    <Link className={styles.linkAll} href="/eventos">Ver todos</Link>
                </div>
                <p className={styles.empty}>Aún no hay eventos programados. ¡Vuelve pronto!</p>
            </section>
        );
    }

    return (
        <section className={styles.section} aria-labelledby="ev-title">
            <div className={styles.header}>
                <h2 id="ev-title" className={styles.title}>Próximos eventos</h2>
                <Link className={styles.linkAll} href="/eventos">Ver todos</Link>
            </div>

            {count === 1 && (
                <div className={styles.single}>
                    <EventCard event={events[0]} />
                </div>
            )}

            {count > 1 && count <= 3 && (
                <div className={`${styles.grid} ${styles.compacto}`}>
                    {events.map(ev => <EventCard key={ev.id} event={ev} />)}
                </div>
            )}

            {count >= 4 && (
                <div className={styles.scroller} role="region" aria-label="Carrusel de eventos" tabIndex={0}>
                    <div className={styles.track}>
                        {events.map(ev => (
                            <div key={ev.id} className={styles.slide}>
                                <EventCard event={ev} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
