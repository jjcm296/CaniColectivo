"use client";

import { useEffect, useRef, useState } from "react";
import { useVerification } from "@/features/auth/hooks/useVerification";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/features/ui/back-button/BackButton";
import styles from "./ValidarCodigo.module.css";

const RESEND_COOLDOWN = 30;

export default function ValidarCodigoPage() {
    const router = useRouter();
    const params = useSearchParams();
    const emailParam = params.get("email") || "";

    const { verifyCode, generateCode, isVerifying } = useVerification(emailParam);
    const { login } = useAuth();

    const [digits, setDigits] = useState(Array(6).fill(""));
    const [error, setError] = useState("");
    const [status, setStatus] = useState("idle");
    const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);
    const [canResend, setCanResend] = useState(false);

    const inputsRef = useRef([]);

    useEffect(() => {
        if (!emailParam) router.push("/auth/register");
    }, [emailParam, router]);

    useEffect(() => {
        if (canResend) return;
        if (secondsLeft === 0) {
            setCanResend(true);
            return;
        }

        const id = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);

        return () => clearInterval(id);
    }, [secondsLeft, canResend]);

    useEffect(() => {
        const filled = digits.every((d) => d !== "");
        if (filled && status !== "success" && !isVerifying) {
            handleVerify();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [digits]);

    const focusInput = (index) => {
        inputsRef.current[index]?.focus();
    };

    const clearInputs = () => {
        setDigits(Array(6).fill(""));
        setTimeout(() => focusInput(0), 10);
    };

    const handleChange = (index, value) => {
        const clean = value.replace(/\D/g, "");
        const next = [...digits];
        next[index] = clean.slice(-1) || "";
        setDigits(next);

        if (clean && index < 5) focusInput(index + 1);
        setError("");
        setStatus("idle");
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace") {
            event.preventDefault();

            if (digits[index]) {
                const next = [...digits];
                next[index] = "";
                setDigits(next);
                return;
            }

            if (index > 0) {
                focusInput(index - 1);
            }
        }

        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            focusInput(index - 1);
        }

        if (event.key === "ArrowRight" && index < digits.length - 1) {
            event.preventDefault();
            focusInput(index + 1);
        }
    };

    const handleVerify = async () => {
        const code = digits.join("");

        if (code.length !== 6) {
            setError("El código debe tener 6 dígitos.");
            setStatus("error");
            return;
        }

        const result = await verifyCode(code);

        if (!result.ok) {
            const errMsg = result.error || "";
            const lower = errMsg.toLowerCase();

            // Cuenta ya verificada → redirigir al login
            if (lower.includes("already") && lower.includes("verified")) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("pendingEmail");
                    localStorage.removeItem("pendingPassword");
                }
                router.push(`/auth/login?email=${encodeURIComponent(emailParam)}`);
                return;
            }

            setError(errMsg);
            setStatus("error");
            clearInputs();
            return;
        }

        setStatus("success");

        const pendingEmail =
            typeof window !== "undefined"
                ? localStorage.getItem("pendingEmail") || emailParam
                : emailParam;

        const pendingPassword =
            typeof window !== "undefined"
                ? localStorage.getItem("pendingPassword")
                : null;

        if (pendingEmail && pendingPassword) {
            await login({
                email: pendingEmail,
                password: pendingPassword,
            });

            if (typeof window !== "undefined") {
                localStorage.removeItem("pendingEmail");
                localStorage.removeItem("pendingPassword");
            }
        }

        setTimeout(() => {
            router.push(`/auth/register/artista?email=${encodeURIComponent(emailParam)}`);
        }, 700);
    };

    const handleResend = async () => {
        if (!canResend) return;

        const result = await generateCode();
        if (!result.ok) {
            setError(result.error);
            setStatus("error");
            return;
        }

        setDigits(Array(6).fill(""));
        setSecondsLeft(RESEND_COOLDOWN);
        setCanResend(false);
        setStatus("idle");
        setError("");
        focusInput(0);
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.topBar}>
                    <BackButton label="Volver" />
                </div>

                <h1 className={styles.title}>Verificar código</h1>
                <p className={styles.subtitle}>
                    Ingresa el código que enviamos a <strong>{emailParam}</strong>
                </p>

                <div className={styles.codeContainer}>
                    {digits.map((d, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputsRef.current[i] = el)}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            className={`${styles.codeInput} ${
                                status === "error" ? styles.codeInputError : ""
                            } ${status === "success" ? styles.codeInputSuccess : ""}`}
                            value={d}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                        />
                    ))}
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button
                    disabled={isVerifying}
                    onClick={handleVerify}
                    className={styles.button}
                >
                    {isVerifying ? "Verificando..." : "Confirmar"}
                </button>

                <div className={styles.resendRow}>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={!canResend}
                        className={`${styles.resendButton} ${
                            !canResend ? styles.resendButtonDisabled : ""
                        }`}
                    >
                        {canResend ? "Reenviar código" : `Reenviar código (${secondsLeft}s)`}
                    </button>
                </div>
            </section>
        </div>
    );
}
