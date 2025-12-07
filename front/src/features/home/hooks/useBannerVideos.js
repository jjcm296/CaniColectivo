"use client";

import { useCallback, useEffect, useState } from "react";
import {
    getBannerVideos,
    createBannerVideo,
    deleteMultimedia,
} from "@/features/gallery/api/multimediaApi";

import { mapMultimediaDtoToGalleryItem } from "@/features/gallery/hooks/useGalleryMedia";

export function useBannerVideos() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener TODOS los videos de banner
    const loadVideos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const videosDto = await getBannerVideos();

            let mapped = videosDto
                .map(mapMultimediaDtoToGalleryItem)
                .filter((m) => m.type === "video");

            mapped.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setItems(mapped);
        } catch (err) {
            console.error("useBannerVideos -> error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadVideos();
    }, [loadVideos]);

    // Agregar video por URL
    const createVideo = useCallback(async (url) => {
        try {
            const dto = await createBannerVideo(url);
            const newItem = mapMultimediaDtoToGalleryItem(dto);

            if (newItem.type === "video") {
                setItems((prev) => [newItem, ...prev]);
            }

            return newItem;
        } catch (err) {
            console.error("Error al crear video de banner:", err);
            throw err;
        }
    }, []);

    // Eliminar video
    const removeVideo = useCallback(async (id) => {
        try {
            await deleteMultimedia(id);
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error al eliminar video:", err);
            throw err;
        }
    }, []);

    return {
        items,
        loading,
        error,
        reload: loadVideos,
        createVideo,
        removeVideo,
    };
}
