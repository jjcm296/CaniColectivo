"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/features/ui/components/SearchBar";
import ContentFilterDropdown from "@/features/ui/content-header/components/ContentFilterDropdown";
import styles from "./ContentHeader.module.css";

export default function ContentHeader({ scope = "artists" }) {
    const router = useRouter();
    const params = useSearchParams();

    const isEvents = scope === "events";

    // Usamos el mismo parámetro 'q' en la URL (cada página tiene su propio q)
    const q = params.get("q") ?? "";

    const title = isEvents ? "Eventos" : "Artistas";
    const subtitle = isEvents
        ? "Descubre y participa en experiencias locales"
        : "Descubre y conecta con talento local";

    const searchPlaceholder = isEvents
        ? "Buscar eventos por nombre, lugar o fecha..."
        : "Buscar artistas por nombre, ciudad o disciplina...";

    const filterScope = isEvents ? "events" : "artists";

    const onSearch = (value) => {
        const url = new URL(window.location.href);

        if (value) {
            url.searchParams.set("q", value);
        } else {
            url.searchParams.delete("q");
        }

        // Reiniciamos paginación al cambiar búsqueda
        url.searchParams.delete("page");

        router.push(url.toString());
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.actionRow}>
                <div className={styles.searchWrap}>
                    <SearchBar
                        defaultValue={q}
                        placeholder={searchPlaceholder}
                        onChange={onSearch}
                    />
                </div>

                {/*/!* El filtro se adapta según scope *!/*/}
                {/*<ContentFilterDropdown scope={filterScope} />*/}
            </div>
        </header>
    );
}
