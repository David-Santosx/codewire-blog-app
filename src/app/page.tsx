import AppHeader from "./components/header";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import NewsContent from "./components/news-content";

function NewsLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Carregando notícias...</span>
    </div>
  );
}

export const dynamic = 'force-dynamic';

async function getNews() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    
    const apiUrl = `${baseUrl}/api/news`;
    
    console.log("Fetching from URL:", apiUrl); // Debug log
    
    const res = await fetch(apiUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

import AppFooter from "./components/footer";

export default async function Home() {
  const news = await getNews();

  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<NewsLoading />}>
          <NewsContent allNews={news} />
        </Suspense>
      </main>
      <AppFooter />
    </>
  );
}
