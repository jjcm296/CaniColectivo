'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

export default function BackButton({ label = 'Volver' }) {
    const router = useRouter();

    return (
        <button
            type="button"
            className={styles.back}
            onClick={() => router.back()}
        >
      <span className={styles.iconCircle}>
        <span className={styles.iconArrow}>←</span>
      </span>
            <span className={styles.label}>{label}</span>
        </button>
    );
}
