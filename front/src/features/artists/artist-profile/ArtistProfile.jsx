import styles from "./ArtistProfile.module.css";
import ArtistProfileHeader
    from "@/features/artists/artist-profile/components/artist-profile-header/ArtistProfileHeader";
import ArtistProfileContact
    from "@/features/artists/artist-profile/components/artist-profile-contact/ArtistProfileContact";
import ArtistProfileDetails
    from "@/features/artists/artist-profile/components/artist-profile-details/ArtistProfileDetails";

export default function ArtistProfile({ artist }) {
    if (!artist) return null;

    const { bio } = artist;

    const displayBio =
        bio ||
        "Próximamente agregaremos una descripción más detallada sobre este perfil artístico y sus proyectos.";

    return (
        <section className={styles.profile}>
            <ArtistProfileHeader artist={artist} />

            <p className={styles.bio}>{displayBio}</p>

            <div className={styles.grid}>
                <ArtistProfileContact artist={artist} />
                <ArtistProfileDetails artist={artist} />
            </div>
        </section>
    );
}
