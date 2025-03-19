"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
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

export default function MostReadNews({ news }: { news: News[] }) {
  // For demonstration, we'll simulate "most read" by taking the first 5 news items
  // In a real app, you would track views and sort by popularity
  const mostReadNews = news.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Mais Lidas</h2>
      </div>
      
      <div className="space-y-4 flex flex-col">
        {mostReadNews.map((item, index) => (
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
                  <div className="absolute top-0 left-0 bg-background/80 text-foreground font-bold w-6 h-6 flex items-center justify-center">
                    {index + 1}
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