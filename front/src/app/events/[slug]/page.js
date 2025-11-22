import { notFound } from "next/navigation";
import { getEvents } from "@/features/events/services/EventService";
import EventDetail from "@/features/events/event-detail/EventDetail";

async function getEventBySlug(slug) {
    const events = await getEvents();
    if (!events || !Array.isArray(events)) return null;
    return events.find((event) => event.slug === slug) || null;
}

export default async function EventSlugPage({ params }) {
    const { slug } = params || {};

    if (!slug) {
        notFound();
    }

    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    return <EventDetail event={event} />;
}
