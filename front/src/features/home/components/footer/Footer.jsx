'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="footer" className={styles.ccFooter} role="contentinfo" aria-label="Pie de página Cani Colectivo">
            <div className={styles.ccRibbon} aria-hidden="true">
                <span className={`${styles.r} ${styles.rRed}`} />
                <span className={`${styles.r} ${styles.rOr}`} />
                <span className={`${styles.r} ${styles.rYl}`} />
                <span className={`${styles.r} ${styles.rGr}`} />
                <span className={`${styles.r} ${styles.rBl}`} />
                <span className={`${styles.r} ${styles.rNv}`} />
            </div>

            <div className={styles.ccInner}>
                {/* Marca */}
                <section className={`${styles.col} ${styles.brand}`}>
                    <Link className={styles.logo} href="/" aria-label="Ir al inicio">
                        <Image
                            src="/home/Logo_cani.svg"
                            alt="Cani Colectivo"
                            width={60}
                            height={60}
                            className={styles.logoImg}
                            priority
                        />
                        <span className={styles.logoText}>Cani Colectivo</span>
                    </Link>

                    <p className={styles.tagline}>
                        Comunidad creativa que impulsa artistas, eventos y colaboraciones con impacto.
                    </p>

                    <div className={styles.social} aria-label="Redes sociales">
                        <a
                            className={styles.s}
                            href="https://www.instagram.com/canicolectivo?igsh=a3dvNDBxcGh2MDdy"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <IconInstagram className={styles.ico} />
                        </a>
                        <a
                            className={styles.s}
                            href="https://www.facebook.com/share/19rxkVm2Vj/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <IconFacebook className={styles.ico} />
                        </a>
                        <a
                            className={styles.s}
                            href="https://www.tiktok.com/@cani.colectivo"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <IconTiktok className={styles.ico} />
                        </a>
                        <a
                            className={styles.s}
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                        >
                            <IconX className={styles.ico} />
                        </a>
                    </div>
                </section>

                {/* Enlaces */}
                <nav className={`${styles.col} ${styles.links}`} aria-labelledby="tit-enlaces">
                    <h3 id="tit-enlaces" className={styles.colTitle}>Explorar</h3>
                    <ul className={styles.list}>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/artistas">Artistas</Link></li>
                        <li><Link href="/eventos">Eventos</Link></li>
                        <li><Link href="/nosotros">Nosotros</Link></li>
                    </ul>
                </nav>

                {/* Contacto */}
                <section className={`${styles.col} ${styles.contact}`} aria-labelledby="tit-contacto">
                    <h3 id="tit-contacto" className={styles.colTitle}>Contacto</h3>
                    <address className={styles.addr}>
                        <p>Email: <a href="mailto:hola@cani.com.mx">hola@cani.com.mx</a></p>
                        <p>Tel: <a href="tel:+521000000000">+52 1 000 000 0000</a></p>
                        <p>Coatzacoalcos, Ver</p>
                    </address>
                    <div className={styles.chips}>
                        <span className={styles.chip}>Booking</span>
                        <span className={styles.chip}>Prensa</span>
                        <span className={styles.chip}>Colaboraciones</span>
                    </div>
                </section>
            </div>

            <div className={styles.ccLegal}>
                <p className={styles.copy}>© {year} Cani Colectivo · Todos los derechos reservados</p>
                <ul className={styles.legalLinks}>
                    <li><Link href="/terminos">Términos de uso</Link></li>
                    <li><Link href="/privacidad">Política de privacidad</Link></li>
                    <li><Link href="/cookies">Cookies</Link></li>
                    <li><Link href="/accesibilidad">Accesibilidad</Link></li>
                </ul>
            </div>
        </footer>
    );
}

/* ===== ICONOS (SVG inline) ===== */
function IconInstagram({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.2a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.2z"/>
        </svg>
    );
}
function IconFacebook({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d="M13 22V12h3.5l.5-4H13V6.5c0-1.1.3-1.9 2-1.9h2V1.1C16.5 1 15.2 1 14 1c-3 0-5 1.9-5 5.4V8H6v4h3v10z"/>
        </svg>
    );
}
function IconTiktok({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d="M21 9.5a7.5 7.5 0 0 1-5.1-2.1v7.1a5.5 5.5 0 1 1-4-5.3v2.2a3.1 3.1 0 1 0 2.2 3V2h2.2a5.4 5.4 0 0 0 4.7 4.6z"/>
        </svg>
    );
}
function IconX({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d="M3 3h3.6l4.5 6.3L16.9 3H21l-7.3 9.8L21.3 21H17.7l-4.8-6.8L7 21H3l7.8-10.4z"/>
        </svg>
    );
}
