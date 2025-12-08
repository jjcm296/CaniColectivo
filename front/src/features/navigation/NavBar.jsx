"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

import UserAvatar from "./user-avatar/UserAvatar";
import UserPanel from "@/features/navigation/user-panel/UserPanel";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/artists/hooks/useCurrentUser";
import PendingArtistsBell from "@/features/artists/componensts/pending/PendingArtistsBell";
import {
    getPendingArtists, // usamos la lista para asegurar el número
    getPendingArtistsCount, // lo puedes dejar para uso futuro
} from "@/features/artists/api/artistAdminApi";

export default function NavBar() {
    const pathname = usePathname();

    const hideNavbar =
        pathname?.startsWith("/auth") ||
        pathname === "/auth" ||
        pathname === null;

    if (hideNavbar) return null;

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userPanelOpen, setUserPanelOpen] = useState(false);

    const [pendingCount, setPendingCount] = useState(0);

    const { isAuth: isAuthenticated } = useAuth();
    const { user: currentUser, isLoadingUser, token } = useCurrentUser();

    const left = [
        { href: "/", label: "Inicio" },
        { href: "/artists", label: "Artistas" },
        { href: "/events", label: "Eventos" },
        { href: "/about", label: "Nosotros" },
        { href: "/gallery", label: "Galería" },
        { href: "/#footer", label: "Contacto" },
    ];

    const right = [
        { href: "/auth/login", label: "Iniciar sesión" },
        { href: "/auth/register", label: "Registrarse" },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (userPanelOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [userPanelOpen]);

    const isActive = (href) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    const closeMenu = () => setOpen(false);

    const scrollToFooter = () => {
        const el = document.getElementById("footer");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const displayName =
        currentUser?.artist?.name ||
        currentUser?.username ||
        currentUser?.email ||
        "Usuario";

    const avatarImage = currentUser?.artist?.photoUrl || null;

    // roles puede ser array o un objeto
    const roleNames = Array.isArray(currentUser?.roles)
        ? currentUser.roles.map((r) => r.name)
        : currentUser?.roles?.name
            ? [currentUser.roles.name]
            : [];

    const isAdmin =
        roleNames.includes("admin") || roleNames.includes("ROLE_ADMIN");

    // 🔹 Cargamos la lista de pendientes al montar NavBar (solo admins autenticados)
    useEffect(() => {
        if (!token || !isAuthenticated || !isAdmin) {
            setPendingCount(0);
            return;
        }

        let cancelled = false;

        async function loadPendingCount() {
            // opción robusta: sacamos el número desde la lista
            const res = await getPendingArtists(token);

            if (cancelled) return;

            if (res.ok && Array.isArray(res.data)) {
                setPendingCount(res.data.length);
            } else {
                setPendingCount(0);
            }
        }

        loadPendingCount();

        return () => {
            cancelled = true;
        };
    }, [token, isAuthenticated, isAdmin]);

    return (
        <>
            <header
                className={`${styles.nbWrapper} ${
                    scrolled ? styles.nbScrolled : ""
                }`}
            >
                <div className={styles.nbInner}>
                    <div className={styles.nbBrand}>
                        <Link
                            href="/"
                            className={styles.nbBrandLink}
                            onClick={closeMenu}
                        >
                            <Image
                                src="/home/Logo_cani.svg"
                                alt="Logo"
                                width={56}
                                height={56}
                                className={styles.nbLogo}
                                priority
                            />
                        </Link>
                    </div>

                    <nav className={styles.nbNav} aria-label="Principal">
                        {left.map((l) => {
                            if (l.href === "/#footer") {
                                return (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className={styles.nbLink}
                                        onClick={(e) => {
                                            if (pathname === "/") {
                                                e.preventDefault();
                                                scrollToFooter();
                                                closeMenu();
                                            }
                                        }}
                                    >
                                        {l.label}
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={`${styles.nbLink} ${
                                        isActive(l.href) ? styles.nbActive : ""
                                    }`}
                                >
                                    {l.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className={styles.nbActions}>
                        {isAuthenticated && isAdmin && token && (
                            <div className={styles.nbNotifSlot}>
                                <PendingArtistsBell
                                    token={token}
                                    initialCount={pendingCount}
                                />
                            </div>
                        )}

                        {isAuthenticated ? (
                            <UserAvatar
                                name={isLoadingUser ? "Cargando..." : displayName}
                                imageUrl={avatarImage}
                                href="/profile"
                                onClick={() => setUserPanelOpen((v) => !v)}
                                showLabel={true}
                            />
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className={`${styles.nbAction} ${styles.nbActionLogin}`}
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className={`${styles.nbAction} ${styles.nbActionRegister}`}
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className={styles.nbToggle}
                        aria-label="Abrir menú"
                        aria-expanded={open}
                        aria-controls="menu-movil"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className={styles.nbToggleBar} />
                        <span className={styles.nbToggleBar} />
                        <span className={styles.nbToggleBar} />
                    </button>
                </div>

                <div
                    id="menu-movil"
                    className={`${styles.nbPanel} ${
                        open ? styles.nbPanelOpen : ""
                    }`}
                >
                    <div className={styles.nbPanelSection}>
                        {left.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={closeMenu}
                                className={`${styles.nbPanelLink} ${
                                    isActive(l.href) ? styles.nbActive : ""
                                }`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {!isAuthenticated && (
                        <div className={styles.nbPanelSection}>
                            {right.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={closeMenu}
                                    className={`${styles.nbPanelAction} ${
                                        isActive(l.href) ? styles.nbActive : ""
                                    }`}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <UserPanel
                open={userPanelOpen}
                onClose={() => setUserPanelOpen(false)}
                user={currentUser}
                isAdmin={isAdmin}
                token={token}
            />
        </>
    );
}
