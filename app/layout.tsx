import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Inteligencia Artificial y Automatización para Profesionales",
  description: "Domina la IA y automatización: Desde cero hasta construir y vender tu solución. Aprende con un sistema de personalización con IA adaptado a tu proyecto específico.",
  keywords: ["IA", "Inteligencia Artificial", "Automatización", "Curso", "LatAm", "Profesionales"],
  openGraph: {
    title: "Inteligencia Artificial y Automatización para Profesionales",
    description: "Domina la IA y automatización: Desde cero hasta construir y vender tu solución",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
