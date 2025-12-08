import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = {
    title: "CANI",
    description: "Cani Colectivo",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body>
        <ClientProviders>
            {children}
        </ClientProviders>
        </body>
        </html>
    );
}
