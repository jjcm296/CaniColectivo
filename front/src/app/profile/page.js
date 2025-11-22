import { redirect } from "next/navigation";
import ArtistProfile from "@/features/artists/artist-profile/ArtistProfile";
import { getMyArtistProfile } from "@/features/artists/services/artistsService";

export default async function Page() {
    const artist = await getMyArtistProfile();

    if (!artist) {
        redirect("/artists");
    }

    return (
        <main className="page-container">
            <ArtistProfile artist={artist} isOwner={true} />
        </main>
    );
}
