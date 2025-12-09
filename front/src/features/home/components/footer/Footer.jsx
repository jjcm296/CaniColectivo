'use client';

import Link from 'next/link';
import Image from 'next/image';
import SocialIcon from '@/features/ui/social-icon/SocialIcon';
import styles from './Footer.module.css';

const invert = false;
const SOCIAL_LINKS = [
    {
        type: 'instagram',
        href: 'https://www.instagram.com/canicolectivo?igsh=a3dvNDBxcGh2MDdy',
        aria: 'Instagram Cani Colectivo',
        invert: invert,
    },
    {
        type: 'facebook',
        href: 'https://www.facebook.com/share/19rxkVm2Vj/',
        aria: 'Facebook Cani Colectivo',
        invert: invert,
    },
    {
        type: 'tiktok',
        href: 'https://www.tiktok.com/@cani.colectivo',
        aria: 'TikTok Cani Colectivo',
        invert: invert,
    },
    {
        type: 'x',
        href: 'https://x.com',
        aria: 'Perfil en X (Twitter)',
        invert: invert,
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            id="footer"
            className={styles.ccFooter}
            role="contentinfo"
            aria-label="Pie de página Cani Colectivo"
        >
            {/* Cinta superior */}
            <div className={styles.ccRibbon} aria-hidden="true">
                <span className={`${styles.r} ${styles.rRed}`} />
                <span className={`${styles.r} ${styles.rOr}`} />
                <span className={`${styles.r} ${styles.rYl}`} />
                <span className={`${styles.r} ${styles.rGr}`} />
                <span className={`${styles.r} ${styles.rBl}`} />
                <span className={`${styles.r} ${styles.rNv}`} />
            </div>

            {/* Contenido interno */}
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

                    {/* Redes sociales desde arreglo */}
                    <nav className={styles.social} aria-label="Redes sociales">
                        {SOCIAL_LINKS.map((s) => (
                            <SocialIcon
                                key={s.type}
                                type={s.type}
                                href={s.href}
                                ariaLabel={s.aria}
                                invert={s.invert}
                            />
                        ))}
                    </nav>
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

            {/* Legal */}
            <div className={styles.ccLegal}>
                <p className={styles.copy}>
                    © {year} Cani Colectivo · Todos los derechos reservados
                </p>
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
