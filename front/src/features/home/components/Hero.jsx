'use client';

import Link from 'next/link';
import styles from '../styles/Hero.module.css';
import HeroMedia from './HeroMedia';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.copy}>
                <p className={styles.eyebrow}>CANICOLECTIVO WEB</p>
                <h1 className={styles.title}>
                    Vitrina digital con <span className={styles.hlGreen}>energía</span> y{' '}
                    <span className={styles.hlBlue}>alegría</span> para artistas emergentes y consolidados
                </h1>

                <div className={styles.actions}>
                    <Link href="/artists" className={styles.btnPrimary}>
                        Explorar artistas
                    </Link>
                    <Link href="/events" className={styles.btnSecondary}>
                        Ver eventos
                    </Link>
                </div>
            </div>

            <HeroMedia />
        </section>
    );
}
