import { Suspense } from "react";
import ContentHeader from "@/features/ui/content-header/ContentHeader";
import ArtistsGrid from "@/features/artists/componensts/artists-grid/ArtistsGrid";

export default function ArtistsPage() {
    return (
        <main style={{ padding: "24px" }}>
            <Suspense fallback={<p>Cargando filtros...</p>}>
                <ContentHeader scope="artists" />
            </Suspense>

            <ArtistsGrid />
        </main>
    );
}
