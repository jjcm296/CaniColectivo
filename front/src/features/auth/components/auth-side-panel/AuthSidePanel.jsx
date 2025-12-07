'use client';

import styles from './AuthSidePanel.module.css';

export default function AuthSidePanel({
                                          imageSrc = '/home/Logo_cani.svg',
                                          imageAlt = 'Panel ilustración',
                                          badgeLabel = 'CANI Colectivo',
                                          title,
                                          text,
                                          highlight,
                                      }) {
    return (
        <aside className={styles.side}>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={styles.sideImage}
                />
            )}

            {badgeLabel && (
                <div className={styles.badge}>{badgeLabel}</div>
            )}

            <h2 className={styles.sideTitle}>{title}</h2>

            <p className={styles.sideText}>
                {text}{' '}
                {highlight && (
                    <span className={styles.sideTextStrong}>
                        {highlight}
                    </span>
                )}
            </p>
        </aside>
    );
}
