// src/app/events/page.js
import ArtistsHeader from "@/features/artists/artists-header/ArtistsHeader";
import ArtistsGrid from "@/features/artists/artists-grid/ArtistsGrid";
import {Suspense} from "react";
import EventsGrid from "@/features/events/events-grid/EventsGrid";

export const metadata = { title: "Eventos" };

export default function EventsPage() {
    return (
        <main className="p-10">
            <Suspense fallback={<div>Cargando encabezado...</div>}>
                <ArtistsHeader />
                <EventsGrid/>
            </Suspense>
        </main>
    );
}
