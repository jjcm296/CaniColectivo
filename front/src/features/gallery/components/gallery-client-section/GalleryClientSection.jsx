"use client";

import { useMemo, useState } from "react";
import { useGalleryMedia } from "@/features/gallery/hooks/useGalleryMedia";
import GalleryImagesSection from "../gallery-images-section/GalleryImagesSection";
import GalleryAddImageModal from "../gallery-upload-image-modal/GalleryUploadImageModal";

export function GalleryClientSection({ isAdmin }) {
    const {
        items,
        removeItem,
        toggleStatus,
        toggleFeatured,
        createImage,
        showActive,
        showFeatured,
        showInactive,
    } = useGalleryMedia();

    const [view, setView] = useState("active");
    const [showAddModal, setShowAddModal] = useState(false);

    function handleChangeView(newView) {
        setView(newView);

        if (newView === "active") {
            showActive();
        } else if (newView === "featured") {
            showFeatured();
        } else if (newView === "hidden") {
            showInactive();
        }
    }

    async function handleToggle(id) {
        try {
            await toggleStatus(id);
        } catch (err) {
            console.error(err);
            alert("No se pudo cambiar el estado. Intenta de nuevo.");
        }
    }

    async function handleToggleFeatured(id) {
        try {
            await toggleFeatured(id);
        } catch (err) {
            console.error(err);
            alert("No se pudo cambiar el destacado. Intenta de nuevo.");
        }
    }

    async function handleRemove(id) {
        const ok = window.confirm("¿Eliminar este elemento?");
        if (!ok) return;

        try {
            await removeItem(id);
        } catch (err) {
            console.error(err);
            alert("No se pudo eliminar la imagen. Intenta de nuevo.");
        }
    }

    function handleAddImageClick() {
        setShowAddModal(true);
    }

    async function handleUpload(file) {
        return createImage(file);
    }

    function handleImageUploaded() {
        setShowAddModal(false);
    }

    const filteredItems = useMemo(() => {
        if (!isAdmin) {
            return items.filter((item) => item.isActive ?? true);
        }

        switch (view) {
            case "featured":
                return items.filter((item) => item.isFeatured);
            case "hidden":
                return items.filter((item) => !item.isActive);
            case "active":
            default:
                return items.filter((item) => item.isActive ?? true);
        }
    }, [items, isAdmin, view]);

    return (
        <>
            <GalleryImagesSection
                isAdmin={isAdmin}
                items={filteredItems}
                view={view}
                onChangeView={handleChangeView}
                onToggleActive={handleToggle}
                onToggleFeatured={handleToggleFeatured}
                onRemove={handleRemove}
                onAddImage={isAdmin ? handleAddImageClick : undefined}
            />

            {isAdmin && (
                <GalleryAddImageModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onUpload={handleUpload}
                    onSuccess={handleImageUploaded}
                />
            )}
        </>
    );
}