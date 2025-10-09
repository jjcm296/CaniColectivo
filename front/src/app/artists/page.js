import { Suspense } from "react";
import ArtistsHeader from "@/features/artists/components/ArtistsHeader";
import ArtistsFilters from "@/features/artists/components/ArtistsFilters";

export default function ArtistsPage() {
  return (
    <main style={{ padding: "24px" }}>
      <Suspense fallback={<div>Cargando encabezado...</div>}>
        <ArtistsHeader />
      </Suspense>
      <Suspense fallback={<div>Cargando filtros...</div>}>
        <ArtistsFilters />
      </Suspense>
    </main>
  );
}
