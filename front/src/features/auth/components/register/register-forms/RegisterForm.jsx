'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterForm.module.css';
import AuthSidePanel from '../../auth-side-panel/AuthSidePanel';

export default function RegisterForm() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Ingresa un correo electrónico.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = 'Ingresa un correo electrónico válido.';
        }

        if (!password) {
            newErrors.password = 'Ingresa una contraseña.';
        } else if (password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        }

        if (!passwordConfirm) {
            newErrors.passwordConfirm = 'Confirma tu contraseña.';
        } else if (password !== passwordConfirm) {
            newErrors.passwordConfirm = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setSubmitting(true);

            console.log('Registrando usuario:', { email, password });

            setTimeout(() => {
                setSubmitting(false);
                router.push(`/validar-codigo?email=${encodeURIComponent(email)}`);
            }, 800);
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    };


    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <header className={styles.header}>
                    <p className={styles.kicker}>Crear cuenta</p>
                    <h1 className={styles.title}>Únete a la comunidad CANI</h1>
                    <p className={styles.subtitle}>
                        Regístrate con tu correo para guardar favoritos, seguir artistas y recibir novedades.
                    </p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres"
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="passwordConfirm" className={styles.label}>
                            Confirmar contraseña
                        </label>
                        <input
                            id="passwordConfirm"
                            type="password"
                            autoComplete="new-password"
                            className={`${styles.input} ${errors.passwordConfirm ? styles.inputError : ''}`}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="Repite tu contraseña"
                        />
                        {errors.passwordConfirm && (
                            <p className={styles.error}>{errors.passwordConfirm}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submit}
                        disabled={submitting}
                    >
                        {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>

                    <p className={styles.footerText}>
                        ¿Ya tienes cuenta?{' '}
                        <a href="/login" className={styles.link}>
                            Inicia sesión aquí
                        </a>
                    </p>
                </form>
            </section>

            <AuthSidePanel
                imageAlt="Registro CANI"
                title="Arte, comunidad y procesos vivos."
                text="Únete y forma parte del movimiento."
                highlight="Crea tu cuenta para seguir artistas, guardar procesos y descubrir nuevos eventos."
            />
        </div>
    );
}
