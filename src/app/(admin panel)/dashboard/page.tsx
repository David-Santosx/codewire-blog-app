"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartArea, ExternalLink, FilePlus2, Newspaper, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalNews: 0,
    featuredNews: 0,
    views: 0,
    recentIncrease: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch news data
        const newsResponse = await fetch("/api/news");
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          
          // Calculate stats
          const totalNews = newsData.length;
          const featuredNews = newsData.filter((news: { isFeatured: any; }) => news.isFeatured).length;
          
          // Get last month's data (simulated)
          const lastMonthDate = new Date();
          lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
          const recentNews = newsData.filter(
            (news: { createdAt: string | number | Date; }) => new Date(news.createdAt) > lastMonthDate
          ).length;
          
          // For views, we could fetch from analytics API if available
          // For now, let's simulate with a calculation based on news count
          const estimatedViews = totalNews * 150 + Math.floor(Math.random() * 500);
          
          setStats({
            totalNews,
            featuredNews,
            views: estimatedViews,
            recentIncrease: recentNews
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Painel de Controle</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Notícias</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalNews}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "..." : `+${stats.recentIncrease} no último mês`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notícias em Destaque</CardTitle>
            <ChartArea className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.featuredNews}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "..." : `${Math.round((stats.featuredNews / stats.totalNews) * 100) || 0}% do total`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações Estimadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "..." : `~${Math.round(stats.views / stats.totalNews)} por notícia`}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Ações Rápidas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/news/add">
            <Button className="w-full bg-[#fbbe28] hover:bg-[#fbbe28]/90 text-zinc-900">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Adicionar Nova Notícia
            </Button>
          </Link>
          <Link href="/dashboard/news">
            <Button variant="outline" className="w-full">
              <Newspaper className="mr-2 h-4 w-4" />
              Gerenciar Notícias
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visualizar Site
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
