import {
    dbGetAllArtists,
    dbGetArtistBySlug,
} from "@/features/fakeDb/fakeDb";

export async function getArtists() {
    return dbGetAllArtists();
}

export async function getArtistBySlug(slug) {
    return dbGetArtistBySlug(slug);
}
