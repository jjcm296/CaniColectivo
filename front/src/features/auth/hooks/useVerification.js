"use client";

export function useVerification() {

    // Genera código de 6 dígitos
    const generateCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        console.log("Código generado (simulado):", code);

        // Guardar en localStorage (simulación mientras no hay backend)
        localStorage.setItem("verificationCode", code);
        localStorage.setItem("verificationExpires", Date.now() + 5 * 60 * 1000); // expira en 5 min
        localStorage.setItem("attemptsLeft", "3");

        console.log("Código generado (simulado):", code);
        return code;
    };

    // Verificar el código ingresado
    const verifyCode = (inputCode) => {
        const storedCode = localStorage.getItem("verificationCode");
        const expires = Number(localStorage.getItem("verificationExpires"));
        let attempts = Number(localStorage.getItem("attemptsLeft"));

        if (!storedCode || !expires) {
            return { ok: false, error: "No hay un código válido. Solicita uno nuevo." };
        }

        if (Date.now() > expires) {
            return { ok: false, error: "El código ha expirado. Solicita uno nuevo." };
        }

        if (attempts <= 0) {
            return { ok: false, error: "Demasiados intentos fallidos." };
        }

        if (inputCode !== storedCode) {
            attempts -= 1;
            localStorage.setItem("attemptsLeft", attempts.toString());
            return { ok: false, error: `Código incorrecto. Intentos restantes: ${attempts}` };
        }

        // ÉXITO: limpiar
        localStorage.removeItem("verificationCode");
        localStorage.removeItem("verificationExpires");
        localStorage.removeItem("attemptsLeft");

        return { ok: true };
    };

    return { generateCode, verifyCode };
}
