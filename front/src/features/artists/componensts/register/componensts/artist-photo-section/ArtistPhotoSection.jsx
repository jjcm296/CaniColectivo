import styles from "../../ArtistRegisterPageClient.module.css";

export default function ArtistPhotoSection({ name, photoPreview, onPhotoChange }) {
    return (
        <div className={styles.photoRow}>
            <div className={styles.photoAvatar}>
                {photoPreview ? (
                    <img src={photoPreview} alt="Foto de perfil" />
                ) : (
                    <span className={styles.photoInitial}>
                        {name.trim() ? name.trim()[0].toUpperCase() : "?"}
                    </span>
                )}
            </div>
            <div className={styles.photoControls}>
                <label className={styles.label}>Foto de perfil</label>
                <label className={styles.photoUploadButton}>
                    Elegir imagen
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onPhotoChange}
                        hidden
                    />
                </label>
            </div>
        </div>
    );
}
