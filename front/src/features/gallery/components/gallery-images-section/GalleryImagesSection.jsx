"use client";

import GalleryTabs from "../gallery-tabs/GalleryTabs";
import GalleryImageCard from "../gallery-image-card/GalleryImageCard";
import GalleryAddImageCard from "../gallery-addImage-card/GalleryAddImageCard";
import styles from "./GalleryImagesSection.module.css";

export default function GalleryImagesSection({
                                                 isAdmin,
                                                 items,
                                                 view,
                                                 isLoading,
                                                 onChangeView,
                                                 onToggleActive,
                                                 onToggleFeatured,
                                                 onRemove,
                                                 onAddImage,
                                             }) {
    const images = items.filter(
        (item) => item.type === "image" || !item.type
    );

    const noImages = !isLoading && images.length === 0;
    // Ahora mostramos la tarjeta de "Agregar" en la vista ACTIVA
    const showAddCard = isAdmin && onAddImage && view === "active";

    // Mensajes personalizados según el apartado
    let emptyTitle = "Tu galería todavía no tiene imágenes";
    let emptyBody = "Usa el botón “Agregar foto” para subir la primera imagen.";

    if (view === "featured") {
        emptyTitle = "No hay imágenes destacadas";
        emptyBody =
            "Puedes marcar una imagen como destacada desde el menú de opciones de cada tarjeta.";
    } else if (view === "hidden") {
        emptyTitle = "No hay imágenes ocultas";
        emptyBody =
            "Cuando ocultes una imagen desde el menú de la tarjeta, aparecerá aquí.";
    }

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

            {isLoading ? (
                // Skeletons mientras se carga la llamada a la API
                <div className={styles.grid}>
                    {showAddCard && <GalleryAddImageCard onClick={onAddImage} />}

                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className={styles.skeletonCard}>
                            <div className={styles.skeletonMedia} />
                        </div>
                    ))}
                </div>
            ) : noImages ? (
                <div className={styles.emptyWrapper}>
                    {showAddCard && (
                        <GalleryAddImageCard onClick={onAddImage} />
                    )}

                    <div className={styles.emptyMessage}>
                        <h3>{emptyTitle}</h3>
                        <p>{emptyBody}</p>
                    </div>
                </div>
            ) : (
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
