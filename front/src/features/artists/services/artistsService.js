// src/features/artists/services/artistsService.js
import {
    dbGetAllArtists,
    dbGetArtistById,
} from "@/features/fakeDb/fakeDb";

export async function getArtists() {
    return dbGetAllArtists();
}

export async function getArtistById(id) {
    return dbGetArtistById(id);
}
