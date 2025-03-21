"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTOCProps {
  contentId: string;
  className?: string;
}

export function ArticleTOC({ contentId, className }: ArticleTOCProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return;

    // Extrair todos os cabeçalhos h2, h3, h4
    const headingElements = contentElement.querySelectorAll("h2, h3, h4");
    
    const items: TOCItem[] = Array.from(headingElements).map((element, index) => {
      // Adicionar IDs aos cabeçalhos se não existirem
      if (!element.id) {
        element.id = `heading-${index}`;
      }
      
      return {
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName.substring(1), 10),
      };
    });

    setHeadings(items);

    // Configurar observador de interseção para destacar o cabeçalho ativo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [contentId]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="sticky top-24">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <List className="h-5 w-5" />
          <h3 className="font-medium">Sumário</h3>
        </div>
        <nav className="space-y-1 text-sm">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                heading.level === 2 ? "pl-0" : "",
                heading.level === 3 ? "pl-4" : "",
                heading.level === 4 ? "pl-8" : "",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}