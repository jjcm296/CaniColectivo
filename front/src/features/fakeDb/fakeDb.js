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
            email: "jordanjaircruzmendoza@gmail.com",
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

    users: [
        {
            id: 1,
            name: "JordaIn",
            email: "jordanjaircruzmendoza@gmail.com",
            artistId: 2,
        },
        {
            id: 2,
            name: "Invitada Demo",
            email: "invitada@example.com",
            artistId: 1,
        },
    ],

    evets: [
        {
            id: 1,
            title: 'Baladas y baleros',
            dateISO: '2026-01-03T15:00:00-06:00',
            venue: 'Av Universidad Veracruzana 2919',
            poster: '/home/events/evento1.jpeg', // pon tu poster en /public/eventos/...
            slug: 'baladas-y-baleros',
            registerUrl: '', // o una URL externa si aplica
            isCause: true,
        },
        {
            id: 2,
            title: 'Residencia Creativa',
            dateISO: '2025-11-15T10:00:00-06:00',
            venue: 'Parque Miguel Hidalgo \n  Coatzacoalcos, Ver.',
            poster: '/home/events/evento2.jpeg',
            slug: 'residencia-creativa-otono',
            registerUrl: '/eventos/residencia-creativa-otono/inscripcion',
            isCause: false,
        },
        {
            id: 3,
            title: 'Baladas y baleros',
            dateISO: '2026-01-03T15:00:00-06:00',
            venue: 'Av Universidad Veracruzana 2919',
            poster: '/home/events/evento1.jpeg', // pon tu poster en /public/eventos/...
            slug: 'baladas-y-baleros',
            registerUrl: '', // o una URL externa si aplica
            isCause: true,
        },
        {
            id: 4,
            title: 'Residencia Creativa',
            dateISO: '2025-11-15T10:00:00-06:00',
            venue: 'Parque Miguel Hidalgo \n  Coatzacoalcos, Ver.',
            poster: '/home/events/evento2.jpeg',
            slug: 'residencia-creativa-otono',
            registerUrl: '/eventos/residencia-creativa-otono/inscripcion',
            isCause: false,
        },
        {
            id: 5,
            title: 'Baladas y baleros',
            dateISO: '2026-01-03T15:00:00-06:00',
            venue: 'Av Universidad Veracruzana 2919, Fovissste',
            poster: '/home/events/evento1.jpeg', // pon tu poster en /public/eventos/...
            slug: 'baladas-y-baleros',
            registerUrl: '', // o una URL externa si aplica
            isCause: false,
        },
        {
            id: 6,
            title: 'Residencia Creativa',
            dateISO: '2025-11-15T10:00:00-06:00',
            venue: 'Parque Miguel Hidalgo \n  Coatzacoalcos, Ver.',
            poster: '/home/events/evento2.jpeg',
            slug: 'residencia-creativa-otono',
            registerUrl: '/eventos/residencia-creativa-otono/inscripcion',
            isCause: false,
        },
    ],
    gallery: [
        {
            id: 1,
            type: "image",
            url: "/home/circle-carousel/imagen.jpeg",
            title: "Imagen 1",
            description: "Imagen del carrusel 1",
            isActive: true,
        },
        {
            id: 2,
            type: "image",
            url: "/home/circle-carousel/imagen2.jpeg",
            title: "Imagen 2",
            description: "Imagen del carrusel 2",
            isActive: true,
        },
        {
            id: 3,
            type: "image",
            url: "/home/circle-carousel/imagen3.jpeg",
            title: "Imagen 3",
            description: "Imagen del carrusel 3",
            isActive: true,
        },
        {
            id: 4,
            type: "image",
            url: "/home/circle-carousel/imagen4.jpeg",
            title: "Imagen 4",
            description: "Imagen del carrusel 4",
            isActive: true,
        },
        {
            id: 5,
            type: "image",
            url: "/home/circle-carousel/imagen5.jpeg",
            title: "Imagen 5",
            description: "Imagen del carrusel 5",
            isActive: true,
        },

        // Repetidas si deseas más
        {
            id: 6,
            type: "image",
            url: "/home/circle-carousel/imagen.jpeg",
            title: "Imagen 1 Extra",
            description: "Imagen adicional",
            isActive: true,
        },
        {
            id: 7,
            type: "image",
            url: "/home/circle-carousel/imagen2.jpeg",
            title: "Imagen 2 Extra",
            description: "Imagen adicional",
            isActive: true,
        },
        {
            id: 8,
            type: "image",
            url: "/home/circle-carousel/imagen3.jpeg",
            title: "Imagen 3 Extra",
            description: "Imagen adicional",
            isActive: true,
        },
        {
            id: 9,
            type: "image",
            url: "/home/circle-carousel/imagen4.jpeg",
            title: "Imagen 4 Extra",
            description: "Imagen adicional",
            isActive: true,
        },
        {
            id: 10,
            type: "image",
            url: "/home/circle-carousel/imagen5.jpeg",
            title: "Imagen 5 Extra",
            description: "Imagen adicional",
            isActive: true,
        },
    ]

};

export function dbGetAllArtists() {
    return [...db.artists];
}

export function dbGetArtistById(id) {
    return db.artists.find((artist) => artist.id === Number(id)) || null;
}

export function dbGetArtistBySlug(slug) {
    return db.artists.find((artist) => slugify(artist.name) === slug) || null;
}

export function dbGetAllUsers() {
    return [...db.users];
}

export function dbGetUserById(id) {
    return db.users.find((user) => user.id === Number(id)) || null;
}

export function dbGetCurrentUser() {
    return db.users[0] || null;
}

export function dbGetAllEvents() {
    return [...db.evets];
}

export function dbGetEventById(id) {
    return db.evets.find((event) => event.id === Number(id)) || null;
}

export function dbGetEventByName(name) {
    return db.evets.find((event) => event.name === name) || null;
}

export function dbGetAllGallery() {
    return [...db.gallery];
}

export default db;
