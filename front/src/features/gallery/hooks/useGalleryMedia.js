"use client";

import { useEffect, useState, useCallback } from "react";
import { getBannerImages, getBannerVideos } from "../api/multimediaApi";

// Normaliza el DTO del backend al formato interno
function mapMultimediaDtoToGalleryItem(dto) {
    return {
        id: dto.id,
        type: dto.mediaType === "IMAGE" ? "image" : "video",
        url: dto.url,
        isActive: dto.active ?? true,
        isFeatured: dto.featured ?? false,
        scope: dto.scope ?? null,
        createdAt: dto.createdAt ?? null,
    };
}

export function useGalleryMedia() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga multimedia desde el backend
    const loadMedia = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [imagesDto, videosDto] = await Promise.all([
                getBannerImages(),
                getBannerVideos(),
            ]);

            const mapped = [
                ...imagesDto.map(mapMultimediaDtoToGalleryItem),
                ...videosDto.map(mapMultimediaDtoToGalleryItem),
            ];

            mapped.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setItems(mapped);
        } catch (err) {
            console.error("useGalleryMedia -> error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    const addItem = useCallback((newItem) => {
        setItems((prev) => [newItem, ...prev]);
    }, []);

    const updateItem = useCallback((updatedItem) => {
        setItems((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    }, []);

    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    return {
        items,
        loading,
        error,
        reload: loadMedia,
        addItem,
        updateItem,
        removeItem,
    };
}

export { mapMultimediaDtoToGalleryItem };
