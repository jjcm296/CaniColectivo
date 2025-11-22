import EventCard from '@/features/events/event-card/EventCard';
import { getEvents } from '@/features/events/services/EventService';
import styles from './EventsGrid.module.css';

export default async function EventsGrid() {
    let events = [];

    try {
        events = await getEvents();
    } catch (error) {
        console.error('Error al cargar eventos:', error);
    }

    if (!events || events.length === 0) {
        return (
            <section className={styles.emptyState}>
                <p className={styles.emptyText}>
                    Aún no hay eventos publicados. Muy pronto anunciaremos nuevas
                    fechas ✨
                </p>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {events.map((event) => (
                    <EventCard key={event.id || event.slug} event={event} />
                ))}
            </div>
        </section>
    );
}
