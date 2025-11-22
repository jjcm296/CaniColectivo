"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./EventDetail.module.css";

export default function EventDetail({ event }) {
    if (!event) return null;

    const {
        title,
        dateISO,
        venue,
        poster,
        description,
        isCause,
    } = event;

    const fecha = dateISO
        ? new Intl.DateTimeFormat("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(dateISO))
        : "";

    const hora = dateISO
        ? new Intl.DateTimeFormat("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(dateISO))
        : "";

    return (
        <div className={styles.wrapper}>
            <div className={styles.backRow}>
                <Link href="/events" className={styles.backLink}>
                    ⬅ Volver a eventos
                </Link>
            </div>

            <section className={styles.layout}>
                <div className={styles.posterColumn}>
                    <div className={styles.posterCard}>
                        <div className={styles.posterFrame}>
                            {poster && (
                                <Image
                                    src={poster}
                                    alt={title || "Evento"}
                                    fill
                                    sizes="(max-width: 768px) 90vw,
                                           (max-width: 1200px) 360px,
                                           420px"
                                    className={styles.poster}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.infoColumn}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{title}</h1>

                        {isCause && (
                            <span className={styles.causePill}>
                                Evento con causa
                            </span>
                        )}

                        {(fecha || hora || venue) && (
                            <p className={styles.meta}>
                                {(fecha || hora) && (
                                    <span className={styles.metaItem}>
                                        {fecha}
                                        {fecha && hora ? " · " : ""}
                                        {hora}
                                    </span>
                                )}

                                {venue && (
                                    <>
                                        {(fecha || hora) && (
                                            <span
                                                className={styles.dot}
                                                aria-hidden="true"
                                            />
                                        )}
                                        <span className={styles.metaItem}>
                                            {venue}
                                        </span>
                                    </>
                                )}
                            </p>
                        )}
                    </header>

                    <div className={styles.divider} />

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Acerca del evento
                        </h2>
                        <p className={styles.description}>
                            {description ||
                                "Muy pronto agregaremos más información sobre este evento. Mantente atento a nuestras actualizaciones."}
                        </p>
                    </section>

                    <section className={styles.ctaSection}>
                        <h2 className={styles.sectionTitle}>Registro</h2>

                        <button
                            type="button"
                            className={styles.btnPrimary}
                            onClick={() => {
                                console.log(
                                    "Registro interno pendiente de implementar."
                                );
                            }}
                        >
                            Registrarme
                        </button>
                    </section>
                </div>
            </section>
        </div>
    );
}
