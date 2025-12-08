"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./LoginForm.module.css";
import AuthSidePanel from "../auth-side-panel/AuthSidePanel";
import BackButton from "@/features/ui/back-button/BackButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";

const LOGIN_MESSAGES = {
    loading: "Conectando con tu universo creativo...",
    success: "Bienvenido a CANI: explora artistas, eventos y procesos creativos.",
    errors: {
        INVALID_CREDENTIALS:
            "No pudimos iniciar tu sesión. Revisa tu correo y contraseña.",
        USER_NOT_FOUND:
            "No pudimos iniciar tu sesión. Revisa tu correo y contraseña.",
        EMAIL_NOT_FOUND:
            "No pudimos iniciar tu sesión. Revisa tu correo y contraseña.",
        USER_NOT_VERIFIED:
            "Aún no has verificado tu cuenta. Te llevamos a validar tu acceso.",
        LOGIN_INVALID_RESPONSE:
            "Tuvimos una respuesta inesperada del servidor. Intenta de nuevo.",
        TOKEN_NOT_PROVIDED: "El servidor no envió el token de sesión.",
        EXPIRATION_NOT_PROVIDED: "El servidor no envió el tiempo de expiración.",
        DEFAULT: "Tuvimos un problema al iniciar tu sesión.",
    },
};

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const emailFromQuery = searchParams?.get("email") || "";

    const { login, isLoading } = useAuth();
    const { showLoading, showSuccess, showError, hide } = useFeedback();

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

        showLoading(LOGIN_MESSAGES.loading);

        const result = await login({ email, password });

        hide();

        if (!result.ok) {
            const code = result.error || "";
            const map = LOGIN_MESSAGES.errors;
            const message = map[code] || map.DEFAULT;

            if (
                code === "INVALID_CREDENTIALS" ||
                code === "USER_NOT_FOUND" ||
                code === "EMAIL_NOT_FOUND"
            ) {
                setPassword("");
                setFormError(message);
                showError(message);
                return;
            }

            if (code === "USER_NOT_VERIFIED") {
                setFormError("");
                showError(message);
                router.push(
                    `/auth/validar-codigo?email=${encodeURIComponent(email)}`
                );
                return;
            }

            setFormError(message);
            showError(message);
            return;
        }

        showSuccess(LOGIN_MESSAGES.success);
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
                        Accede a tus artistas, procesos, eventos guardados y sigue
                        construyendo junto a la comunidad CANI.
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
                        {errors.email && (
                            <p className={styles.error}>{errors.email}</p>
                        )}
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
                text="Vuelve a tus artistas, procesos y proyectos guardados, y descubre nuevas voces y eventos."
                highlight="Inicia sesión para vivir una experiencia personalizada en la comunidad CANI."
            />
        </div>
    );
}
