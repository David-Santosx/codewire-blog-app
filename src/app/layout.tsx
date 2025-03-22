import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "CodeWire - Notícias de Tecnologia & Informação",
  description: "Notícias, artigos e tutoriais sobre tecnologia, programação e inovação para desenvolvedores e entusiastas de tecnologia.",
  keywords: "tecnologia, programação, desenvolvimento web, javascript, react, nextjs, inteligência artificial, cloud computing, cibersegurança",
  authors: [{ name: "David Willians", url: "https://github.com/David-Santosx" }],
  creator: "David Willians",
  publisher: "CodeWire",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://code-wire-blog.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "CodeWire - Notícias de Tecnologia & Informação",
    description: "Notícias, artigos e tutoriais sobre tecnologia, programação e inovação para desenvolvedores e entusiastas de tecnologia.",
    siteName: "CodeWire",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeWire - Portal de Tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeWire - Notícias de Tecnologia & Informação",
    description: "Notícias, artigos e tutoriais sobre tecnologia, programação e inovação para desenvolvedores e entusiastas de tecnologia.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon_io/site.webmanifest",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SpeedInsights />
      <Analytics/>
      <ClerkProvider appearance={{ variables: { colorPrimary: "#fbbe28" } }}>
        <html
          lang="pt-BR"
          suppressHydrationWarning
          suppressContentEditableWarning
        >
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
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
