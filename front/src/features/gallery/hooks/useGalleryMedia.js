"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getAllActiveBannerImages,
    getAllFeaturesBannerImages,
    getAllInactiveBannerImages,
    deleteMultimedia,
    toggleMultimediaFeatured,
    toggleMultimediaStatus,
    uploadBannerImage,
} from "../api/multimediaApi";

import { API_URL } from "@/config/apiConfig";

export function mapMultimediaDtoToGalleryItem(dto) {
    const rawUrl = dto.url || "";
    const finalUrl = rawUrl.startsWith("http") ? rawUrl : `${API_URL}${rawUrl}`;

    return {
        id: dto.id,
        type: dto.mediaType === "IMAGE" ? "image" : "video",
        url: finalUrl,
        isActive: dto.activo ?? true,
        isFeatured: dto.isFeatured ?? false,
        scope: dto.scope ?? null,
        createdAt: dto.createdAt ?? null,
    };
}

/**
 * filter: "active" | "featured" | "inactive"
 */
export function useGalleryMedia() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("active");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMedia = useCallback(async (targetFilter) => {
        const finalFilter = targetFilter ?? "active";

        try {
            setLoading(true);
            setError(null);
            setItems([]);

            let imagesPromise;

            switch (finalFilter) {
                case "active":
                    imagesPromise = getAllActiveBannerImages();
                    break;
                case "featured":
                    imagesPromise = getAllFeaturesBannerImages();
                    break;
                case "inactive":
                    imagesPromise = getAllInactiveBannerImages();
                    break;
                default:
                    imagesPromise = getAllActiveBannerImages();
                    break;
            }

            const imagesDto = await imagesPromise;

            let mapped = imagesDto.map(mapMultimediaDtoToGalleryItem);

            if (finalFilter === "active") {
                mapped = mapped.filter((m) => m.isActive);
            } else if (finalFilter === "inactive") {
                mapped = mapped.filter((m) => !m.isActive);
            } else if (finalFilter === "featured") {
                mapped = mapped.filter((m) => m.isFeatured);
            }

            mapped.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setItems(mapped);
            setFilter(finalFilter);
        } catch (err) {
            console.error("useGalleryMedia -> error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMedia("active");
    }, [loadMedia]);

    const addItem = useCallback((newItem) => {
        setItems((prev) => [newItem, ...prev]);
    }, []);

    const updateItem = useCallback((updatedItem) => {
        setItems((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    }, []);

    const removeItem = useCallback(async (id) => {
        try {
            await deleteMultimedia(id);
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error al eliminar multimedia:", err);
            throw err;
        }
    }, []);

    const toggleStatus = useCallback(
        async (id) => {
            try {
                const updatedDto = await toggleMultimediaStatus(id);
                const updatedItem = mapMultimediaDtoToGalleryItem(updatedDto);
                updateItem(updatedItem);
                return updatedItem;
            } catch (err) {
                console.error("Error al cambiar estado activo/inactivo:", err);
                throw err;
            }
        },
        [updateItem]
    );

    const toggleFeatured = useCallback(
        async (id) => {
            try {
                const updatedDto = await toggleMultimediaFeatured(id);
                const updatedItem = mapMultimediaDtoToGalleryItem(updatedDto);
                updateItem(updatedItem);
                return updatedItem;
            } catch (err) {
                console.error("Error al cambiar estado destacado:", err);
                throw err;
            }
        },
        [updateItem]
    );

    const createImage = useCallback(
        async (file) => {
            try {
                const dto = await uploadBannerImage(file);
                const newItem = mapMultimediaDtoToGalleryItem(dto);
                addItem(newItem);
                return newItem;
            } catch (err) {
                console.error("Error al crear imagen de banner:", err);
                throw err;
            }
        },
        [addItem]
    );

    const showActive = () => loadMedia("active");
    const showFeatured = () => loadMedia("featured");
    const showInactive = () => loadMedia("inactive");

    return {
        items,
        loading,
        error,
        filter,
        reload: () => loadMedia(filter),
        addItem,
        updateItem,
        removeItem,
        toggleStatus,
        toggleFeatured,
        createImage,
        showActive,
        showFeatured,
        showInactive,
    };
}
