"use client";

import SocialIcon from "@/features/ui/social-icon/SocialIcon";
import { MapPin, Mail } from "lucide-react";
import styles from "./ArtistProfileContact.module.css";

export default function ArtistProfileContact({ artist }) {
    const { name, city, email, social = {} } = artist || {};
    const { whatsapp, instagram, tiktok, facebook, x } = social;

    const waLink = whatsapp
        ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
        : null;

    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Contacto</h2>

            <div className={styles.infoGroup}>
                {email && (
                    <div className={styles.row}>
                        <div className={styles.iconWrapper}>
                            <Mail className={styles.icon} aria-hidden="true" />
                        </div>
                        <div>
                            <p className={styles.label}>Correo</p>
                            <p className={styles.value}>{email}</p>
                        </div>
                    </div>
                )}

                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <MapPin className={styles.icon} aria-hidden="true" />
                    </div>
                    <div>
                        <p className={styles.label}>Ubicación</p>
                        <p className={styles.value}>{city}</p>
                    </div>
                </div>

                <div className={styles.divider} />

                <p className={styles.label}>Redes sociales</p>
                <div className={styles.socialRow}>
                    {waLink && (
                        <SocialIcon
                            type="whatsapp"
                            href={waLink}
                            ariaLabel={`WhatsApp de ${name}`}
                        />
                    )}
                    {instagram && (
                        <SocialIcon
                            type="instagram"
                            href={instagram}
                            ariaLabel={`Instagram de ${name}`}
                        />
                    )}
                    {facebook && (
                        <SocialIcon
                            type="facebook"
                            href={facebook}
                            ariaLabel={`Facebook de ${name}`}
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
        </section>
    );
}