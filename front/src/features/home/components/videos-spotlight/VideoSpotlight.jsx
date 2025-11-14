'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './VideoSpotlight.module.css';
import TiktokVideoCard from './TiktokVideoCard';

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
        url: 'https://www.tiktok.com/@cani.colectivo/photo/7568908647720291602?embed_source=121374463%2C121468991%2C121439635%2C121749182%2C121433650%2C121404359%2C121497414%2C121477481%2C121351166%2C121947600%2C121811500%2C121896267%2C121860360%2C121487028%2C121331973%2C120811592%2C120810756%2C121885509%3Bnull%3Bembed_masking&refer=embed&referer_url=localhost%3A3000%2F&referer_video_id=7559994915350973704',
        title: 'Momentos con la comunidad',
    },
];

export default function VideoSpotlight({ videos = DEFAULT_VIDEOS }) {
    const list = videos.length ? videos : DEFAULT_VIDEOS;
    const [currentIndex, setCurrentIndex] = useState(0);

    const total = list.length;

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % total);
    };

    // Auto-advance every N milliseconds
    useEffect(() => {
        if (total <= 1) return;

        const AUTO_MS = 30000; // 20s aprox
        const id = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % total);
        }, AUTO_MS);

        return () => clearInterval(id);
    }, [total]);

    if (total === 0) return null;

    const current = list[currentIndex];

    return (
        <section className={styles.section} aria-labelledby="vid-title">
            <div className={styles.header}>
                <div>
                    <h2 id="vid-title" className={styles.title}>
                        Videos recientes
                    </h2>
                    <p className={styles.subtitle}>
                        Mira algunos de los momentos especiales de Cani en TikTok.
                    </p>
                </div>

                <Link
                    className={styles.linkAll}
                    href="https://www.tiktok.com/@cani.colectivo/"
                    target="_blank"
                >
                    Ver todos
                </Link>
            </div>

            <div
                className={styles.scroller}
                role="region"
                aria-label="Carrusel de videos"
            >
                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.navLeft}`}
                    aria-label="Video anterior"
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
                    type="button"
                    className={`${styles.navBtn} ${styles.navRight}`}
                    aria-label="Siguiente video"
                    onClick={goNext}
                >
                    ›
                </button>

                <p className={styles.counter}>
                    {currentIndex + 1} / {total}
                </p>
            </div>
        </section>
    );
}
