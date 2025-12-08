"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./LoginForm.module.css";
import AuthSidePanel from "../auth-side-panel/AuthSidePanel";
import BackButton from "@/features/ui/back-button/BackButton";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const emailFromQuery = searchParams?.get("email") || "";

    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState(emailFromQuery);
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");

    const validate = () => {
        const e = {};

        if (!email.trim()) e.email = "Ingresa un correo.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            e.email = "Correo inválido.";
        }

        if (!password) e.password = "Ingresa tu contraseña.";
        else if (password.length < 8) e.password = "Mínimo 8 caracteres.";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setFormError("");

        if (!validate()) return;

        const result = await login({ email, password });

        if (!result.ok) {
            const msg = result.error || "";

            if (msg === "INVALID_CREDENTIALS") {
                setFormError("Correo o contraseña incorrectos.");
            } else if (msg === "USER_NOT_VERIFIED") {
                router.push(`/auth/validar-codigo?email=${encodeURIComponent(email)}`);
            } else if (msg === "LOGIN_INVALID_RESPONSE") {
                setFormError("Respuesta inesperada del servidor de autenticación.");
            } else if (msg === "TOKEN_NOT_PROVIDED") {
                setFormError("El servidor no envió el token de sesión.");
            } else if (msg === "EXPIRATION_NOT_PROVIDED") {
                setFormError("El servidor no envió el tiempo de expiración.");
            } else {
                setFormError(msg || "Error al iniciar sesión.");
            }

            return;
        }

        // Login OK → redirige
        router.push("/");
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.topBar}>
                    <BackButton label="Volver" />
                </div>

                <header className={styles.header}>
                    <p className={styles.kicker}>Iniciar sesión</p>
                    <h1 className={styles.title}>Vuelve a tu espacio creativo</h1>
                    <p className={styles.subtitle}>
                        Inicia sesión para acceder a tu perfil, descubrir eventos, seguir artistas
                        y guardar los procesos que te inspiran.
                    </p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label className={styles.label}>Correo electrónico</label>
                        <input
                            type="email"
                            autoComplete="email"
                            className={`${styles.input} ${
                                errors.email ? styles.inputError : ""
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            className={`${styles.input} ${
                                errors.password ? styles.inputError : ""
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Tu contraseña"
                        />
                        {errors.password && (
                            <p className={styles.error}>{errors.password}</p>
                        )}
                    </div>

                    {formError && <p className={styles.error}>{formError}</p>}

                    <button type="submit" className={styles.submit} disabled={isLoading}>
                        {isLoading ? "Ingresando..." : "Iniciar sesión"}
                    </button>

                    <p className={styles.footerText}>
                        ¿Aún no tienes cuenta?{" "}
                        <a href="/auth/register" className={styles.link}>
                            Regístrate aquí
                        </a>
                    </p>
                </form>
            </section>

            <AuthSidePanel
                imageAlt="Login CANI"
                title="Tu espacio creativo te espera."
                text="Vuelve a tus artistas, procesos y proyectos guardados, y descubre nuevos eventos."
                highlight="Inicia sesión para disfrutar una experiencia personalizada en la comunidad CANI."
            />
        </div>
    );
}
