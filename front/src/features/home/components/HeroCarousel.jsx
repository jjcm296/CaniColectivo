'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/HeroCarousel.module.css';

const SLIDES = [
    { id: 1, alt: 'Slide 1', src: '', color: 'var(--xanthous)' },
    { id: 2, alt: 'Slide 2', src: '', color: 'var(--blue)' },
    { id: 3, alt: 'Slide 3', src: '', color: 'var(--space)' },
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);
    const len = SLIDES.length;

    const go = (to) => setIndex((to + len) % len);
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    useEffect(() => {
        const t = setInterval(next, 4500);
        return () => clearInterval(t);
    }, [index]);

    return (
        <div className={styles.wrap}>
            <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
                {SLIDES.map((s) => (
                    <div key={s.id} className={styles.slide} style={{ background: s.color }}>
                        {s.src ? (
                            <Image src={s.src} alt={s.alt} fill className={styles.img} />
                        ) : (
                            <div className={styles.placeholder}>
                                <span>{s.alt}</span>
                                <small>Agrega tu imagen en SLIDES[src]</small>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className={`${styles.ctrl} ${styles.prev}`} onClick={prev}>‹</button>
            <button className={`${styles.ctrl} ${styles.next}`} onClick={next}>›</button>

            <div className={styles.dots}>
                {SLIDES.map((s, i) => (
                    <button
                        key={s.id}
                        className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                        onClick={() => go(i)}
                    />
                ))}
            </div>
        </div>
    );
}
