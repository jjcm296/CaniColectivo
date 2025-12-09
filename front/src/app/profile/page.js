import { Suspense } from "react";
import MyProfilePageClient from "@/app/profile/MyProfilePageClient";

export default function ProfilePage() {
    return (
        <Suspense
            fallback={
                <main className="page-container">
                    <p>Cargando tu perfil...</p>
                </main>
            }
        >
            <MyProfilePageClient />
        </Suspense>
    );
}
