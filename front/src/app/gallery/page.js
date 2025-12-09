import {
    GalleryClientSection
} from "@/features/gallery/components/gallery-client-section/GalleryClientSection";

export const metadata = { title: "Galería" };

export default function Page() {
    return (
        <main className="p-10">
            <GalleryClientSection />
        </main>
    );
}
