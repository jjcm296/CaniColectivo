import {BASE_API} from "@/config/apiConfig";

const MULTIMEDIA_URL = `${BASE_API}/multimedia`;


// ========= endpoints videos ========
// Crear banner de video (URL pública)
export async function createBannerVideo(url) {
    const res = await fetch(`${MULTIMEDIA_URL}/banner/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error("Error al crear el banner de video");
    return res.json();
}



// ========= endpoints imagenes banner ========
// Subir imagen de banner (archivo)
export async function uploadBannerImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${MULTIMEDIA_URL}/banner/image`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        // Extrae el texto del error para diagnóstico
        const errorText = await res.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Error al subir la imagen: ${errorText}`);
    }
    return res.json();
}

// Obtener imagenes banner activas (1)
export async function getAllActiveBannerImages() {
    const res = await fetch(`${MULTIMEDIA_URL}/banner/image/active`);
    if (!res.ok) throw new Error("Error al obtener videos");
    return res.json();
}

// Obtener imagenes banner destacadas (2)
export async function getAllFeaturesBannerImages() {
    const res = await fetch(`${MULTIMEDIA_URL}/banner/image/featured`);
    if (!res.ok) throw new Error("Error al obtener videos");
    return res.json();
}

// Obtener imagenes banner inactivas (3)
export async function getAllInactiveBannerImages() {
    const res = await fetch(`${MULTIMEDIA_URL}/banner/image/inactive`);
    if (!res.ok) throw new Error("Error al obtener videos");
    return res.json();
}

// ========= endpoint genérico multimedia ========
// Eliminar multimedia por id
export async function deleteMultimedia(id) {
    const res = await fetch(`${MULTIMEDIA_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.error("Error al eliminar multimedia:", errorText);
        throw new Error("Error al eliminar multimedia");
    }
    return true;
}

// Cambiar estado de multimedia (activo/inactivo)
export async function toggleMultimediaStatus(id) {
    const res = await fetch(`${MULTIMEDIA_URL}/${id}/active/toggle`, {
        method: "PATCH",
    });
    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.error("Error al cambiar el estado de multimedia:", errorText);
        throw new Error("Error al cambiar el estado de multimedia");
    }
    return res.json();
}

// Cambiar estado de multimedia (destacado/no destacado)
export async function toggleMultimediaFeatured(id) {
    const res = await fetch(`${MULTIMEDIA_URL}/${id}/featured/toggle`, {
        method: "PATCH",
    });
    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.error("Error al cambiar el estado de destacado de multimedia:", errorText);
        throw new Error("Error al cambiar el estado de destacado de multimedia");
    }
    return res.json();
}

// ======== endpoint ya no utilizados (pruebas) ========
// Obtener imágenes
export async function getBannerImages() {
    const res = await fetch(`${MULTIMEDIA_URL}/banner/image`);
    if (!res.ok) throw new Error("Error al obtener imágenes");
    return res.json();
}

// Obtener videos
export async function getBannerVideos() {
    const res = await fetch(`${MULTIMEDIA_URL}/banner/video`);
    if (!res.ok) throw new Error("Error al obtener videos");
    return res.json();
}