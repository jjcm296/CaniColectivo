import Image from "next/image";
import styles from "./PendingArtistsDropdown.module.css";

export default function PendingArtistsDropdown({
                                                   open,
                                                   count,
                                                   pending,
                                                   loadingList,
                                                   loadingActionId,
                                                   error,
                                                   onApprove,
                                                   onReject,
                                                   onOpenArtist,
                                               }) {
    if (!open) return null;

    const hasItems = pending.length > 0;

    return (
        <div className={styles.dropdown}>
            <div className={styles.header}>
                <div className={styles.headerMain}>
                    <h4 className={styles.title}>Perfiles pendientes</h4>
                </div>

                {count > 0 && (
                    <span className={styles.countLabel}>
                        {count} por revisar
                    </span>
                )}
            </div>

            {error && <p className={styles.errorText}>{error}</p>}

            {loadingList && !error && (
                <div className={styles.empty}>Cargando perfiles...</div>
            )}

            {!loadingList && !error && !hasItems && (
                <div className={styles.empty}>
                    No hay perfiles pendientes ahora mismo.
                </div>
            )}

            {!loadingList && !error && hasItems && (
                <ul className={styles.list}>
                    {pending.map((artist) => {
                        const hasPhoto = Boolean(artist.photoUrl);
                        const initial =
                            artist.name?.charAt(0)?.toUpperCase() ?? "?";

                        const isRowLoading = loadingActionId === artist.id;

                        const handleRowClick = (event) => {
                            // si el click fue en un botón, no navegamos
                            if (event.target.closest("button")) return;
                            if (onOpenArtist) onOpenArtist(artist);
                        };

                        return (
                            <li
                                key={artist.id}
                                className={styles.item}
                                onClick={handleRowClick}
                            >
                                <div className={styles.itemMain}>
                                    <div className={styles.avatarWrapper}>
                                        {hasPhoto ? (
                                            <Image
                                                src={artist.photoUrl}
                                                alt={artist.name}
                                                width={40}
                                                height={40}
                                                className={styles.avatar}
                                            />
                                        ) : (
                                            <div
                                                className={
                                                    styles.avatarFallback
                                                }
                                                aria-hidden="true"
                                            >
                                                {initial}
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.textBlock}>
                                        <span className={styles.name}>
                                            {artist.name}
                                        </span>
                                        <div className={styles.metaRow}>
                                            {artist.location && (
                                                <span
                                                    className={
                                                        styles.locationTag
                                                    }
                                                >
                                                    {artist.location}
                                                </span>
                                            )}
                                            <span className={styles.statusText}>
                                                En espera de revisión
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        type="button"
                                        className={`${styles.smallBtn} ${styles.reject}`}
                                        disabled={isRowLoading}
                                        onClick={() => onReject(artist.id)}
                                    >
                                        {isRowLoading ? "..." : "Rechazar"}
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.smallBtn} ${styles.approve}`}
                                        disabled={isRowLoading}
                                        onClick={() => onApprove(artist.id)}
                                    >
                                        {isRowLoading ? "..." : "Aceptar"}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
