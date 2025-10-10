import { Suspense } from "react";
import ArtistsHeader from "@/features/artists/components/ArtistsHeader";

export default function ArtistsPage() {
    return (
        <main style={{ padding: "24px" }}>
            <Suspense fallback={<div>Cargando encabezado...</div>}>
                <ArtistsHeader />
            </Suspense>
        </main>
    );
}
