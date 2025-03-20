import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    <>
      <SpeedInsights />
      <ClerkProvider appearance={{ variables: { colorPrimary: "#fbbe28" } }}>
        <html
          lang="pt-BR"
          suppressHydrationWarning
          suppressContentEditableWarning
        >
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
