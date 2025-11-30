import {BASE_API} from "@/config/apiConfig";

const MULTIMEDIA_URL = `${BASE_API}/multimedia`;

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

// Subir imagen de banner (archivo)
export async function uploadBannerImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${MULTIMEDIA_URL}/banner/image`, {
        method: "POST",
        body: formData,
    });

    // Verifica si la respuesta no es exitosa
    if (!res.ok) {
        // Extrae el texto del error para diagnóstico
        const errorText = await res.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Error al subir la imagen: ${errorText}`);
    }

    // Si la respuesta es exitosa, retorna el JSON de la respuesta
    return res.json();
}


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
