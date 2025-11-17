import { Suspense } from "react";
import ArtistsHeader from "@/features/artists/artists-header/ArtistsHeader";
import ArtistsGrid from "@/features/artists/artists-grid/ArtistsGrid";


const MOCK_ARTISTS = [
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
    },
];

export default function ArtistsPage() {
    return (
        <main style={{ padding: "24px" }}>
            <Suspense fallback={<div>Cargando encabezado...</div>}>
                <ArtistsHeader />
                <ArtistsGrid artists={MOCK_ARTISTS}/>
            </Suspense>
        </main>
    );
}
