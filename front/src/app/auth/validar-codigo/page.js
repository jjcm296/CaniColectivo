"use client";

import { useEffect, useRef, useState } from "react";
import { useVerification } from "@/features/auth/hooks/useVerification";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/features/ui/back-button/BackButton";
import styles from "./ValidarCodigo.module.css";

const RESEND_COOLDOWN = 30; // segundos

export default function ValidarCodigoPage() {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");

    const { verifyCode, generateCode } = useVerification();

    const [digits, setDigits] = useState(Array(6).fill(""));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle"); // "idle" | "success" | "error"

    const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);
    const [canResend, setCanResend] = useState(false);

    const inputsRef = useRef([]);

    useEffect(() => {
        if (!email) router.push("/auth/register");
    }, [email, router]);

    // Iniciar el cooldown al entrar a la página (ya se mandó un código)
    useEffect(() => {
        if (canResend) return;
        if (secondsLeft <= 0) {
            setCanResend(true);
            return;
        }

        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [canResend, secondsLeft]);

    const focusInput = (index) => {
        if (inputsRef.current[index]) {
            inputsRef.current[index].focus();
            inputsRef.current[index].select();
        }
    };

    const handleChange = (index, value) => {
        setStatus("idle");
        setError("");

        const onlyDigits = value.replace(/\D/g, "");
        if (!onlyDigits) {
            const updated = [...digits];
            updated[index] = "";
            setDigits(updated);
            return;
        }

        const digit = onlyDigits[onlyDigits.length - 1];

        const updated = [...digits];
        updated[index] = digit;
        setDigits(updated);

        if (index < digits.length - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace") {
            if (digits[index]) {
                const updated = [...digits];
                updated[index] = "";
                setDigits(updated);
            } else if (index > 0) {
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

    const handlePaste = (event) => {
        event.preventDefault();
        const paste = event.clipboardData.getData("text").replace(/\D/g, "");
        if (!paste) return;

        const updated = [...digits];
        for (let i = 0; i < digits.length; i++) {
            updated[i] = paste[i] || "";
        }
        setDigits(updated);

        const lastIndex = Math.min(paste.length, digits.length) - 1;
        if (lastIndex >= 0) {
            focusInput(lastIndex);
        }
    };

    const handleVerify = () => {
        setError("");
        setStatus("idle");

        const code = digits.join("");

        if (code.length !== 6) {
            setError("El código debe tener 6 dígitos.");
            setStatus("error");
            return;
        }

        const result = verifyCode(code);

        if (!result.ok) {
            setError(result.error);
            setStatus("error");
            return;
        }

        setStatus("success");
        setLoading(true);

        setTimeout(() => {
            router.push(`/auth/register/artista?email=${encodeURIComponent(email)}`);
        }, 750);
    };

    const handleResend = () => {
        if (!canResend) return;

        generateCode();

        setDigits(Array(6).fill(""));
        setStatus("idle");
        setError("");


        setCanResend(false);
        setSecondsLeft(RESEND_COOLDOWN);

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
                    Ingresa el código que enviamos a <strong>{email}</strong>
                </p>

                <div className={styles.codeContainer}>
                    {digits.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className={`
                                ${styles.codeInput}
                                ${status === "success" ? styles.codeInputSuccess : ""}
                                ${status === "error" ? styles.codeInputError : ""}
                            `}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                        />
                    ))}
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button
                    disabled={loading}
                    onClick={handleVerify}
                    className={styles.button}
                >
                    {loading ? "Verificando..." : "Confirmar"}
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
                        {canResend
                            ? "Reenviar código"
                            : `Reenviar código (${secondsLeft}s)`}
                    </button>
                </div>
            </section>
        </div>
    );
}
