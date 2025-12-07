import {
    GalleryClientSection
} from "@/features/gallery/components/gallery-client-section/GalleryClientSection";

export const metadata = { title: "Galería" };

export default function Page() {
    const isAdmin = true;

    return (
        <main className="p-10">
            <GalleryClientSection isAdmin={isAdmin} />
        </main>
    );
}
