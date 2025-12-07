import { BASE_API } from "@/config/apiConfig";

const AUTH_URL = `${BASE_API}/auth`;

export async function registerUser(data) {
    const res = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const raw = await res.text();

    if (!res.ok) {
        if (res.status === 403) {
            // caso especial: ya registrado o no permitido
            throw new Error("REGISTER_FORBIDDEN");
        }
        throw new Error(raw || "Error registering user");
    }
    try {
        return JSON.parse(raw);
    } catch {
        return raw;
    }
}
export async function loginUser(credentials) {
    const res = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials), // { email, password }
    });
    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(errorText || "Error al iniciar sesión");
    }
    return res.json();
}

export async function verifyUser({ email, verificationCode }) {
    const res = await fetch(`${AUTH_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(errorText || "Error al verificar la cuenta");
    }
    return res.text();
}

export async function resendVerificationCode(email) {
    const params = new URLSearchParams({ email });

    const res = await fetch(`${AUTH_URL}/resend?${params.toString()}`, {
        method: "POST",
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(errorText || "Error al reenviar código de verificación");
    }

    return res.text();
}
