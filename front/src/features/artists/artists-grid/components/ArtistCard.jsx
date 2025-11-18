'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ArtistCard.module.css';
import SocialIcon from '@/features/ui/social-icon/SocialIcon';
import {slugify} from "@/features/utils/slugify";

export default function ArtistCard({
                                       id,
                                       name,
                                       city,
                                       tags = [],
                                       imageUrl = null,
                                       social = {},
                                       onSelect,
                                   }) {
    const router = useRouter();
    const { whatsapp, instagram, tiktok, facebook, x } = social || {};
    const initial = name?.charAt(0).toUpperCase() || '?';

    const waLink = whatsapp
        ? `https://wa.me/${whatsapp.replace(/\D/g, '')}`
        : null;
    const slug = slugify(name);

    const handleCardClick = (event) => {
        if (event.target.closest('a')) return;

        if (onSelect) {
            onSelect({ id, name, city, tags, imageUrl, social });
        }

        router.push(`/profile/${slug}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(event);
        }
    };

    return (
        <article
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className={styles.image}
                        sizes="350px"
                    />
                ) : (
                    <div className={styles.fallback}>{initial}</div>
                )}
            </div>

            <div className={styles.body}>
                <div className={styles.top}>
                    <p className={styles.name}>{name}</p>

                    {city && <p className={styles.city}>{city}</p>}

                    {tags.length > 0 && (
                        <div className={styles.tags}>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.socialRow}>
                    {waLink && (
                        <SocialIcon
                            type="whatsapp"
                            href={waLink}
                            ariaLabel={`Contactar a ${name} por WhatsApp`}
                        />
                    )}
                    {facebook && (
                        <SocialIcon
                            type="facebook"
                            href={facebook}
                            ariaLabel={`Facebook de ${name}`}
                        />
                    )}
                    {instagram && (
                        <SocialIcon
                            type="instagram"
                            href={instagram}
                            ariaLabel={`Instagram de ${name}`}
                        />
                    )}
                    {tiktok && (
                        <SocialIcon
                            type="tiktok"
                            href={tiktok}
                            ariaLabel={`TikTok de ${name}`}
                        />
                    )}
                    {x && (
                        <SocialIcon
                            type="x"
                            href={x}
                            ariaLabel={`Perfil de ${name} en X`}
                        />
                    )}
                </div>
            </div>
        </article>
    );
}
