"use client";
import { Plus, Save, Trash2, Pencil } from "lucide-react";
import styles from "../styles/ActionButton.module.css";

/**
 * Botón reutilizable con ícono opcional.
 * Props:
 * - icon: nombre del ícono ("plus" | "save" | "trash" | "edit")
 * - variant: "primary" | "success" | "danger" | "secondary"
 */
export default function ActionButton({
                                         children,
                                         onClick,
                                         href,
                                         as = "button",
                                         type = "button",
                                         variant = "primary",
                                         icon,
                                         style,
                                         className = "",
                                     }) {
    const classes = `${styles.btn} ${styles[variant]} ${className}`.trim();

    const renderIcon = () => {
        switch (icon) {
            case "plus": return <Plus size={18} strokeWidth={2.2} />;
            case "save": return <Save size={18} strokeWidth={2.2} />;
            case "trash": return <Trash2 size={18} strokeWidth={2.2} />;
            case "edit": return <Pencil size={18} strokeWidth={2.2} />;
            default: return null;
        }
    };

    if (as === "a" && href) {
        return (
            <a href={href} onClick={onClick} className={classes} style={style}>
                {icon && renderIcon()}
                <span>{children}</span>
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classes} style={style}>
            {icon && renderIcon()}
            <span>{children}</span>
        </button>
    );
}
