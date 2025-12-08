import { notFound } from "next/navigation";
import { getArtistBySlug } from "@/features/artists/services/artistsService";
import ArtistProfile from "@/features/artists/componensts/artist-profile/ArtistProfile";

export default async function Page({ params }) {
    const { slug } = params;

    const artist = await getArtistBySlug(slug);

    if (!artist) {
        return notFound();
    }

    return (
        <main className="page-container">
            <ArtistProfile artist={artist} />
        </main>
    );
}
