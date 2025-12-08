import { BASE_API } from "@/config/apiConfig";

const PENDING_COUNT_URL = `${BASE_API}/artists/pending/count`;
const PENDING_ARTISTS_URL = `${BASE_API}/artists/pending`;
const ARTIST_APPROVE_URL = (id) => `${BASE_API}/artists/${id}/approve`;
const ME_URL = `${BASE_API}/users/me`;

export async function getPendingArtistsCount(token) {
    try {
        const res = await fetch(PENDING_COUNT_URL, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        if (!res.ok) {
            return { ok: false, count: 0 };
        }

        const payload = await res.json();

        let value = 0;

        if (typeof payload === "number") {
            value = payload;
        } else if (typeof payload?.count === "number") {
            value = payload.count;
        } else if (Array.isArray(payload)) {
            value = payload.length;
        }

        return { ok: true, count: value };
    } catch (err) {
        console.error("Pending count error:", err);
        return { ok: false, count: 0 };
    }
}

export async function getPendingArtists(token) {
    try {
        const res = await fetch(PENDING_ARTISTS_URL, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        let payload = null;
        try {
            payload = await res.json();
        } catch (_) {}

        if (!res.ok) {
            const msg =
                payload?.message ||
                payload?.error ||
                "Unable to load pending artists.";
            return { ok: false, error: msg, data: [] };
        }

        return { ok: true, data: payload || [] };
    } catch (err) {
        console.error("Pending artists error:", err);
        return { ok: false, error: "Network error", data: [] };
    }
}

export async function approveOrRejectArtist(id, isApproved, token) {
    try {
        const res = await fetch(ARTIST_APPROVE_URL(id), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ isApproved }),
        });

        const payload = await res.json().catch(() => null);

        if (!res.ok) {
            const msg =
                payload?.message ||
                payload?.error ||
                "Unable to update artist approval.";
            return { ok: false, error: msg };
        }

        return { ok: true, data: payload };
    } catch (err) {
        console.error("Approve/reject error:", err);
        return { ok: false, error: "Network error" };
    }
}

export async function getCurrentUser(token) {
    try {
        const res = await fetch(ME_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            cache: "no-store",
        });

        let payload = null;
        try {
            payload = await res.json();
        } catch (_) {}

        if (!res.ok) {
            const message =
                payload?.message ||
                payload?.error ||
                "No se pudo obtener la información del usuario.";
            return { ok: false, error: message };
        }

        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error obteniendo usuario actual:", error);
        return {
            ok: false,
            error: "Error de red al obtener el usuario actual.",
        };
    }
}
