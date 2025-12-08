import {
    dbGetAllArtists,
    dbGetArtistBySlug,
    dbGetArtistById,
    dbGetCurrentUser,
} from "@/features/fakeDb/fakeDb";

export async function getArtists() {
    return dbGetAllArtists();
}

export async function getArtistBySlug(slug) {
    return dbGetArtistBySlug(slug);
}

// 🔹 helper opcional para otros usos
export async function getCurrentUser() {
    return dbGetCurrentUser();
}

// usar users + artists
export async function getMyArtistProfile() {
    const user = dbGetCurrentUser();

    if (!user || !user.artistId) {
        return null;
    }

    const artist = dbGetArtistById(user.artistId);
    return artist || null;
}
