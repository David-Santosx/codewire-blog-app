"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import FeaturedNewsSlider from "./featured-news-slider";
import MostReadNews from "./most-read-news";
import WeeklyArticles from "./weekly-articles";
import { useSearchParams } from "next/navigation";

interface News {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
}

export default function NewsContent({ allNews }: { allNews: News[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const featuredNews = allNews.filter((news) => news.isFeatured).slice(0, 8);

  const sliderNews = featuredNews.slice(0, 3);

  const listNews = featuredNews.slice(3);

  const filteredNews = selectedCategory
    ? allNews.filter((news) => news.category === selectedCategory)
    : allNews;

  const latestNews = [...filteredNews]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8);

  const categories = Array.from(new Set(allNews.map((news) => news.category)));

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* Featured News Section */}
      <section className="lg:px-[80px] md:px-10 sm:px-6 px-4 py-8">
        {selectedCategory && (
          <div className="mb-6 bg-zinc-800/50 p-3 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-white font-medium">Filtrando por: </span>
              <span className="ml-2 bg-[#fbbe28] text-black px-2 py-1 rounded text-sm font-medium">
                {selectedCategory}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCategorySelect(null)}
              className="text-zinc-300 hover:text-white"
            >
              Limpar filtro
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {selectedCategory ? `Notícias: ${selectedCategory}` : "Destaques"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Slider for top 3 featured news - takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            {sliderNews.length > 0 ? (
              <FeaturedNewsSlider
                news={sliderNews.map((news) => ({
                  ...news,
                  source: "default",
                }))}
              />
            ) : (
              <div className="text-center py-10 bg-card rounded-lg shadow border border-border">
                <p className="text-muted-foreground">
                  Nenhuma notícia em destaque disponível no momento.
                </p>
              </div>
            )}
          </div>

          {/* List of other featured news - takes 1/3 of the width on large screens */}
          <div className="space-y-4">
            {listNews.length > 0 ? (
              listNews.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id}>
                  <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border flex h-24 transform hover:-translate-y-1 hover:border-primary">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={news.image || "https://placehold.co/600x400/png"}
                        alt={news.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="p-2 flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-xs font-medium bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                          {news.category}
                        </span>
                        <h3 className="font-bold text-sm mt-1 line-clamp-2 text-card-foreground">
                          {news.title}
                        </h3>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(news.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 bg-card rounded-lg shadow border border-border">
                <p className="text-muted-foreground">
                  Nenhuma notícia adicional disponível.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Separator className="mx-auto w-[90%]" />

      {/* Category Filter Section */}
      <section className="lg:px-[80px] md:px-10 sm:px-6 px-4 py-4 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleCategorySelect(null)}
          >
            Todas
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Latest News Section with Most Read sidebar and Weekly Articles */}
      <section className="lg:px-[80px] md:px-10 sm:px-6 px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {selectedCategory
              ? `Notícias: ${selectedCategory}`
              : "Últimas Notícias"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Latest news grid - takes 3/4 of the width on large screens */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {latestNews.length > 0 ? (
                latestNews.map((news) => (
                  <Link
                    href={`/news/${news.id}`}
                    key={news.id}
                    className="bg-card rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 border border-border h-full transform hover:-translate-y-1 hover:border-primary"
                  >
                    <div className="relative w-full pb-[56.25%]">
                      <Image
                        src={news.image || "https://placehold.co/600x400/png"}
                        alt={news.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-1 rounded">
                          {news.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(news.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm mb-1 line-clamp-2 text-card-foreground">
                        {news.title}
                      </h3>
                      {news.subtitle && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {news.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-10 bg-card rounded-lg shadow border border-border">
                  <p className="text-muted-foreground">
                    {selectedCategory
                      ? `Nenhuma notícia na categoria "${selectedCategory}" disponível.`
                      : "Nenhuma notícia disponível no momento."}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <MostReadNews news={allNews} />
            <WeeklyArticles news={allNews} />
          </div>
        </div>
      </section>
    </>
  );
}