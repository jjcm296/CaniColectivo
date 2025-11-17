import { slugify } from "@/features/utils/slugify";

const db = {
    artists: [
        {
            id: 1,
            name: "Colectivo Aurora",
            city: "Monterrey, N.L.",
            tags: ["Colectivo", "Experimental", "Visual"],
            social: {
                whatsapp: "5218112345678",
                instagram: "https://instagram.com/aurora.colectivo",
                tiktok: "https://www.tiktok.com/@aurora.colectivo",
                facebook: "https://facebook.com/aurora.colectivo",
                x: "https://x.com/aurora_colectivo",
            },
            imageUrl: null,
            headline: "Colectivo de experimentación visual y sonora",
            bio: "Colectivo Aurora reúne a artistas de distintas disciplinas para crear experiencias inmersivas que mezclan luz, sonido y performance. Sus proyectos se enfocan en la colaboración y la apropiación de espacios urbanos."
        },
        {
            id: 2,
            name: "JordaIn",
            city: "Minatitlan, Ver.",
            tags: ["Acústico"],
            social: {
                whatsapp: "9221860109",
                instagram: "https://www.instagram.com/jordanjair.cruz/",
                tiktok: "https://www.tiktok.com/@aurora.colectivo",
                facebook: "https://facebook.com/luna.rivera.music",
                x: "https://x.com/aurora_colectivo",
            },
            imageUrl: "/artists/Jordan.jpeg",
            headline: "Cantautor acústico de la región sur de Veracruz",
            bio: "JordaIn combina letras íntimas con arreglos acústicos para crear una propuesta cercana y honesta. Ha participado en eventos locales y espacios independientes, conectando con el público a través de historias cotidianas."
        },
        {
            id: 3,
            name: "Marea del Norte",
            city: "Torreón, Coah.",
            tags: ["Rock", "Alternativo"],
            social: {
                whatsapp: "5218715566778",
                instagram: "https://instagram.com/marea.norte",
                tiktok: "https://www.tiktok.com/@marea.norte",
                facebook: null,
                x: "https://x.com/marea_norte",
            },
            imageUrl: null,
            headline: "Rock alternativo con influencias del desierto norteño",
            bio: "Marea del Norte explora sonidos densos y atmosféricos inspirados en el paisaje del norte de México. Sus letras hablan de memoria, territorio y resiliencia, con un show en vivo energético."
        },
        {
            id: 4,
            name: "DJ Nébula",
            city: "Monterrey, N.L.",
            tags: ["Electrónica", "Techno"],
            social: {
                whatsapp: "5218123459988",
                instagram: null,
                tiktok: "https://www.tiktok.com/@djnebula",
                facebook: null,
                x: null,
            },
            imageUrl: null,
            headline: "Selecciones electrónicas para espacios nocturnos y raves",
            bio: "DJ Nébula construye sesiones que viajan del techno al house melódico, priorizando la narrativa musical y los cambios de energía en la pista. Ha participado en fiestas underground y eventos independientes."
        },
        {
            id: 5,
            name: "Trama Sonora",
            city: "Guadalajara, Jal.",
            tags: ["Experimental", "Synth"],
            social: {
                whatsapp: "5213334567890",
                instagram: "https://instagram.com/trama.sonora",
                tiktok: null,
                facebook: "https://facebook.com/trama.sonora",
                x: "https://x.com/trama_sonora",
            },
            imageUrl: null,
            headline: "Paisajes sonoros y síntesis análoga",
            bio: "Trama Sonora investiga texturas electrónicas y loops minimalistas para construir piezas contemplativas. Su trabajo se ha presentado en galerías, festivales de arte sonoro y sesiones de escucha."
        },
        {
            id: 6,
            name: "Círculo Abierto",
            city: "San Luis Potosí, S.L.P.",
            tags: ["Improvisación", "Colectivo"],
            social: {
                whatsapp: "5214448832211",
                instagram: "https://instagram.com/circulo.abierto",
                tiktok: null,
                facebook: null,
                x: null,
            },
            imageUrl: null,
            headline: "Laboratorio de improvisación y encuentro",
            bio: "Círculo Abierto funciona como plataforma para la improvisación libre, convocando músicos y creadorxs de distintas escenas. Cada sesión es distinta y se adapta al espacio y a las personas presentes."
        },
        {
            id: 7,
            name: "Dante Cruz",
            city: "CDMX",
            tags: ["Pop", "Acústico"],
            social: {
                whatsapp: "5215512349876",
                instagram: null,
                tiktok: "https://tiktok.com/@dantecruz_music",
                facebook: "https://facebook.com/dante.cruz.oficial",
                x: null,
            },
            imageUrl: null,
            headline: "Canciones pop con esencia acústica",
            bio: "Dante Cruz escribe canciones sobre relaciones, ciudad y cambio personal, mezclando melodías pop con una base acústica. Ha participado en foros independientes y sesiones íntimas en formato acústico."
        },
        {
            id: 8,
            name: "Violeta Mar",
            city: "Querétaro, Qro.",
            tags: ["Indie", "Dream Pop"],
            social: {
                whatsapp: "5214427788994",
                instagram: "https://instagram.com/violetamar.music",
                tiktok: null,
                facebook: "https://facebook.com/violeta.mar.music",
                x: null,
            },
            imageUrl: null,
            headline: "Dream pop y atmósferas suaves",
            bio: "Violeta Mar construye canciones etéreas con capas de guitarras, sintetizadores y voces reverberadas. Su propuesta se mueve entre el indie y el dream pop, ideal para espacios de escucha y festivales alternativos."
        },
    ],
};

// ==== Helpers específicos de artistas ====
export function dbGetAllArtists() {
    return [...db.artists];
}

export function dbGetArtistById(id) {
    return db.artists.find((artist) => artist.id === Number(id)) || null;
}

export function dbGetArtistBySlug(slug) {
    return db.artists.find((artist) => slugify(artist.name) === slug) || null;
}

export default db;
