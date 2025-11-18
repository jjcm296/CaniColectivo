"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/features/ui/components/SearchBar";
import FilterPillDropdown from "@/features/artists/artists-header/components/FilterPillDropdown";
import styles from "./ArtistsHeader.module.css";

export default function ArtistsHeader() {
    const router = useRouter();
    const params = useSearchParams();
    const q = params.get("q") ?? "";

    const onSearch = (value) => {
        const url = new URL(window.location.href);
        if (value) url.searchParams.set("q", value);
        else url.searchParams.delete("q");
        url.searchParams.delete("page");
        router.push(url.toString());
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Artistas</h1>
            <p className={styles.subtitle}>Descubre y conecta con talento local</p>

            <div className={styles.actionRow}>
                <div className={styles.searchWrap}>
                    <SearchBar
                        defaultValue={q}
                        placeholder="Buscar artistas..."
                        onChange={onSearch}
                    />
                </div>
                <FilterPillDropdown />

            </div>
        </header>

    );
}
