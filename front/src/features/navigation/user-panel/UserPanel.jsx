"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PanelAvatar from "@/features/navigation/panel-avatar/PanelAvatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";
import styles from "./UserPanel.module.css";

export default function UserPanel({ open, onClose, user }) {
    const router = useRouter();
    const { logout } = useAuth();
    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    };

    const handleLogout = async () => {
        try {
            showLoading("Cerrando sesión...");

            await logout();

            hide();
            showSuccess("Sesión cerrada. Vuelve pronto a CANI.");

            onClose?.();
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            hide();
            showError("No pudimos cerrar tu sesión. Intenta de nuevo.");
        }
    };

    const name = user?.name || "Invitado";
    const firstName = name.split(" ")[0] || "Invitado";

    const accountLinks = [
        { href: "/profile", label: "Ver perfil", description: "Edita tus datos y tu bio" },
        { href: "/events", label: "Mis eventos", description: "Revisa tus eventos y participaciones" },
        { href: "/settings", label: "Configuración", description: "Preferencias de cuenta y privacidad" },
    ];

    const exploreLinks = [
        { href: "/artists", label: "Explorar artistas", description: "Descubre nuevos proyectos y colectivos" },
        { href: "/events", label: "Explorar eventos", description: "Encuentra eventos y exposiciones" },
        { href: "/#footer", label: "Contacto", description: "Escríbenos para soporte o colaboraciones" },
    ];

    return (
        <div
            className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
            aria-hidden={!open}
            onClick={handleBackdropClick}
        >
            <aside
                className={styles.panel}
                aria-label="Menú de usuario"
                onClick={(e) => e.stopPropagation()}
            >
                <header className={styles.topBar}>
                    <span className={styles.topTitle}>{name}</span>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Cerrar menú de usuario"
                    >
                        ×
                    </button>
                </header>

                <section className={styles.profileSection}>
                    <div>
                        <PanelAvatar
                            name={name}
                            imageUrl={user?.imageUrl}
                            href="/profile"
                            showLabel={false}
                        />
                    </div>
                    <div>
                        <p className={styles.helloText}>Hola, {firstName}</p>
                        <p className={styles.subHelloText}>
                            Administra tu experiencia en Cani Colectivo
                        </p>
                    </div>
                    <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={() => {
                            router.push("/profile");
                            onClose?.();
                        }}
                    >
                        Ver perfil completo
                    </button>

                    <div className={styles.quickActions}>
                        <button
                            type="button"
                            className={styles.secondaryButton}
                        >
                            Cambiar cuenta
                        </button>
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </section>

                <nav className={styles.nav}>
                    <div className={styles.navBlock}>
                        <h3 className={styles.blockTitle}>Tu cuenta</h3>
                        <div className={styles.cardList}>
                            {accountLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.cardItem}
                                    onClick={onClose}
                                >
                                    <div className={styles.cardIcon} aria-hidden="true">
                                        <span className={styles.iconDot} />
                                    </div>
                                    <div className={styles.cardText}>
                                        <span className={styles.cardTitle}>{item.label}</span>
                                        <span className={styles.cardDescription}>
                                            {item.description}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className={styles.navBlock}>
                        <h3 className={styles.blockTitle}>Explorar</h3>
                        <div className={styles.cardList}>
                            {exploreLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.cardItem}
                                    onClick={onClose}
                                >
                                    <div className={styles.cardIcon} aria-hidden="true">
                                        <span className={styles.iconDot} />
                                    </div>
                                    <div className={styles.cardText}>
                                        <span className={styles.cardTitle}>{item.label}</span>
                                        <span className={styles.cardDescription}>
                                            {item.description}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    );
}
