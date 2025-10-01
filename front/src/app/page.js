import Hero from '../features/home/components/Hero';
import CircleCarousel from '../features/home/components/CicleCarousel';
import HomeCarouselSection from "@/features/home/HomeCarouselSection";
import Footer from "@/features/home/components/footer/Footer";

export default function HomePage() {
    return (
        <>
            <Hero />
            <HomeCarouselSection />
            <Footer />
        </>
    );
}
