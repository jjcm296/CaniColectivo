'use client';

import styles from '../styles/Hero.module.css';

export default function HeroMedia() {
    return (
        <div className={styles.media}>
            {/* Placeholder temporal: cambiar por video/gif cuando lo tengas */}
            <div className={styles.placeholder}>
                <span>🐾 Aquí irá el GIF/video de las mascotas 🐾</span>
            </div>

            {/* Ejemplo si fuera un video:
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.video}
      >
        <source src="/home/mascotas.mp4" type="video/mp4" />
      </video>
      */}
        </div>
    );
}
