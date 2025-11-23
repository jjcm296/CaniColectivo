import GalleryTabs from "../gallery-tabs/GalleryTabs";
import GalleryImageCard from "../gallery-image-card/GalleryImageCard";
import styles from "./GalleryImagesSection.module.css";

export default function GalleryImagesSection({
                                                 isAdmin,
                                                 items,
                                                 view,
                                                 onChangeView,
                                                 onToggleActive,
                                                 onToggleFeatured,
                                                 onRemove,
                                             }) {
    const images = items.filter((item) => item.type === "image" || !item.type);

    return (
        <section className={styles.block}>
            <header className={styles.header}>
                <p className={styles.kicker}>Imágenes</p>
                <h2 className={styles.title}>Galería de imágenes</h2>
                <p className={styles.subtitle}>
                    Fotografías, carteles y momentos capturados en eventos y procesos de CANI.
                </p>

                {isAdmin && (
                    <GalleryTabs
                        isAdmin={isAdmin}
                        view={view}
                        onChange={onChangeView}
                    />
                )}
            </header>

            <div className={styles.grid}>
                {images.map((item) => (
                    <GalleryImageCard
                        key={item.id}
                        item={item}
                        isAdmin={isAdmin}
                        onToggleFeatured={onToggleFeatured}
                        onToggleActive={onToggleActive}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </section>
    );
}
