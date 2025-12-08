import { Suspense } from "react";
import ContentHeader from "@/features/ui/content-header/ContentHeader";
import ArtistsGrid from "@/features/artists/componensts/artists-grid/ArtistsGrid";
import { getArtists } from "@/features/artists/services/artistsService";


export default async function ArtistsPage() {
    const artists = await getArtists();
    return (
        <main style={{ padding: "24px" }}>
            <Suspense fallback={<div>Cargando encabezado...</div>}>
                <ContentHeader scope={"artists"}/>
                <ArtistsGrid artists={artists}/>
            </Suspense>
        </main>
    );
}
