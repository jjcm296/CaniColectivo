"use client";
import { Search } from "lucide-react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({
                                      defaultValue = "",
                                      placeholder = "Buscar…",
                                      onChange,
                                      ariaLabel = "Buscar",
                                  }) {
    return (
        <div className={styles.wrap}>
            <Search className={styles.icon} size={18} strokeWidth={2.2} />
            <input
                defaultValue={defaultValue}
                placeholder={placeholder}
                aria-label={ariaLabel}
                onChange={(e) => onChange?.(e.target.value)}
                className={styles.input}
            />
        </div>
    );
}
