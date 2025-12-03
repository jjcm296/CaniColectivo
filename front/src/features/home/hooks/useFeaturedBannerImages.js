"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllFeaturesBannerImages } from "@/features/gallery/api/multimediaApi";
import { mapMultimediaDtoToGalleryItem } from "@/features/gallery/hooks/useGalleryMedia";

export function useFeaturedBannerImages() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFeatured = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const imagesDto = await getAllFeaturesBannerImages();

            let mapped = imagesDto.map(mapMultimediaDtoToGalleryItem);

            // Solo IMÁGENES activas y destacadas
            mapped = mapped.filter(
                (m) => m.type === "image" && m.isActive && m.isFeatured
            );

            mapped.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setItems(mapped);
        } catch (err) {
            console.error("useFeaturedBannerImages -> error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFeatured();
    }, [loadFeatured]);

    return {
        items,
        loading,
        error,
        reload: loadFeatured,
    };
}
