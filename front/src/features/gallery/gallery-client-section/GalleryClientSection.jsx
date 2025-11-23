// src/features/gallery/gallery-client-section/GalleryClientSection.jsx
"use client";

import { useMemo, useState } from "react";
import GalleryImagesSection from "../gallery-images-section/GalleryImagesSection";

export default function GalleryClientSection({ isAdmin, initialItems }) {
    const [items, setItems] = useState(initialItems ?? []);
    const [view, setView] = useState("all"); // "all" | "featured" | "hidden"

    function handleToggle(id) {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, isActive: !(item.isActive ?? true) }
                    : item
            )
        );
    }

    function handleRemove(id) {
        const ok = window.confirm("¿Eliminar este elemento?");
        if (!ok) return;

        setItems((prev) => prev.filter((item) => item.id !== id));
    }

    // Filtro según pestaña
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

            // "all"
            if (isAdmin) return true;
            return active;
        });
    }, [items, view, isAdmin]);

    function handleToggleFeatured(id) {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, isFeatured: !item.isFeatured }
                    : item
            )
        );
    }

    return (
        <GalleryImagesSection
            isAdmin={isAdmin}
            items={filteredItems}
            view={view}
            onChangeView={setView}
            onToggleActive={handleToggle}
            onToggleFeatured={handleToggleFeatured}
            onRemove={handleRemove}
        />
    );
}
