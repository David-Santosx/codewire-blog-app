import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeWire - Notícias de Tecnologia & Informação",
  description: "Notícias, artigos e tutoriais sobre tecnologia e informação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
