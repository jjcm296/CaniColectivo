// app/auth/validar-codigo/page.js
import { Suspense } from "react";
import ValidarCodigoPageClient from "./ValidarCodigoPageClient";

export default function ValidarCodigoPage() {
    return (
        <main className="page-container">
            {/* Suspense para permitir useSearchParams en el client component */}
            <Suspense fallback={null}>
                <ValidarCodigoPageClient />
            </Suspense>
        </main>
    );
}
