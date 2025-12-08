import ValidarCodigoPageClient from "./ValidarCodigoPageClient";

export default function ValidarCodigoPage({ searchParams }) {
    const emailParam =
        typeof searchParams?.email === "string" ? searchParams.email : "";

    return (
        <main className="page-container">
            <ValidarCodigoPageClient emailParam={emailParam} />
        </main>
    );
}
