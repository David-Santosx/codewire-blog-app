import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppHeader from "@/app/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import AppFooter from "@/app/components/footer";
import { ArticleContent } from "@/components/ui/article-content";
import { ArticleTOC } from "@/components/ui/article-toc";
import { MobileTOC } from "@/components/ui/mobile-toc";

// Loading component
function NewsLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Carregando notícia...</span>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch news data
  const news = await getNewsById(params.id);
  
  // If news not found, return default metadata
  if (!news) {
    return {
      title: "Notícia não encontrada | CodeWire",
      description: "A notícia que você está procurando não existe ou foi removida.",
    };
  }
  
  // Create a clean description from the content (remove HTML tags)
  const contentText = news.content?.html 
    ? news.content.html.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
    : "Leia esta notícia completa no CodeWire, seu portal de tecnologia e programação.";

  // Format date for structured data
  const formattedDate = new Date(news.createdAt).toISOString();
  
  return {
    title: `${news.title} | CodeWire`,
    description: news.subtitle || contentText,
    keywords: [news.category, "notícias", "tecnologia", "codewire", ...news.title.split(" ")],
    openGraph: {
      title: news.title,
      description: news.subtitle || contentText,
      images: [
        {
          url: news.image || "https://placehold.co/1200x630/png",
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
      type: "article",
      publishedTime: news.createdAt,
      authors: ["David Santos"],
      tags: [news.category],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.subtitle || contentText,
      images: [news.image || "https://placehold.co/1200x630/png"],
    },
  };
}

// Fetch a single news article by ID
async function getNewsById(id: string) {
  try {
    const origin =
      process.env.API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${origin}/api/news/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

// Fetch related news (same category)
async function getRelatedNews(category: string, currentId: string) {
  try {
    const origin =
      process.env.API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${origin}/api/news`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const allNews = await response.json();
    return allNews
      .filter(
        (news: any) => news.category === category && news.id !== currentId
      )
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related news:", error);
    return [];
  }
}

// Fetch a random news article (different from current)
async function getRandomNews(currentId: string) {
  try {
    const origin =
      process.env.API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${origin}/api/news`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const allNews = await response.json();
    const filteredNews = allNews.filter((news: any) => news.id !== currentId);
    
    // Get random article
    if (filteredNews.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredNews.length);
      return filteredNews[randomIndex];
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching random news:", error);
    return null;
  }
}

// News content component
function NewsArticle({ news, relatedNews, nextArticle }: { 
  news: any; 
  relatedNews: any[];
  nextArticle: any | null;
}) {
  // Format date
  const formattedDate = new Date(news.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Estimate reading time (1 min per 200 words)
  const contentText = news.content?.html || "";
  const wordCount = contentText.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="max-w-screen-xl mx-auto">
      {/* Back button */}
      <div className="flex justify-between items-center py-4 px-4 md:px-8 lg:px-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Article header */}
      <header className="px-4 md:px-8 lg:px-12 py-6">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
              {news.category}
            </span>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readingTime} min de leitura</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {news.title}
          </h1>
          {news.subtitle && (
            <p className="text-lg text-muted-foreground">{news.subtitle}</p>
          )}

          {/* Author information */}
          <div className="flex items-center mt-4 pt-4 border-t border-border">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage
                  src="https://github.com/David-Santosx.png"
                  alt="David Santos"
                />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Postado por
                </div>
                <p className="font-medium">David Santos</p>
                <p className="text-sm text-muted-foreground">
                  Desenvolvedor Web
                </p>
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Link
                href="https://www.linkedin.com/in/david-willians-dos-santos-212932254/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/David-Santosx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] mb-8">
        <Image
          src={news.image || "https://placehold.co/1200x800/png"}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article content */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        {/* Featured image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={news.image || "https://placehold.co/1200x630/png"}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content with sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <div id="article-content" className="max-w-3xl">
              <ArticleContent 
                html={news.content?.html || ""} 
                className="mb-8"
              />
              
              {/* Source */}
              <div className="text-sm text-muted-foreground mt-8 pt-4 border-t border-border">
                <span className="font-medium">Fonte:</span> {news.source}
              </div>
            </div>
          </div>
          
          {/* Sidebar with TOC */}
          <div className="hidden lg:block">
            <ArticleTOC contentId="article-content" />
          </div>
        </div>
      </div>

      {/* Continue Reading section */}
      {nextArticle && (
        <div className="mt-12 border-t border-border pt-8 px-4 md:px-8 lg:px-12">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            Continue Lendo <ArrowRight className="ml-2 h-4 w-4" />
          </h3>
          <Link href={`/news/${nextArticle.id}`} className="block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 hover:bg-accent/50 p-4 rounded-lg transition-colors my-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={nextArticle.image || "https://placehold.co/600x400/png"}
                  alt={nextArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                  {nextArticle.category}
                </span>
                <h4 className="text-lg font-bold">{nextArticle.title}</h4>
                {nextArticle.subtitle && (
                  <p className="text-muted-foreground line-clamp-2">
                    {nextArticle.subtitle}
                  </p>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(nextArticle.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Related news */}
      {relatedNews.length > 0 && (
        <div className="mt-12 px-4 md:px-8 lg:px-12 py-6 bg-muted">
          <h2 className="text-xl font-bold mb-6">Notícias relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedNews.map((relatedItem) => (
              <Link
                href={`/news/${relatedItem.id}`}
                key={relatedItem.id}
                className="bg-card rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 border border-border h-full transform hover:-translate-y-1 hover:border-primary"
              >
                <div className="relative w-full pb-[56.25%]">
                  <Image
                    src={
                      relatedItem.image || "https://placehold.co/600x400/png"
                    }
                    alt={relatedItem.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-1 rounded">
                      {relatedItem.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(relatedItem.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-1 line-clamp-2 text-card-foreground">
                    {relatedItem.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default async function NewsPage({
  params,
}: {
  params: { id: string };
}) {
  const news = await getNewsById(params.id);

  // If news not found, return 404
  if (!news) {
    notFound();
  }

  // Get related news
  const relatedNews = await getRelatedNews(news.category, news.id);
  
  // Get random article for "Continue Reading"
  const nextArticle = await getRandomNews(params.id);

  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-background pt-4">
        <Suspense fallback={<NewsLoading />}>
          <NewsArticle news={news} relatedNews={relatedNews} nextArticle={nextArticle} />
        </Suspense>
      </main>
      <AppFooter />
    </>
  );
}