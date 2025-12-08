import { BASE_API } from "@/config/apiConfig";

const ARTISTS_URL = `${BASE_API}/artists`;
const SPECIALITIES_URL = `${BASE_API}/specialities/types`;

// Crear perfil de artista
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
        } catch (_) {
            // si no viene JSON, lo dejamos en null
        }

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

// obtener tipos de especialidades
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
        } catch (_) {
        }

        if (!res.ok) {
            const message =
                payload?.message ||
                payload?.error ||
                "No se pudieron obtener las especialidades.";
            return { ok: false, error: message };
        }

        // se espera un array (por ejemplo ["MUSIC", "ILLUSTRATION", ...])
        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error obteniendo especialidades:", error);
        return {
            ok: false,
            error: "Error de red al obtener las especialidades.",
        };
    }
}
