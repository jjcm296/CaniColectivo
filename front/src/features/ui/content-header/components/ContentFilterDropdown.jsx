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
    MapPin,
    User,
} from "lucide-react";
import styles from "./ContentFilterDropdown.module.css";

/* ============================
   CONFIG: EVENTOS
============================ */
const EVENT_CATEGORIES = [
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

/* ============================
   CONFIG: ARTISTAS
   (modo: cómo buscar al artista)
============================ */
const ARTIST_FILTERS = [
    {
        key: "all",
        label: "Todos",
        icon: Sparkles,
        gradient: "linear-gradient(135deg, var(--gr) 0%, #1CA155 100%)",
        color: "var(--gr)",
    },
    {
        key: "name",
        label: "Por nombre",
        icon: User,
        gradient: "linear-gradient(135deg, var(--bl) 0%, #1c8ad0 100%)",
        color: "var(--bl)",
    },
    {
        key: "city",
        label: "Por ciudad",
        icon: MapPin,
        gradient: "linear-gradient(135deg, var(--or) 0%, #c24a0b 100%)",
        color: "var(--or)",
    },
    {
        key: "discipline",
        label: "Por disciplina",
        icon: Palette,
        gradient: "linear-gradient(135deg, var(--nv) 0%, #0f1833 100%)",
        color: "var(--nv)",
    },
];

/* ============================
   MAPA GENERAL POR SCOPE
============================ */
const SCOPE_CONFIG = {
    events: {
        paramKey: "cat",
        options: EVENT_CATEGORIES,
    },
    artists: {
        paramKey: "filter",
        options: ARTIST_FILTERS,
    },
};

export default function ContentFilterDropdown({ scope = "events" }) {
    const router = useRouter();
    const params = useSearchParams();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Elegimos config según el scope
    const config = SCOPE_CONFIG[scope] || SCOPE_CONFIG.events;
    const { paramKey, options } = config;

    // Valor actual desde la URL
    const currentKey = params.get(paramKey) ?? options[0].key;

    const active = options.find((c) => c.key === currentKey) || options[0];
    const ActiveIcon = active.icon;

    useEffect(() => {
        function onDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", onDoc);
        return () => document.removeEventListener("click", onDoc);
    }, []);

    const setFilter = (key) => {
        const url = new URL(window.location.href);

        if (key === options[0].key) {
            // primer elemento = "Todos" -> limpiar filtro
            url.searchParams.delete(paramKey);
        } else {
            url.searchParams.set(paramKey, key);
        }

        // Reiniciamos página
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
                {options.map((opt) => {
                    const Ico = opt.icon;
                    const isActive = opt.key === active.key;
                    return (
                        <button
                            key={opt.key}
                            role="option"
                            aria-selected={isActive}
                            className={`${styles.option} ${
                                isActive ? styles.optionActive : ""
                            }`}
                            onClick={() => setFilter(opt.key)}
                        >
                            <span
                                className={styles.optionSwatch}
                                style={{ background: opt.gradient }}
                            />
                            <Ico size={16} className={styles.optionIcon} />
                            <span className={styles.optionLabel}>
                                {opt.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
