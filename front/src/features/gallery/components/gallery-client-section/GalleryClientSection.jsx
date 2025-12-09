"use client";

import { useMemo, useState } from "react";
import { useGalleryMedia } from "@/features/gallery/hooks/useGalleryMedia";
import GalleryImagesSection from "../gallery-images-section/GalleryImagesSection";
import GalleryAddImageModal from "../gallery-upload-image-modal/GalleryUploadImageModal";

import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";
import ConfirmModal from "@/features/ui/confirm-modal/ConfirmModal";
import { useCurrentUser } from "@/features/artists/hooks/useCurrentUser";

export function GalleryClientSection() {
    const {
        items,
        removeItem,
        toggleStatus,
        toggleFeatured,
        createImage,
        showActive,
        showFeatured,
        showInactive,
        loading,
    } = useGalleryMedia();

    const { user: currentUser } = useCurrentUser();

    const roleNames = Array.isArray(currentUser?.roles)
        ? currentUser.roles.map((r) => r.name)
        : currentUser?.roles?.name
            ? [currentUser.roles.name]
            : [];

    const isAdmin =
        roleNames.includes("admin") || roleNames.includes("ROLE_ADMIN");

    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const [view, setView] = useState("active");
    const [showAddModal, setShowAddModal] = useState(false);
    const [recentlyHiddenIds, setRecentlyHiddenIds] = useState([]);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    function handleChangeView(newView) {
        setView(newView);

        if (newView !== "active") {
            setRecentlyHiddenIds([]);
        }

        if (newView === "active") showActive();
        else if (newView === "featured") showFeatured();
        else if (newView === "hidden") showInactive();
    }

    async function handleToggle(id) {
        const current = items.find((item) => item.id === id);
        const wasActive = current ? (current.isActive ?? true) : true;

        try {
            await toggleStatus(id);

            if (wasActive && view === "active" && isAdmin) {
                setRecentlyHiddenIds((prev) =>
                    prev.includes(id) ? prev : [...prev, id]
                );
            }
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

    function handleRemove(id) {
        setDeleteTargetId(id);
    }

    function handleCloseDeleteModal() {
        if (deleting) return;
        setDeleteTargetId(null);
    }

    async function handleConfirmDelete() {
        if (!deleteTargetId) return;

        try {
            setDeleting(true);
            showLoading("Eliminando imagen...");

            await removeItem(deleteTargetId);

            hide();
            showSuccess("Imagen eliminada correctamente.");
            setDeleteTargetId(null);
        } catch (err) {
            console.error(err);
            hide();
            showError("No se pudo eliminar la imagen. Intenta de nuevo.");
        } finally {
            setDeleting(false);
        }
    }

    function handleAddImageClick() {
        setShowAddModal(true);
    }

    async function handleUpload(file) {
        try {
            showLoading("Subiendo imagen...");
            const created = await createImage(file);
            hide();
            showSuccess("Imagen subida correctamente.");
            return created;
        } catch (err) {
            console.error(err);
            hide();
            showError("No se pudo subir la imagen. Intenta de nuevo.");
            throw err;
        }
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
                return items.filter(
                    (item) =>
                        (item.isActive ?? true) ||
                        recentlyHiddenIds.includes(item.id)
                );
        }
    }, [items, isAdmin, view, recentlyHiddenIds]);

    return (
        <>
            <GalleryImagesSection
                isAdmin={isAdmin}
                items={filteredItems}
                view={view}
                isLoading={loading}
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

            <ConfirmModal
                open={Boolean(deleteTargetId)}
                variant="danger"
                title="Eliminar imagen"
                description="¿Seguro que quieres eliminar esta imagen de la galería? Esta acción no se puede deshacer."
                cancelLabel="Cancelar"
                confirmLabel={deleting ? "Eliminando..." : "Eliminar definitivamente"}
                loading={deleting}
                onCancel={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
