"use client";

import { useMemo, useState } from "react";
import {
    useGalleryMedia,
    mapMultimediaDtoToGalleryItem,
} from "@/features/gallery/hooks/useGalleryMedia";
import GalleryImagesSection from "../gallery-images-section/GalleryImagesSection";
import GalleryAddImageModal from "../gallery-upload-image-modal/GalleryUploadImageModal";
import { uploadBannerImage } from "@/features/gallery/api/multimediaApi";

export default function GalleryClientSection({ isAdmin }) {
    const {
        items,
        loading,
        error,
        updateItem,
        removeItem,
        addItem,
        reload,
    } = useGalleryMedia();

    const [view, setView] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);

    function handleToggle(id) {
        const current = items.find((item) => item.id === id);
        if (!current) return;

        updateItem({
            ...current,
            isActive: !(current.isActive ?? true),
        });
    }

    function handleToggleFeatured(id) {
        const current = items.find((item) => item.id === id);
        if (!current) return;

        updateItem({
            ...current,
            isFeatured: !current.isFeatured,
        });
    }

    function handleRemove(id) {
        const ok = window.confirm("¿Eliminar este elemento?");
        if (!ok) return;
        removeItem(id);
    }

    function handleAddImageClick() {
        setShowAddModal(true);
    }

    async function handleUpload(file) {
        return uploadBannerImage(file);
    }

    function handleImageUploaded(createdDto) {
        if (createdDto) {
            const mapped = mapMultimediaDtoToGalleryItem(createdDto);
            addItem(mapped);
        } else {
            reload();
        }

        setShowAddModal(false);
    }

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const active = item.isActive ?? true;
            const featured = item.isFeatured ?? false;

            if (!isAdmin && !active) return false;

            if (view === "featured") {
                return featured && (isAdmin ? true : active);
            }

            if (view === "hidden") {
                if (!isAdmin) return false;
                return !active;
            }

            if (isAdmin) return true;
            return active;
        });
    }, [items, view, isAdmin]);

    const hasItems = filteredItems.length > 0;

    return (
        <>
            <GalleryImagesSection
                isAdmin={isAdmin}
                items={filteredItems}
                view={view}
                onChangeView={setView}
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