import { prisma } from "@/lib";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://code-wire-blog.vercel.app";
  
  // Get all news
  const news = await prisma.news.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
  
  // Dynamic news routes
  const newsRoutes = news.map((item) => ({
    url: `${baseUrl}/news/${item.id}`,
    lastModified: item.updatedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  
  return [...routes, ...newsRoutes];
}