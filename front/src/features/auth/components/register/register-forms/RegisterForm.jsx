"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.css";
import AuthSidePanel from "../../auth-side-panel/AuthSidePanel";
import BackButton from "@/features/ui/back-button/BackButton";
import { registerUser } from "@/features/auth/api/authApi";
import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";

const REGISTER_MESSAGES = {
    loading: "Creando tu cuenta en CANI...",
    success: "Te enviamos un código de verificación a tu correo.",
    redirectLogin:
        "Ya existe una cuenta con este correo. Inicia sesión para continuar.",
    defaultError: "No pudimos completar tu registro. Intenta de nuevo.",
};

export default function RegisterForm() {
    const router = useRouter();
    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const e = {};

        if (!email.trim()) e.email = "Ingresa un correo.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
            e.email = "Correo inválido.";

        if (!password) e.password = "Ingresa una contraseña.";
        else if (password.length < 8) e.password = "Mínimo 8 caracteres.";

        if (!passwordConfirm) e.passwordConfirm = "Confirma tu contraseña.";
        else if (password !== passwordConfirm)
            e.passwordConfirm = "No coinciden.";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setFormError("");

        if (!validate()) return;

        try {
            setSubmitting(true);
            showLoading(REGISTER_MESSAGES.loading);

            await registerUser({
                email,
                password,
            });

            hide();
            showSuccess(REGISTER_MESSAGES.success);

            // Guardar credenciales temporales para el login automático en validar código
            localStorage.setItem("pendingEmail", email);
            localStorage.setItem("pendingPassword", password);

            router.push(
                `/auth/validar-codigo?email=${encodeURIComponent(email)}`
            );
        } catch (err) {
            hide();
            const msg = err?.message || "";

            // Caso usuario ya registrado → redirigir a login solo con email
            if (msg === "REGISTER_FORBIDDEN") {
                showError(REGISTER_MESSAGES.redirectLogin);
                router.push(
                    `/auth/login?email=${encodeURIComponent(email)}`
                );
                return;
            }

            const finalMsg = REGISTER_MESSAGES.defaultError;
            setFormError(finalMsg);
            showError(finalMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.topBar}>
                    <BackButton label="Volver" />
                </div>

                <header className={styles.header}>
                    <p className={styles.kicker}>Crear cuenta</p>
                    <h1 className={styles.title}>Únete a la comunidad CANI</h1>
                    <p className={styles.subtitle}>
                        Regístrate con tu correo para guardar favoritos, seguir
                        artistas y recibir novedades.
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
                            autoComplete="new-password"
                            className={`${styles.input} ${
                                errors.password ? styles.inputError : ""
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres"
                        />
                        {errors.password && (
                            <p className={styles.error}>{errors.password}</p>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className={`${styles.input} ${
                                errors.passwordConfirm
                                    ? styles.inputError
                                    : ""
                            }`}
                            value={passwordConfirm}
                            onChange={(e) =>
                                setPasswordConfirm(e.target.value)
                            }
                            placeholder="Repite tu contraseña"
                        />
                        {errors.passwordConfirm && (
                            <p className={styles.error}>
                                {errors.passwordConfirm}
                            </p>
                        )}
                    </div>

                    {formError && (
                        <p className={styles.error}>{formError}</p>
                    )}

                    <button
                        type="submit"
                        className={styles.submit}
                        disabled={submitting}
                    >
                        {submitting ? "Creando cuenta..." : "Crear cuenta"}
                    </button>

                    <p className={styles.footerText}>
                        ¿Ya tienes cuenta?{" "}
                        <a href="/auth/login" className={styles.link}>
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
