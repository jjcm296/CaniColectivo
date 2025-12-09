import { getArtistById } from "@/features/artists/api/artistApi";

function mapArtist(apiArtist) {
    if (!apiArtist) return null;

    return {
        ...apiArtist,
        city: apiArtist.location,
        social: apiArtist.socialMedia || {},
        tags: Array.isArray(apiArtist.specialities)
            ? apiArtist.specialities.map((s) => s.name).filter(Boolean)
            : [],
    };
}

export async function getArtistBySlug(slug) {
    if (!slug) {
        console.error("getArtistBySlug: slug vacío");
        return null;
    }

    const parts = String(slug).split("-");
    const idPart = parts[parts.length - 1];
    const id = Number(idPart);

    console.log("getArtistBySlug → slug:", slug, "id extraído:", id);

    if (Number.isNaN(id)) {
        console.error("getArtistBySlug: no se pudo extraer ID del slug:", slug);
        return null;
    }

    const result = await getArtistById(id);

    if (!result.ok) {
        console.error("getArtistBySlug: error al obtener artista por id:", result.error);
        return null;
    }

    return mapArtist(result.data);
}
