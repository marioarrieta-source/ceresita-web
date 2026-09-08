import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Ceresita Perú — Colores que hacen bien",
    template: "%s · Ceresita Perú",
  },
  description:
    "Explora más de 1500 colores de tintometría Ceresita, imagínalos en tu casa con el simulador de pintado y encuentra el producto y el punto de venta ideal.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-PE"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
