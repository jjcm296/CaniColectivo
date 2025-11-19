'use client';

import Link from 'next/link';
import styles from './SocialIcon.module.css';
import Image from "next/image";


const icons = {
    whatsapp: (
        <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className={`${styles.svg} ${styles.whatsappSvg}`}
        >
            <path
                fill="currentColor"
                d="M16 3C9.4 3 4 8.3 4 14.9c0 2.5.8 4.8 2.1 6.8L5 29l7.6-2.3c1.1.3 2.3.5 3.4.5 6.6 0 12-5.3 12-11.9C28 8.3 22.6 3 16 3zm0 21.3c-1.1 0-2.2-.2-3.3-.6l-.5-.2-4.5 1.4 1.4-4.4-.3-.4c-1.2-1.7-1.9-3.7-1.9-5.7C7 10 11 6 16 6s9 4 9 9c0 5-4 9.3-9 9.3zm5-6.8c-.3-.2-1.7-.8-1.9-.9-.3-.1-.4-.2-.6.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.6-1-.9-1.6-2-1.8-2.3-.2-.3-.02-.5.15-.7.15-.15.3-.36.43-.52.15-.18.2-.29.28-.48.1-.2.05-.35-.03-.48-.1-.13-1.1-2.5-1.5-3.5-.38-.9-.8-.8-1.06-.8H11c-.28 0-.67.1-1 .5-.35.37-1.4 1.32-1.4 3.2s1.5 3.7 1.7 4c.2.3 2.9 4.4 7 6.1.98.42 1.75.68 2.37.85.98.3 1.88.27 2.6.16.8-.1 2.54-1 2.9-2 .35-1 .35-1.8.24-2-.1-.2-.3-.3-.6-.45z"
            />
        </svg>
    ),

    facebook: (
        <div className={styles.iconWrapper}>
            <svg viewBox="0 0 512 512" className={`${styles.fullIcon} ${styles.fbColor}`}>
                <circle cx="256" cy="256" r="256" fill="#1877F2" />
                <path
                    fill="white"
                    d="M302 176h-28c-22 0-26 10.7-26 26v34h53l-7 53h-46v137h-56V289h-47v-53h47v-39c0-46 28-71 69-71c20 0 37 2 41 2v48z"
                />
            </svg>

            <svg viewBox="0 0 512 512" className={`${styles.fullIcon} ${styles.fbWhite}`}>
                <circle cx="256" cy="256" r="256" fill="#ffffff" />
                <path
                    fill="#1877F2"
                    d="M302 176h-28c-22 0-26 10.7-26 26v34h53l-7 53h-46v137h-56V289h-47v-53h47v-39c0-46 28-71 69-71c20 0 37 2 41 2v48z"
                />
            </svg>
        </div>
    ),

    instagram: (
        <svg viewBox="0 0 100 100"  className={`${styles.svg} ${styles.instagramSvg}`} aria-hidden="true">
            <defs>
                <linearGradient id="igRealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f5bd5"/>
                    <stop offset="25%" stopColor="#962fbf"/>
                    <stop offset="50%" stopColor="#d62976"/>
                    <stop offset="75%" stopColor="#fa7e1e"/>
                    <stop offset="100%" stopColor="#feda75"/>
                </linearGradient>
            </defs>

            <g
                className={styles.igGlyphSolid}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="18" y="18" width="64" height="64" rx="18" />
                <circle cx="50" cy="50" r="18" />
                <circle cx="70" cy="30" r="4" fill="currentColor" stroke="none" />
            </g>

            <g
                className={styles.igGlyphGradient}
                fill="none"
                stroke="url(#igRealGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="18" y="18" width="64" height="64" rx="18" />
                <circle cx="50" cy="50" r="18" />
                <circle cx="70" cy="30" r="4" fill="url(#igRealGradient)" stroke="none" />
            </g>
        </svg>
    ),

    tiktok: (
        <svg viewBox="0 0 256 256" aria-hidden="true" className={styles.svg}>
            <path
                d="M180.7 68.1c-14.6-8.2-24-23.4-24-40.3V24h-35v133.2c0 14.2-11.5 25.7-25.7 25.7S70.3 171.4 70.3 157.2c0-14.1 11.3-25.5 25.4-25.7 3 0 5.9.5 8.6 1.5V95.4a63.2 63.2 0 0 0-8.7-.6c-34.9 0-63.3 28.4-63.3 63.3S60.7 221.4 95.6 221.4c34.9 0 63.3-28.4 63.3-63.3v-51c12.6 9.6 28.3 15.3 45.3 15.3h1.4V87.3a74 74 0 0 1-24.9-19.2z"
                fill="#25F4EE"
                opacity="0.9"
                transform="translate(6, 6)"
            />
            <path
                d="M180.7 68.1c-14.6-8.2-24-23.4-24-40.3V24h-35v133.2c0 14.2-11.5 25.7-25.7 25.7S70.3 171.4 70.3 157.2c0-14.1 11.3-25.5 25.4-25.7 3 0 5.9.5 8.6 1.5V95.4a63.2 63.2 0 0 0-8.7-.6c-34.9 0-63.3 28.4-63.3 63.3S60.7 221.4 95.6 221.4c34.9 0 63.3-28.4 63.3-63.3v-51c12.6 9.6 28.3 15.3 45.3 15.3h1.4V87.3a74 74 0 0 1-24.9-19.2z"
                fill="#FE2C55"
                opacity="0.9"
                transform="translate(-6, -6)"
            />
            <path
                d="M180.7 68.1c-14.6-8.2-24-23.4-24-40.3V24h-35v133.2c0 14.2-11.5 25.7-25.7 25.7S70.3 171.4 70.3 157.2c0-14.1 11.3-25.5 25.4-25.7 3 0 5.9.5 8.6 1.5V95.4a63.2 63.2 0 0 0-8.7-.6c-34.9 0-63.3 28.4-63.3 63.3S60.7 221.4 95.6 221.4c34.9 0 63.3-28.4 63.3-63.3v-51c12.6 9.6 28.3 15.3 45.3 15.3h1.4V87.3a74 74 0 0 1-24.9-19.2z"
                fill="currentColor"
            />
        </svg>
    ),

    x: (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={styles.svg}
        >
            <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.505 11.24H16.57l-5.24-6.862-6.004 6.862H2.02l7.73-8.83L1.5 2.25h7.636l4.713 6.267 4.395-6.267zm-1.16 17.52h1.833L7.25 4.13H5.29l11.794 15.64z"
            />
        </svg>
    ),
    email: (
        <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className={styles.svg}
        >
            <rect
                x="7"
                y="11"
                width="34"
                height="26"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
            />
            <path
                d="M9 15l15 11 15-11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
        ),
};

export default function SocialIcon({ type, href, invert = true, ariaLabel }) {
    if (!href) return null;

    const isGps = type === 'gps';
    const icon = icons[type];

    return (
        <Link
            href={href}
            className={`${styles.icon} ${styles[type]} ${invert ? styles.invert : ''}`}
            aria-label={ariaLabel || type}
            target="_blank"
            rel="noopener noreferrer"
        >
            {isGps ? (
                <Image
                    src="/icons/Google_Maps-icon-Logo.svg"
                    alt={ariaLabel || 'Ubicación'}
                    width={35}
                    height={35}
                    className={styles.gpsLogo}
                />
            ) : (
                icon
            )}
        </Link>
    );
}
