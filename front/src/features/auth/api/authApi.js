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

export async function loginUser(data) {
    const res = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const raw = await res.text();

    let parsed = null;
    try {
        parsed = raw ? JSON.parse(raw) : null;
    } catch {
        // no es JSON, se queda en null
    }

    console.log("LOGIN API RAW RESPONSE:", res.status, parsed ?? raw);

    if (!res.ok) {
        // mapeos explícitos por status
        if (res.status === 401) {
            throw new Error("INVALID_CREDENTIALS");
        }
        if (res.status === 403) {
            throw new Error("USER_NOT_VERIFIED");
        }

        console.error("LOGIN API ERROR:", {
            status: res.status,
            body: parsed ?? raw,
        });

        const msg =
            (parsed && (parsed.message || parsed.error || parsed.code)) ||
            raw ||
            res.statusText ||
            "LOGIN_ERROR";

        throw new Error(msg);
    }

    if (!parsed) {
        throw new Error("LOGIN_INVALID_RESPONSE");
    }

    // aquí esperamos { token, expiresIn }
    return parsed;
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
