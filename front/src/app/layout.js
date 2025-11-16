import './globals.css';
import NavBar from '../features/navigation/NavBar';

export const metadata = {
    title: 'Artistas',
    description: 'Sitio de artistas y eventos',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body>
        <NavBar />
        <main style={{ padding: '24px' }}>{children}</main>
        </body>
        </html>
    );
}
