import ContentHeader from "@/features/ui/content-header/ContentHeader";
import ArtistsGrid from "@/features/artists/componensts/artists-grid/ArtistsGrid";

export default function ArtistsPage() {
    return (
        <main style={{ padding: "24px" }}>
            <ContentHeader scope="artists" />
            <ArtistsGrid />
        </main>
    );
}
