'use client';

import Image from 'next/image';
import styles from './PanelAvatar.module.css';

export default function PanelAvatar({ imageUrl, name = "Usuario", onChangeImage }) {
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="160px"
                        className={styles.img}
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <span className={styles.initial}>{initial}</span>
                    </div>
                )}
            </div>

            <button
                type="button"
                className={styles.edit}
                onClick={onChangeImage}
                aria-label="Cambiar foto"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                >
                    <path d="M12 5c-.28 0-.5.22-.5.5v1.09C9.85 7.12 8 9.11 8 11.5c0 2.61 2.14 4.75 4.75 4.75S17.5 14.11 17.5 11.5c0-2.39-1.85-4.38-4.5-4.91V5.5c0-.28-.22-.5-.5-.5zm0 2c2.07 0 3.75 1.68 3.75 3.75S14.07 14.5 12 14.5 8.25 12.82 8.25 10.75 9.93 7 12 7z"></path>
                </svg>
            </button>
        </div>
    );
}
