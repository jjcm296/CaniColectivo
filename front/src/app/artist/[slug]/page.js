import { Suspense } from "react";
import ArtistPublicPageClient from "@/app/artist/ArtistPublicPageClient";

export default function ArtistPublicPage() {
    return (
        <Suspense
            fallback={
                <main className="page-container">
                    <p>Cargando artista...</p>
                </main>
            }
        >
            <ArtistPublicPageClient />
        </Suspense>
    );
}
