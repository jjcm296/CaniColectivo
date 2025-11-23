// src/app/gallery/page.tsx
import ContentHeader from "@/features/ui/content-header/ContentHeader";
import GalleryClientSection from "@/features/gallery/gallery-client-section/GalleryClientSection";
import { dbGetAllGallery } from "@/features/fakeDb/fakeDb"; // 👈 ajusta el path real

export const metadata = { title: "Galería" };

export default function Page() {
    const initialItems = dbGetAllGallery();
    const isAdmin = true;

    return (
        <main className="p-10">
            <GalleryClientSection isAdmin={isAdmin} initialItems={initialItems} />
        </main>
    );
}
