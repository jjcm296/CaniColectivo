'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './UserAvatar.module.css';

export default function UserAvatar({
                                       name,
                                       imageUrl,
                                       href = '/profile',
                                       showLabel = true,
                                       onClick, // ⭐ NUEVO: permite abrir el panel lateral
                                   }) {
    const trimmedName = (name || '').trim();
    const initial = trimmedName.charAt(0).toUpperCase() || '?';
    const hasImage = Boolean(imageUrl);

    // Para mostrar solo el primer nombre en la etiqueta
    const firstName = trimmedName
        ? trimmedName.split(' ')[0]
        : 'Usuario';

    // ⭐ Importante:
    // Si existe onClick, evitamos navegación y ejecutamos el callback
    const handleClick = (event) => {
        if (onClick) {
            event.preventDefault();
            onClick(event);
        }
    };

    return (
        <Link
            href={href}
            className={styles.avatarLink}
            aria-label={name ? `Ir al perfil de ${name}` : 'Ir a mi perfil'}
            title={name || 'Mi perfil'}
            onClick={handleClick} /* ⭐ Soporte para abrir el panel */
        >
            <div className={styles.avatarCircle}>
                {hasImage ? (
                    <Image
                        src={imageUrl}
                        alt={name || 'Usuario'}
                        fill
                        className={styles.avatarImage}
                        sizes="36px"
                    />
                ) : (
                    <span className={styles.avatarInitial}>
                        {initial}
                    </span>
                )}
            </div>

            {showLabel && (
                <span className={styles.avatarLabel}>
                    {firstName}
                </span>
            )}
        </Link>
    );
}
