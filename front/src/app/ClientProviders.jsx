"use client";

import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { FeedbackProvider } from "@/features/ui/feedback-context/FeedbackContext";
import NavBar from "@/features/navigation/NavBar";

export default function ClientProviders({ children }) {
    return (
        <AuthProvider>
            <FeedbackProvider>
                <NavBar />
                {children}
            </FeedbackProvider>
        </AuthProvider>
    );
}
