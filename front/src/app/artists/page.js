import ArtistsHeader from "@/features/artists/components/ArtistsHeader";
import ArtistsFilters from "@/features/artists/components/ArtistsFilters";

export default function ArtistsPage() {
    return (
        <main style={{ padding: "24px" }}>
            <ArtistsHeader />
            <ArtistsFilters/>
        </main>
    );
}
