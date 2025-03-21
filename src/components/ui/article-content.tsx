"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ArticleContentProps {
  html: string;
  className?: string;
}

export function ArticleContent({ html, className }: ArticleContentProps) {
  return (
    <div 
      className={cn("prose prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}