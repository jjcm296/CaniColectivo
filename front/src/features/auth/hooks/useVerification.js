"use client";

import { useCallback, useState } from "react";
import { verifyUser, resendVerificationCode } from "@/features/auth/api/authApi";

export function useVerification(email) {
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const generateCode = useCallback(async () => {
        if (!email) return { ok: false, error: "Email inválido." };

        setIsSending(true);
        try {
            await resendVerificationCode(email);
            setAttemptsLeft(3);
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err?.message || "Error al reenviar código." };
        } finally {
            setIsSending(false);
        }
    }, [email]);

    const verifyCode = useCallback(
        async (inputCode) => {
            if (!email) return { ok: false, error: "Email inválido." };
            if (!inputCode) return { ok: false, error: "Código vacío." };
            if (attemptsLeft <= 0)
                return { ok: false, error: "Sin intentos restantes. Pide otro código." };

            setIsVerifying(true);
            try {
                await verifyUser({ email, verificationCode: inputCode });
                setAttemptsLeft(3);
                return { ok: true };
            } catch (err) {
                const next = attemptsLeft - 1;
                setAttemptsLeft(next);
                return {
                    ok: false,
                    error: next > 0 ? `Código incorrecto. Intentos: ${next}` : "Sin intentos.",
                };
            } finally {
                setIsVerifying(false);
            }
        },
        [email, attemptsLeft]
    );

    return { generateCode, verifyCode, attemptsLeft, isSending, isVerifying };
}
