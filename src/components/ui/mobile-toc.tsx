"use client";

import React, { useState } from "react";
import { List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleTOC } from "./article-toc";
import { cn } from "@/lib/utils";

interface MobileTOCProps {
  contentId: string;
}

export function MobileTOC({ contentId }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <List className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={cn(
            "fixed bottom-0 left-0 right-0 h-[70vh] bg-background border-t border-border p-6 transition-transform duration-200",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Sumário</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
            <ArticleTOC contentId={contentId} />
          </div>
        </div>
      </div>
    </>
  );
}