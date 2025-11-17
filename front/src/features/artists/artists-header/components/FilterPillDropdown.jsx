"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    Sparkles,
    Heart,
    Palette,
    Trophy,
    Music,
    BookOpen,
    Theater,
    ChevronDown,
} from "lucide-react";
import styles from "./FilterPillDropdown.module.css";

// Reutiliza tus categorías
const CATEGORIES = [
    {
        key: "all",
        label: "Todos",
        icon: Sparkles,
        gradient: "linear-gradient(135deg, var(--bl) 0%, #1c8ad0 100%)",
        color: "var(--bl)",
    },
    {
        key: "cause",
        label: "Evento con causa",
        icon: Heart,
        gradient: "linear-gradient(135deg, var(--red) 0%, #e11a1a 100%)",
        color: "var(--red)",
    },
    {
        key: "cultural",
        label: "Cultural",
        icon: Palette,
        gradient: "linear-gradient(135deg, var(--or) 0%, #c24a0b 100%)",
        color: "var(--or)",
    },
    {
        key: "sport",
        label: "Deportivo",
        icon: Trophy,
        gradient: "linear-gradient(135deg, var(--yl) 0%, #FBB631 100%)",
        color: "var(--yl)",
    },
    {
        key: "music",
        label: "Musical",
        icon: Music,
        gradient: "linear-gradient(135deg, var(--gr) 0%, #15834a 100%)",
        color: "var(--gr)",
    },
    {
        key: "educative",
        label: "Educativo",
        icon: BookOpen,
        gradient: "linear-gradient(135deg, var(--bl) 0%, #1b83cc 100%)",
        color: "var(--bl)",
    },
    {
        key: "theatre",
        label: "Escénicas",
        icon: Theater,
        gradient: "linear-gradient(135deg, var(--nv) 0%, #0f1833 100%)",
        color: "var(--nv)",
    },
];

export default function FilterPillDropdown() {
    const router = useRouter();
    const params = useSearchParams();
    const cat = params.get("cat") ?? "all";

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function onDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("click", onDoc);
        return () => document.removeEventListener("click", onDoc);
    }, []);

    const active = CATEGORIES.find((c) => c.key === cat) || CATEGORIES[0];
    const ActiveIcon = active.icon;

    const setCat = (key) => {
        const url = new URL(window.location.href);
        if (key === "all") url.searchParams.delete("cat");
        else url.searchParams.set("cat", key);
        url.searchParams.delete("page");
        router.push(url.toString());
        setOpen(false);
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            <button
                type="button"
                className={styles.pill}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                style={{ borderColor: active.color }}
            >
                <span
                    className={styles.swatch}
                    style={{ background: active.gradient }}
                />
                <ActiveIcon size={16} className={styles.icon} />
                <span className={styles.label}>{active.label}</span>
                <ChevronDown
                    size={16}
                    className={`${styles.chevron} ${
                        open ? styles.open : ""
                    }`}
                />
            </button>

            <div
                className={`${styles.dropdown} ${open ? styles.show : ""}`}
                role="listbox"
            >
                {CATEGORIES.map((c) => {
                    const Ico = c.icon;
                    const isActive = c.key === active.key;
                    return (
                        <button
                            key={c.key}
                            role="option"
                            aria-selected={isActive}
                            className={`${styles.option} ${
                                isActive ? styles.optionActive : ""
                            }`}
                            onClick={() => setCat(c.key)}
                        >
                            <span
                                className={styles.optionSwatch}
                                style={{ background: c.gradient }}
                            />
                            <Ico size={16} className={styles.optionIcon} />
                            <span className={styles.optionLabel}>
                                {c.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
