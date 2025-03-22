'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  category: string;
  createdAt: string;
  source: string;
}

export default function FeaturedNewsSlider({ news }: { news: NewsItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  if (!news.length) return null;

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md border border-border">
      <div className="relative w-full pb-[56.25%]">
        <Image
          src={news[currentIndex].image || "https://placehold.co/600x400/png"}
          alt={news[currentIndex].title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded mb-2">
            {news[currentIndex].category}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {news[currentIndex].title}
          </h2>
          {news[currentIndex].subtitle && (
            <p className="text-white/80 mb-2 line-clamp-2">
              {news[currentIndex].subtitle}
            </p>
          )}
          <div className="flex justify-between items-center text-sm text-white/70">
            <span>
              {new Date(news[currentIndex].createdAt).toLocaleDateString("pt-BR")}
            </span>
            <span>{news[currentIndex].source}</span>
          </div>
        </div>
        
        <Link href={`/news/${news[currentIndex].id}`} className="absolute inset-0" aria-label={`Read ${news[currentIndex].title}`} />
        
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full opacity-70 hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full opacity-70 hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
          {news.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-white/50"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}