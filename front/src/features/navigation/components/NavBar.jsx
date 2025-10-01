'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const left = [
        { href: '/', label: 'Inicio' },
        { href: '/artistas', label: 'Artistas' },
        { href: '/eventos', label: 'Eventos' },
        { href: '/nosotros', label: 'Nosotros' },
        { href: '/contacto', label: 'Contacto' },
    ];

    const right = [
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' },
    ];

    const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
    const closeMenu = () => setOpen(false);

    return (
        <header className={styles.nbWrapper}>
            <div className={styles.nbInner}>
                <div className={styles.nbBrand}>
                    <Link href="/" className={styles.nbBrandLink} onClick={closeMenu}>
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
                    {left.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`${styles.nbLink} ${isActive(l.href) ? styles.nbActive : ''}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.nbActions}>
                    {right.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`${styles.nbAction} ${isActive(l.href) ? styles.nbActive : ''}`}
                        >
                            {l.label}
                        </Link>
                    ))}
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

            <div id="menu-movil" className={`${styles.nbPanel} ${open ? styles.nbPanelOpen : ''}`}>
                <div className={styles.nbPanelSection}>
                    {left.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={closeMenu}
                            className={`${styles.nbPanelLink} ${isActive(l.href) ? styles.nbActive : ''}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
                <div className={styles.nbPanelSection}>
                    {right.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={closeMenu}
                            className={`${styles.nbPanelAction} ${isActive(l.href) ? styles.nbActive : ''}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
