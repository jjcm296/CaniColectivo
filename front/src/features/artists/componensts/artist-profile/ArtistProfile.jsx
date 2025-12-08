import styles from "./ArtistProfile.module.css";
import ArtistProfileHeader
    from "@/features/artists/componensts/artist-profile/components/artist-profile-header/ArtistProfileHeader";
import ArtistProfileContact
    from "@/features/artists/componensts/artist-profile/components/artist-profile-contact/ArtistProfileContact";
import ArtistProfileDetails
    from "@/features/artists/componensts/artist-profile/components/artist-profile-details/ArtistProfileDetails";

export default function ArtistProfile({ artist, isOwner = false }) {
    if (!artist) return null;

    const { bio, description } = artist || {};

    const displayBio =
        (bio && bio.trim().length > 0 && bio) ||
        (description && description.trim().length > 0 && description) ||
        "Próximamente agregaremos una descripción más detallada sobre este perfil artístico y sus proyectos.";

    return (
        <section className={styles.profile}>
            <ArtistProfileHeader artist={artist} />

            <p className={styles.bio}>{displayBio}</p>

            <div className={styles.grid}>
                <ArtistProfileContact artist={artist} />
                <ArtistProfileDetails artist={artist} isOwner={isOwner} />
            </div>
        </section>
    );
}
