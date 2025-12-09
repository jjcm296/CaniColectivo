import { BASE_API } from "@/config/apiConfig";

const ARTISTS_URL = `${BASE_API}/artists`;
const SPECIALITIES_URL = `${BASE_API}/specialities/types`;
const ME_URL = `${BASE_API}/users/me`;

// =============================
// Crear perfil de artista (POST /artists)
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
// ACTUALIZAR perfil de artista (PUT /artists/{id})
// =============================
export async function updateArtistProfile(artistId, body, token) {
    try {
        const res = await fetch(`${ARTISTS_URL}/${artistId}`, {
            method: "PUT",
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
                "No se pudo actualizar el perfil de artista.";
            return { ok: false, error: message };
        }

        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error al actualizar perfil de artista:", error);
        return {
            ok: false,
            error: "Error de red al actualizar el perfil de artista.",
        };
    }
}

// =============================
// Subir foto de artista (POST /artists/{id}/photo)
// =============================
export async function uploadArtistPhoto(artistId, file, token) {
    try {
        const url = `${ARTISTS_URL}/${artistId}/photo`;

        const formData = new FormData();
        formData.append("photo", file);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
        });

        let payload = null;
        try {
            payload = await res.json();
        } catch (_) {}

        if (!res.ok) {
            const message =
                payload?.message ||
                payload?.error ||
                "No se pudo subir la foto del artista.";
            return { ok: false, error: message };
        }

        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error al subir foto de artista:", error);
        return {
            ok: false,
            error: "Error de red al subir la foto del artista.",
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
            headers: { "Content-Type": "application/json" },
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
            headers: { "Content-Type": "application/json" },
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
        return { ok: true, data: payload || [] };
    } catch (error) {
        console.error("Error obteniendo artistas aprobados:", error);
        return {
            ok: false,
            error: "Error de red al obtener los artistas.",
        };
    }
}

// =============================
// Obtener perfil del artista autenticado (GET /users/me)
// =============================
export async function getMyArtistProfile(token) {
    try {
        const res = await fetch(ME_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: "include",
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
                "No se pudo obtener tu perfil.";
            return { ok: false, error: message };
        }

        const user = payload || {};
        const rawArtist = user.artist || null;

        if (!rawArtist) {
            return { ok: true, data: null };
        }

        const mappedArtist = {
            ...rawArtist,
            email: user.email,
            city: rawArtist.location,
            social: rawArtist.socialMedia || {},
            tags: Array.isArray(rawArtist.specialities)
                ? rawArtist.specialities
                    .map((s) => s.name || "")
                    .filter(Boolean)
                : [],
        };

        return { ok: true, data: mappedArtist };
    } catch (error) {
        console.error("Error obteniendo tu perfil:", error);
        return {
            ok: false,
            error: "Error de red al obtener tu perfil.",
        };
    }
}

export async function getArtistById(id) {
    try {
        const res = await fetch(`${ARTISTS_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
                "No se pudo obtener el artista.";
            return { ok: false, error: message };
        }

        return { ok: true, data: payload };
    } catch (error) {
        console.error("Error de red al obtener artista por id:", error);
        return { ok: false, error: "Error de red al obtener el artista." };
    }
}
