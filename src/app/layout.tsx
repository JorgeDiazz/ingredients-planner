import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planificador de Ingredientes",
  description: "Gestiona tu inventario de cocina y lista de compras",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ingredientes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
