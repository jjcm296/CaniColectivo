"use client";

import GalleryTabs from "../gallery-tabs/GalleryTabs";
import GalleryImageCard from "../gallery-image-card/GalleryImageCard";
import GalleryAddImageCard from "../gallery-addImage-card/GalleryAddImageCard";
import styles from "./GalleryImagesSection.module.css";

export default function GalleryImagesSection({
                                                 isAdmin,
                                                 items,
                                                 view,
                                                 onChangeView,
                                                 onToggleActive,
                                                 onToggleFeatured,
                                                 onRemove,
                                                 onAddImage,
                                             }) {
    const images = items.filter(
        (item) => item.type === "image" || !item.type
    );

    const noImages = images.length === 0;
    const showAddCard = isAdmin && onAddImage && view === "all";

    return (
        <section className={styles.block}>
            <header className={styles.header}>
                <p className={styles.kicker}>Imágenes</p>
                <h2 className={styles.title}>Galería de imágenes</h2>
                <p className={styles.subtitle}>
                    Fotografías, carteles y momentos capturados en eventos y procesos
                    de CANI.
                </p>

                {isAdmin && (
                    <GalleryTabs
                        isAdmin={isAdmin}
                        view={view}
                        onChange={onChangeView}
                    />
                )}
            </header>

            {/* Si NO hay imágenes → mensaje ancho completo */}
            {noImages ? (
                <div className={styles.emptyWrapper}>
                    {showAddCard && (
                        <GalleryAddImageCard onClick={onAddImage} />
                    )}

                    <div className={styles.emptyMessage}>
                        <h3>Tu galería todavía no tiene imágenes</h3>
                        <p>
                            Usa el botón <strong>“Agregar foto”</strong> para subir la primera imagen.
                        </p>
                    </div>
                </div>
            ) : (
                /* Si HAY imágenes → grid normal */
                <div className={styles.grid}>
                    {showAddCard && <GalleryAddImageCard onClick={onAddImage} />}

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
            )}
        </section>
    );
}
