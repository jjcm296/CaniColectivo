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

    const emailLink = email
        ? `mailto:${email.trim()}`
        : null;

    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Contacto</h2>

            <div className={styles.infoGroup}>
                {email && (
                    <div className={styles.row}>
                        <div className={styles.iconWrapper}>
                            {email && (
                                <SocialIcon
                                    type="email"
                                    href={emailLink}
                                    ariaLabel={`Perfil de ${email} en email`}
                                />
                            )}
                        </div>
                        <div>
                            <p className={styles.label}>Correo</p>
                            <p className={styles.value}>{email}</p>
                        </div>
                    </div>
                )}

                {whatsapp && (
                    <div className={styles.row}>
                        <div className={styles.iconWrapper}>
                            <SocialIcon
                                type="whatsapp"
                                href={waLink}
                                ariaLabel={`${waLink}`}
                            />
                        </div>
                        <div>
                            <p className={styles.label}>whatsapp</p>
                            <p className={styles.value}>{whatsapp}</p>
                        </div>
                    </div>
                )}

                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <SocialIcon
                            type="gps"
                            href="https://maps.app.goo.gl/"
                            ariaLabel="Ubicación"
                        />
                    </div>
                    <div>
                        <p className={styles.label}>Ubicación</p>
                        <p className={styles.value}>{city}</p>
                    </div>
                </div>

                <div className={styles.divider} />

                <p className={styles.label}>Redes sociales</p>
                <div className={styles.socialRow}>
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