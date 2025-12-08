// app/profile/me/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ArtistProfile from "@/features/artists/componensts/artist-profile/ArtistProfile";
import { useMyArtistProfile } from "@/features/artists/hooks/useMyArtistProfile";

export default function MyProfilePage() {
    const router = useRouter();
    const { artist, isLoading, error } = useMyArtistProfile();

    // Si ya cargó y no hay artista, mandamos a /artists
    useEffect(() => {
        if (!isLoading && !artist && !error) {
            router.push("/artists");
        }
    }, [isLoading, artist, error, router]);

    if (isLoading) {
        return (
            <main className="page-container">
                <p>Cargando tu perfil...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <p>{error}</p>
            </main>
        );
    }

    if (!artist) {
        return null;
    }

    return (
        <main className="page-container">
            <ArtistProfile artist={artist} isOwner={true} />
        </main>
    );
}
