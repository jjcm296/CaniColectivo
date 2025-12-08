"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import AuthSidePanel from "../auth-side-panel/AuthSidePanel";
import BackButton from "@/features/ui/back-button/BackButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";

const GENERIC_ERROR =
    "No pudimos iniciar tu sesión. Revisa tu correo y contraseña.";

export default function LoginForm({ initialEmail = "" }) {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const [email, setEmail] = useState(initialEmail);
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

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setFormError("");

        if (!validate()) return;

        showLoading("Conectando con tu universo creativo...");

        const result = await login({ email, password });

        hide();

        if (!result.ok) {
            setPassword("");
            setFormError(GENERIC_ERROR);
            showError(GENERIC_ERROR);
            return;
        }

        showSuccess(
            "Bienvenido a CANI: explora artistas, eventos y procesos creativos."
        );
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
                        Accede a tus artistas, procesos y eventos guardados.
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
                text="Vuelve a tus artistas, procesos y proyectos guardados."
                highlight="Inicia sesión para vivir una experiencia personalizada en la comunidad CANI."
            />
        </div>
    );
}
