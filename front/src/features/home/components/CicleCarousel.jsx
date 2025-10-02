'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

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
                                           sizes = '(max-width: 480px) 72vw, (max-width: 768px) 48vw, (max-width: 1024px) 36vw, 260px',
                                           slideSize = {
                                               desktop: { w: 260, h: 400 },
                                               tablet:  { w: 220, h: 320 },
                                               mobile:  { w: 180, h: 260 },
                                           },
                                       }) {
    const [list, setList] = useState(() =>
        images.map((img, i) => ({ ...img, _uid: img.id ?? `${img.src}__init_${i}` }))
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const next = images.map((img, i) => ({ ...img, _uid: img.id ?? `${img.src}__init_${i}` }));
        setList(next);
        setCurrentIndex(0);
    }, [images]);

    const hasImages = list.length > 0;

    const cssVars = useMemo(
        () => ({
            ['--slide-w']: `${slideSize.desktop.w}px`,
            ['--slide-h']: `${slideSize.desktop.h}px`,
            ['--slide-w-md']: `${slideSize.tablet.w}px`,
            ['--slide-h-md']: `${slideSize.tablet.h}px`,
            ['--slide-w-sm']: `${slideSize.mobile.w}px`,
            ['--slide-h-sm']: `${slideSize.mobile.h}px`,
        }),
        [slideSize]
    );

    const swiperRef = useRef(null);

    const autoplayConfig =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? false
            : {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false,
            };

    return (
        <section className={clsx(styles.carouselSection, className)} style={cssVars}>
            <div className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
            </div>

            <div className={styles.carouselWrap}>
                <Swiper
                    onSwiper={(s) => { swiperRef.current = s; }}
                    onSlideChange={(s) => setCurrentIndex(s.realIndex ?? 0)}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    centeredSlidesBounds     /* evita hueco en los bordes */
                    slidesPerView="auto"
                    spaceBetween={spaceBetween}
                    speed={speed}
                    loop={loop}
                    watchOverflow={true}     /* si hay pocas slides, no desborda */
                    autoplay={autoplayConfig}
                    coverflowEffect={{
                        rotate: 0,
                        stretch,
                        depth,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    breakpoints={{
                        0:    { spaceBetween: 16, coverflowEffect: { rotate: 0, stretch: -30, depth: 140, modifier: 1, slideShadows: false } },
                        480:  { spaceBetween: 18, coverflowEffect: { rotate: 0, stretch: -36, depth: 160, modifier: 1, slideShadows: false } },
                        768:  { spaceBetween: 22, coverflowEffect: { rotate: 0, stretch: -40, depth: 190, modifier: 1, slideShadows: false } },
                        1024: { spaceBetween,    coverflowEffect: { rotate: 0, stretch,    depth,    modifier: 1, slideShadows: false } },
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    className={styles.swiper}
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
                                        draggable={false}
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

            {hasImages && (
                <div className={styles.counter} aria-live="polite">
                    {currentIndex + 1} / {list.length}
                </div>
            )}
        </section>
    );
}
