export function slugify(text) {
    return (text || "")
        .normalize("NFD")                       // elimina acentos
        .replace(/[\u0300-\u036f]/g, "")        // elimina tildes
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")            // reemplaza espacios y símbolos por "-"
        .replace(/^-+|-+$/g, "");               // quita guiones al inicio/fin
}
