"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface News {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
}

export default function WeeklyArticles({ news }: { news: News[] }) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weeklyArticles = news
    .filter(article => new Date(article.createdAt) >= oneWeekAgo)
    .slice(0, 5);

  const articlesToShow = weeklyArticles.length > 0 
    ? weeklyArticles 
    : news.slice(0, 5);

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Artigos da Semana</h2>
      </div>
      
      <div className="space-y-4 flex flex-col">
        {articlesToShow.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id}>
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-border hover:border-primary">
              <div className="flex">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image || "https://placehold.co/600x400/png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary/10 text-primary text-xs font-medium px-1.5 py-0.5">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-3 flex-1">
                  <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}