'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay /*, Pagination*/ } from 'swiper/modules';
import Image from 'next/image';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

import styles from '../styles/CircleCarousel.module.css';

export default function CircleCarousel({
                                           images = [],
                                           title = 'Nuestra Galería',
                                           className,
                                           autoplayDelay = 2200,
                                           spaceBetween = 24,
                                           depth = 220,
                                           stretch = -40,
                                           speed = 800,
                                           loop = true,
                                           sizes = '(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px',
                                           slideSize = {
                                               desktop: { w: 260, h: 400 },
                                               tablet:  { w: 220, h: 320 },
                                               mobile:  { w: 180, h: 260 },
                                           },
                                       }) {
    // Array base con _uid estable para keys
    const [list, setList] = useState(() =>
        images.map((img, i) => ({ ...img, _uid: img.id ?? `${img.src}__init_${i}` }))
    );

    // Índice actual para el contador propio (usa realIndex para loop)
    const [currentIndex, setCurrentIndex] = useState(0);

    // Si cambian las imágenes desde afuera, resincroniza y reinicia índice
    useEffect(() => {
        const next = images.map((img, i) => ({ ...img, _uid: img.id ?? `${img.src}__init_${i}` }));
        setList(next);
        setCurrentIndex(0);
    }, [images]);

    const hasImages = list.length > 0;

    // Variables CSS responsivas
    const cssVars = useMemo(() => ({
        '--slide-w': `${slideSize.desktop.w}px`,
        '--slide-h': `${slideSize.desktop.h}px`,
        '--slide-w-md': `${slideSize.tablet.w}px`,
        '--slide-h-md': `${slideSize.tablet.h}px`,
        '--slide-w-sm': `${slideSize.mobile.w}px`,
        '--slide-h-sm': `${slideSize.mobile.h}px`,
    }), [slideSize]);

    const swiperRef = useRef(null);

    return (
        <section className={clsx(styles.carouselSection, className)} style={cssVars}>
            <div className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
            </div>

            <div className={styles.carouselWrap}>
                <Swiper
                    onSwiper={(s) => { swiperRef.current = s; }}
                    onSlideChange={(s) => setCurrentIndex(s.realIndex ?? 0)} // ✅ contador propio
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    spaceBetween={spaceBetween}
                    speed={speed}
                    loop={loop}
                    watchOverflow={false}
                    autoplay={{
                        delay: autoplayDelay,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        stopOnLastSlide: false,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch,
                        depth,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    modules={[
                        EffectCoverflow,
                        Autoplay,
                        // Pagination,
                    ]}
                    className={styles.swiper}

                    // 🔹 Opción 2: Paginación nativa de Swiper (fracción)
                    // pagination={{
                    //   el: '.swiper-pagination',
                    //   type: 'fraction',
                    // }}
                >
                    {hasImages ? (
                        list.map((img, idx) => (
                            <SwiperSlide key={img._uid} className={styles.slide}>
                                <div className={styles.imageWrap}>
                                    <Image
                                        src={img.src}
                                        alt={img.alt || `Imagen ${idx + 1}`}
                                        fill
                                        sizes={sizes}
                                        style={{ objectFit: 'cover' }}
                                        priority={idx === 0}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide className={styles.slide}>
                            <div className={styles.empty}>Sube imágenes o pasa el array por props.</div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* 🔹 Contador propio (actual / total). Ocúltalo si no hay imágenes */}
            {hasImages && (
                <div className={styles.counter} aria-live="polite">
                    {currentIndex + 1} / {list.length}
                </div>
            )}

        </section>
    );
}
