'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import EventCard from './EventCard';
import styles from './EventSpotlight.module.css';

export default function EventSpotlight({ events = [] }) {
    const count = events.length;

    // ==== Vacío ====
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

    // ==== 1 tarjeta ====
    if (count === 1) {
        return (
            <section className={styles.section} aria-labelledby="ev-title">
                <div className={styles.header}>
                    <h2 id="ev-title" className={styles.title}>Próximos eventos</h2>
                    <Link className={styles.linkAll} href="/eventos">Ver todos</Link>
                </div>
                <div className={styles.single}>
                    <EventCard event={events[0]} />
                </div>
            </section>
        );
    }

    // ==== 2–3 tarjetas (grid) ====
    if (count > 1 && count <= 3) {
        return (
            <section className={styles.section} aria-labelledby="ev-title">
                <div className={styles.header}>
                    <h2 id="ev-title" className={styles.title}>Próximos eventos</h2>
                    <Link className={styles.linkAll} href="/eventos">Ver todos</Link>
                </div>
                <div className={`${styles.grid} ${styles.compacto}`}>
                    {events.map(ev => <EventCard key={ev.id} event={ev} />)}
                </div>
            </section>
        );
    }

    // ==== 4+ tarjetas: carrusel con flechas, sin barra de scroll, con espacio lateral ====
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const updateNavState = () => {
        const el = trackRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const maxScroll = scrollWidth - clientWidth - 1; // margen por redondeo
        setCanPrev(scrollLeft > 0);
        setCanNext(scrollLeft < maxScroll);
    };

    useEffect(() => {
        updateNavState();
        const el = trackRef.current;
        if (!el) return;
        const onScroll = () => updateNavState();
        el.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateNavState);
        return () => {
            el.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateNavState);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollByViewport = (dir = 1) => {
        const el = trackRef.current;
        if (!el) return;
        // desplazamos un “viewport” (ancho visible) menos un pequeño gap para que
        // se perciba continuidad
        const delta = (el.clientWidth - 32) * dir;
        el.scrollBy({ left: delta, behavior: 'smooth' });
    };

    return (
        <section className={styles.section} aria-labelledby="ev-title">
            <div className={styles.header}>
                <h2 id="ev-title" className={styles.title}>Próximos eventos</h2>
                <Link className={styles.linkAll} href="/eventos">Ver todos</Link>
            </div>

            <div className={styles.scroller} role="region" aria-label="Carrusel de eventos">
                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.navLeft}`}
                    aria-label="Anterior"
                    onClick={() => scrollByViewport(-1)}
                    disabled={!canPrev}
                >
                    ‹
                </button>

                <div className={styles.viewport}>
                    <div className={styles.track} ref={trackRef}>
                        {events.map(ev => (
                            <div key={ev.id} className={styles.slide}>
                                <EventCard event={ev} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.navRight}`}
                    aria-label="Siguiente"
                    onClick={() => scrollByViewport(1)}
                    disabled={!canNext}
                >
                    ›
                </button>
            </div>
        </section>
    );
}
