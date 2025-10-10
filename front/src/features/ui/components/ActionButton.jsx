"use client";
import { forwardRef, Fragment } from "react";
import { Plus, Save, Trash2, Pencil } from "lucide-react";
import styles from "../styles/ActionButton.module.css";

/**
 * Botón altamente configurable mediante CSS variables:
 * Props principales:
 * - variant: "solid" | "outline" | "ghost" (default: "solid")
 * - size: "sm" | "md" | "lg" (default: "md")
 * - radius: "sm" | "md" | "lg" | "full" (default: "md")
 * - icon: "plus" | "save" | "trash" | "edit" (opcional)
 * - leftIcon / rightIcon: ReactNode (opcional)
 * - loading: boolean
 * - disabled: boolean
 * - as: "button" | "a" (default "button")
 * - href: string (si as="a")
 *
 * Colores (opcionales) – pasan a CSS variables:
 * - bg: color de fondo (p.ej. "#25A0E2" o "var(--bl)")
 * - hoverBg: color de hover
 * - fg: color de texto/ícono
 * - border: color de borde
 * - shadow: box-shadow
 */
const IconMap = {
    plus: Plus,
    save: Save,
    trash: Trash2,
    edit: Pencil,
};

const ActionButton = forwardRef(function ActionButton(
    {
        children,
        onClick,
        href,
        as = "button",
        type = "button",
        variant = "solid",
        size = "md",
        radius = "md",
        icon,
        leftIcon,
        rightIcon,
        loading = false,
        disabled = false,
        bg, hoverBg, fg, border, shadow,
        className = "",
        style,
        "aria-label": ariaLabel,
        ...rest
    },
    ref
) {
    // Armamos clase base
    const classes = [
        styles.btn,
        styles[variant] ?? styles.solid,
        styles[size] ?? styles.md,
        styles[`round-${radius}`] ?? styles["round-md"],
        (disabled ? styles.disabled : ""),
        (loading ? styles.loading : ""),
        className
    ].filter(Boolean).join(" ");

    // Variables CSS dinamizadas por props
    const varStyle = {
        ...(bg && { ["--btn-bg"]: bg }),
        ...(hoverBg && { ["--btn-hover-bg"]: hoverBg }),
        ...(fg && { ["--btn-fg"]: fg }),
        ...(border && { ["--btn-border"]: border }),
        ...(shadow && { ["--btn-shadow"]: shadow }),
    };

    const mergedStyle = { ...varStyle, ...style };

    const RenderIcon = icon ? IconMap[icon] : null;
    const isDisabled = disabled || loading;

    const contents = (
        <Fragment>
            {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
            {!loading && (leftIcon || RenderIcon) ? (
                <span aria-hidden="true">
          {leftIcon ? leftIcon : <RenderIcon size={18} strokeWidth={2.2} />}
        </span>
            ) : null}
            <span>{children}</span>
            {!loading && rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
        </Fragment>
    );

    if (as === "a") {
        return (
            <a
                ref={ref}
                href={href}
                onClick={onClick}
                className={classes}
                style={mergedStyle}
                aria-label={ariaLabel}
                aria-disabled={isDisabled || undefined}
                {...rest}
            >
                {contents}
            </a>
        );
    }

    return (
        <button
            ref={ref}
            type={type}
            onClick={onClick}
            className={classes}
            style={mergedStyle}
            disabled={isDisabled}
            aria-label={ariaLabel}
            {...rest}
        >
            {contents}
        </button>
    );
});

export default ActionButton;
