"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "@/features/ui/components/ActionButton";
import SearchBar from "@/features/ui/components/SearchBar";
import styles from "../styles/ArtistsHeader.module.css";

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
            {/* Título + descripción */}
            <div className={styles.titleWrap}>
                <h1 className={styles.title}>Artistas</h1>
                <p className={styles.subtitle}>
                    Descubre y conecta con talento local
                </p>
            </div>

            {/* Botón de acción */}
            <ActionButton
                onClick={() => router.push("/artists/new")}
                variant="primary"
            >
                + Agregar Artista
            </ActionButton>

            {/* Buscador */}
            <div className={styles.searchRow}>
                <SearchBar
                    defaultValue={q}
                    placeholder="Buscar artistas..."
                    onChange={onSearch}
                />
            </div>
        </header>
    );
}
