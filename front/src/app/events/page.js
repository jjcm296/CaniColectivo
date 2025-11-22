// src/app/events/page.js
import ContentHeader from "@/features/ui/content-header/ContentHeader";
import ArtistsGrid from "@/features/artists/artists-grid/ArtistsGrid";
import {Suspense} from "react";
import EventsGrid from "@/features/events/events-grid/EventsGrid";

export const metadata = { title: "Eventos" };

export default function EventsPage() {
    return (
        <main className="p-10">
            <Suspense fallback={<div>Cargando encabezado...</div>}>
                <ContentHeader scope={"events"}/>
                <EventsGrid/>
            </Suspense>
        </main>
    );
}
