import CircleCarousel from "@/features/home/components/CicleCarousel";


export default function HomeCarouselSection() {
    const images = [
        { src: '/home/circle-carousel/imagen.jpeg',  alt: 'Imagen 1' },
        { src: '/home/circle-carousel/imagen2.jpeg', alt: 'Imagen 2' },
        { src: '/home/circle-carousel/imagen3.jpeg', alt: 'Imagen 3' },
        { src: '/home/circle-carousel/imagen4.jpeg', alt: 'Imagen 4' },
        { src: '/home/circle-carousel/imagen5.jpeg', alt: 'Imagen 5' },
        { src: '/home/circle-carousel/imagen.jpeg',  alt: 'Imagen 1' },
        { src: '/home/circle-carousel/imagen2.jpeg', alt: 'Imagen 2' },
        { src: '/home/circle-carousel/imagen3.jpeg', alt: 'Imagen 3' },
        { src: '/home/circle-carousel/imagen4.jpeg', alt: 'Imagen 4' },
        { src: '/home/circle-carousel/imagen5.jpeg', alt: 'Imagen 5' },
    ];

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
