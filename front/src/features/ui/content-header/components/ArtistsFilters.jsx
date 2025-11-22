"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
    Sparkles, Heart, Palette, Trophy, Music, BookOpen, Theater, ChevronDown
} from "lucide-react";
import CategoryTile from "@/features/ui/components/CategoryTile";
import styles from "./ArtistsFilters.module.css";

const CATEGORIES = [
    { key: "all",       label: "Todos",            icon: Sparkles, gradient: "linear-gradient(135deg, var(--bl) 0%, #1c8ad0 100%)", decor: false },
    { key: "cause",     label: "Evento con causa", icon: Heart,    gradient: "linear-gradient(135deg, var(--red) 0%, #e11a1a 100%)", decor: false },
    { key: "cultural",  label: "Cultural",         icon: Palette,  gradient: "linear-gradient(135deg, var(--or) 0%, #c24a0b 100%)",  decor: false },
    { key: "sport",     label: "Deportivo",        icon: Trophy,   gradient: "linear-gradient(135deg, var(--yl) 0%, #FBB631 100%)",  decor: false },
    { key: "music",     label: "Musical",          icon: Music,    gradient: "linear-gradient(135deg, var(--gr) 0%, #15834a 100%)",  decor: false },
    { key: "educative", label: "Educativo",        icon: BookOpen, gradient: "linear-gradient(135deg, var(--bl) 0%, #1b83cc 100%)",  decor: false },
    { key: "theatre",   label: "Escénicas",        icon: Theater,  gradient: "linear-gradient(135deg, var(--nv) 0%, #0f1833 100%)",  decor: true  },
];

export default function ArtistsFilters() {
    const router = useRouter();
    const params = useSearchParams();
    const cat = params.get("cat") ?? "all";

    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function onDocClick(e) {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const setCat = (key) => {
        const url = new URL(window.location.href);
        if (key === "all") url.searchParams.delete("cat");
        else url.searchParams.set("cat", key);
        url.searchParams.delete("page");
        router.push(url.toString());
    };

    const activeCategory =
        CATEGORIES.find((c) => c.key === cat) || CATEGORIES[0];
    const ActiveIcon = activeCategory.icon;

    return (
        <section
            className={styles.section}
            ref={wrapperRef}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className={styles.header}>
                <div className={styles.headerText}>
                    <span className={styles.kicker}>Explora por categoría:  </span>
                    <h2 className={styles.title}>
                        Encuentra artistas por su especialidad
                    </h2>
                </div>

                <div className={styles.activePill}>
          <span
              className={styles.swatch}
              style={{ background: activeCategory.gradient }}
          />
                    <ActiveIcon size={16} className={styles.activeIcon} />
                    <span className={styles.activeLabel}>{activeCategory.label}</span>
                    <ChevronDown
                        size={16}
                        className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
                    />
                </div>
            </div>

            <div
                id="artists-filter-panel"
                className={`${styles.panel} ${open ? styles.open : ""}`}
            >
                <div className={styles.grid}>
                    {CATEGORIES.map((c) => (
                        <CategoryTile
                            key={c.key}
                            icon={c.icon}
                            label={c.label}
                            active={cat === c.key || (c.key === "all" && !params.get("cat"))}
                            gradient={c.gradient}
                            decor={c.decor}
                            onClick={() => setCat(c.key)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
