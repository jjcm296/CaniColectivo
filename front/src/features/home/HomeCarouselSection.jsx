'use client';

import { useFeaturedBannerImages } from "@/features/home//hooks/useFeaturedBannerImages";
import CircleCarousel from "@/features/home/components/CircleCarousel";

export default function HomeCarouselSection() {
    const { items, loading, error } = useFeaturedBannerImages();

    const images = items.map((item) => ({
        id: item.id,
        src: item.url,
        alt: "Imagen destacada",
    }));

    return (
        <CircleCarousel
            title="Nuestra Galería"
            images={images}
            autoplayDelay={2600}
            depth={240}
            stretch={-55}
        />
    );
}
