import { Suspense } from "react";
import ArtistsHeader from "@/features/artists/artists-header/ArtistsHeader";
import ArtistsGrid from "@/features/artists/artists-grid/ArtistsGrid";
import { getArtists } from "@/features/artists/services/artistsService";


export default async function ArtistsPage() {
    const artists = await getArtists();
    return (
        <main style={{ padding: "24px" }}>
            <Suspense fallback={<div>Cargando encabezado...</div>}>
                <ArtistsHeader />
                <ArtistsGrid artists={artists}/>
            </Suspense>
        </main>
    );
}
