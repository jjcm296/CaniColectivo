import Hero from '../features/home/components/Hero';
import CircleCarousel from '../features/home/components/CicleCarousel';
import HomeCarouselSection from "@/features/home/HomeCarouselSection";
import Footer from "@/features/home/components/footer/Footer";
import EventSpotlight from "@/features/home/components/events/EventSpotlight";

export default function HomePage() {
    const eventos = [
        {
            id: 'baladas-baleros1',
            title: 'Baladas y baleros',
            dateISO: '2026-01-03T15:00:00-06:00',
            venue: 'Av Universidad Veracruzana 2919, Fovissste (UNID)',
            poster: '/home/events/evento1.jpeg', // pon tu poster en /public/eventos/...
            slug: 'baladas-y-baleros',
            registerUrl: '', // o una URL externa si aplica
            isCause: true,
        },
        {
            id: 'residencia-otono1',
            title: 'Residencia Creativa',
            dateISO: '2025-11-15T10:00:00-06:00',
            venue: 'Parque Miguel Hidalgo \n  Coatzacoalcos, Ver.',
            poster: '/home/events/evento2.jpeg',
            slug: 'residencia-creativa-otono',
            registerUrl: '/eventos/residencia-creativa-otono/inscripcion',
            isCause: false,
        },
        {
            id: 'baladas-baleros2',
            title: 'Baladas y baleros',
            dateISO: '2026-01-03T15:00:00-06:00',
            venue: 'Av Universidad Veracruzana 2919, Fovissste (UNID)',
            poster: '/home/events/evento1.jpeg', // pon tu poster en /public/eventos/...
            slug: 'baladas-y-baleros',
            registerUrl: '', // o una URL externa si aplica
            isCause: true,
        },
        {
            id: 'residencia-otono2',
            title: 'Residencia Creativa',
            dateISO: '2025-11-15T10:00:00-06:00',
            venue: 'Parque Miguel Hidalgo \n  Coatzacoalcos, Ver.',
            poster: '/home/events/evento2.jpeg',
            slug: 'residencia-creativa-otono',
            registerUrl: '/eventos/residencia-creativa-otono/inscripcion',
            isCause: false,
        },
        {
            id: 'baladas-baleros3',
            title: 'Baladas y baleros',
            dateISO: '2026-01-03T15:00:00-06:00',
            venue: 'Av Universidad Veracruzana 2919, Fovissste (UNID)',
            poster: '/home/events/evento1.jpeg', // pon tu poster en /public/eventos/...
            slug: 'baladas-y-baleros',
            registerUrl: '', // o una URL externa si aplica
            isCause: true,
        },
        {
            id: 'residencia-otono3',
            title: 'Residencia Creativa',
            dateISO: '2025-11-15T10:00:00-06:00',
            venue: 'Parque Miguel Hidalgo \n  Coatzacoalcos, Ver.',
            poster: '/home/events/evento2.jpeg',
            slug: 'residencia-creativa-otono',
            registerUrl: '/eventos/residencia-creativa-otono/inscripcion',
            isCause: false,
        },
    ];

    return (
        <>
            <Hero />
            <EventSpotlight events={eventos} />
            <HomeCarouselSection />
            <Footer />
        </>
    );
}
