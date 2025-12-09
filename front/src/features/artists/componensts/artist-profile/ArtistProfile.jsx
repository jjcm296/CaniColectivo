
import styles from "./ArtistProfile.module.css";
import ArtistProfileHeader
    from "@/features/artists/componensts/artist-profile/components/artist-profile-header/ArtistProfileHeader";
import ArtistProfileContact
    from "@/features/artists/componensts/artist-profile/components/artist-profile-contact/ArtistProfileContact";
import ArtistProfileDetails
    from "@/features/artists/componensts/artist-profile/components/artist-profile-details/ArtistProfileDetails";

export default function ArtistProfile({
                                          artist,
                                          isOwner = false,
                                          showModeration = false,
                                          onApprove,
                                          onReject,
                                          moderationLoading = false,
                                          moderationMessage = "",
                                          moderationError = "",
                                      }) {
    if (!artist) return null;

    const { bio, description } = artist || {};

    const displayBio =
        (bio && bio.trim().length > 0 && bio) ||
        (description && description.trim().length > 0 && description) ||
        "Próximamente agregaremos una descripción más detallada sobre este perfil artístico y sus proyectos.";

    const showModerationBar =
        showModeration &&
        (typeof onApprove === "function" || typeof onReject === "function");

    return (
        <section className={styles.profile}>
            <ArtistProfileHeader artist={artist} />

            <p className={styles.bio}>{displayBio}</p>

            <div className={styles.grid}>
                <ArtistProfileContact artist={artist} />
                <ArtistProfileDetails artist={artist} isOwner={isOwner} />
            </div>

            {showModerationBar && (
                <div className={styles.moderationBar}>
                    <div className={styles.moderationHeader}>
                        <p className={styles.moderationTitle}>
                            Moderar este perfil
                        </p>
                        <p className={styles.moderationHint}>
                            Revisa la información del perfil y decide si
                            aprobarlo o rechazarlo.
                        </p>
                    </div>

                    <div className={styles.moderationButtons}>
                        {onReject && (
                            <button
                                type="button"
                                onClick={onReject}
                                disabled={moderationLoading}
                                className={`${styles.moderationBtn} ${styles.moderationReject}`}
                            >
                                {moderationLoading ? "Procesando..." : "Rechazar"}
                            </button>
                        )}

                        {onApprove && (
                            <button
                                type="button"
                                onClick={onApprove}
                                disabled={moderationLoading}
                                className={`${styles.moderationBtn} ${styles.moderationApprove}`}
                            >
                                {moderationLoading ? "Procesando..." : "Aceptar"}
                            </button>
                        )}
                    </div>

                    {moderationError && (
                        <p className={styles.moderationError}>
                            {moderationError}
                        </p>
                    )}

                    {moderationMessage && !moderationError && (
                        <p className={styles.moderationMessage}>
                            {moderationMessage}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
