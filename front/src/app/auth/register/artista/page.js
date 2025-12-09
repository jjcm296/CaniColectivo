import ArtistRegisterPageClient from "@/features/artists/componensts/register/ArtistRegisterPageClient";

export default function ArtistRegisterPage({ searchParams }) {
    const emailParam = searchParams?.email ?? "";
    const mode = searchParams?.mode === "edit" ? "edit" : "create";

    return <ArtistRegisterPageClient emailParam={emailParam} mode={mode} />;
}
