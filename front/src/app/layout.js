"use client";

import "./globals.css";
import { FeedbackProvider } from "@/features/ui/feedback-context/FeedbackContext";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import NavBar from "@/features/navigation/NavBar";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <AuthProvider>
                    <FeedbackProvider>
                        <NavBar />
                        {children}
                    </FeedbackProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
