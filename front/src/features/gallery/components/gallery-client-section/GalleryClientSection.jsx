"use client";

import { useMemo, useState } from "react";
import { useGalleryMedia } from "@/features/gallery/hooks/useGalleryMedia";
import GalleryImagesSection from "../gallery-images-section/GalleryImagesSection";
import GalleryAddImageModal from "../gallery-upload-image-modal/GalleryUploadImageModal";

import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";
import ConfirmModal from "@/features/ui/confirm-modal/ConfirmModal";

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
        loading, // estado de carga desde el hook
    } = useGalleryMedia();

    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const [view, setView] = useState("active");
    const [showAddModal, setShowAddModal] = useState(false);

    // IDs de imágenes recién ocultadas en la vista "active"
    const [recentlyHiddenIds, setRecentlyHiddenIds] = useState([]);

    // Estado para eliminar
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    function handleChangeView(newView) {
        setView(newView);

        // si cambiamos de vista, limpiamos la lista de "recién ocultadas"
        if (newView !== "active") {
            setRecentlyHiddenIds([]);
        }

        if (newView === "active") {
            showActive();
        } else if (newView === "featured") {
            showFeatured();
        } else if (newView === "hidden") {
            showInactive();
        }
    }

    // Ocultar / mostrar
    async function handleToggle(id) {
        // vemos el estado previo antes de hacer la llamada
        const current = items.find((item) => item.id === id);
        const wasActive = current ? (current.isActive ?? true) : true;

        try {
            await toggleStatus(id);

            // Si estaba activa, estamos en la vista principal y es admin,
            // la agregamos a la lista de "recién ocultadas" para que
            // siga apareciendo oscura hasta que recargues.
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

    // Destacado (igual que antes)
    async function handleToggleFeatured(id) {
        try {
            await toggleFeatured(id);
        } catch (err) {
            console.error(err);
            alert("No se pudo cambiar el destacado. Intenta de nuevo.");
        }
    }

    // 🗑Paso 1: abrir modal de confirmación de eliminación
    function handleRemove(id) {
        setDeleteTargetId(id);
    }

    // Cerrar modal de confirmación
    function handleCloseDeleteModal() {
        if (deleting) return;
        setDeleteTargetId(null);
    }

    // Paso 2: confirmar eliminación
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

    // Subir imagen con feedback global
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
        // Público: solo ve activas
        if (!isAdmin) {
            return items.filter((item) => item.isActive ?? true);
        }

        // Admin
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
                isLoading={loading} // se pasa estado de carga a la sección
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

            {/* Modal global de confirmación de eliminación */}
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
