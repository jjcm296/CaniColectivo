'use client'
import "./globals.css";
import { FeedbackProvider } from "@/features/ui/feedback-context/FeedbackContext";
import NavBar from "@/features/navigation/NavBar";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <NavBar />
                <FeedbackProvider>
                    {children}
                </FeedbackProvider>
            </body>
        </html>
    );
}
