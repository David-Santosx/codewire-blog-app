import AppHeader from "./components/header";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import NewsContent from "./components/news-content";

// Loading component for news sections
function NewsLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Carregando notícias...</span>
    </div>
  );
}

// Update your getNews function
export const dynamic = 'force-dynamic';

async function getNews() {
  try {
    // Use relative URL instead of absolute URL
    const res = await fetch('/api/news', { 
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Add the import at the top of the file
import AppFooter from "./components/footer";

// At the end of your component, before the closing return tag:
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
