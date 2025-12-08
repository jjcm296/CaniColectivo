import { BASE_API } from "@/config/apiConfig";

const ARTISTS_URL = `${BASE_API}/artists`;
const SPECIALITIES_URL = `${BASE_API}/specialities/types`;

// =============================
// Crear perfil de artista
// =============================
export async function createArtistProfile(body, token) {
    try {
        const res = await fetch(ARTISTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body),
        });

        let payload = null;
        try {
            payload = await res.json();
        } catch (_) {}

        if (!res.ok) {
            const message =
                payload?.message ||
                payload?.error ||
                "No se pudo crear el perfil de artista.";
            return { ok: false, error: message };
        }

        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error al crear perfil de artista:", error);
        return {
            ok: false,
            error: "Error de red al crear el perfil de artista.",
        };
    }
}

// =============================
// Obtener tipos de especialidades
// =============================
export async function getSpecialityTypes() {
    try {
        const res = await fetch(SPECIALITIES_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let payload = null;
        try {
            payload = await res.json();
        } catch (_) {}

        if (!res.ok) {
            const message =
                payload?.message ||
                payload?.error ||
                "No se pudieron obtener las especialidades.";
            return { ok: false, error: message };
        }

        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error obteniendo especialidades:", error);
        return {
            ok: false,
            error: "Error de red al obtener las especialidades.",
        };
    }
}

// =============================
// Obtener TODOS los artistas aprobados  (GET /artists, público)
// =============================
export async function getApprovedArtists() {
    try {
        const res = await fetch(ARTISTS_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
                "No se pudieron obtener los artistas.";
            return { ok: false, error: message };
        }

        // se espera un array de artistas aprobados
        return { ok: true, data: payload || [] };
    } catch (error) {
        console.error("Error obteniendo artistas aprobados:", error);
        return {
            ok: false,
            error: "Error de red al obtener los artistas.",
        };
    }
}
