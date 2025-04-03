"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../components/news-table/data-table";
import { columns } from "../../components/news-table/columns";
import { deleteNews } from "./actions/deleteNews";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { FilePlus2 } from "lucide-react";

interface News {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteNews = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      const result = await deleteNews(id);
      
      if (result.success) {
        setNews(news.filter(item => item.id !== id));
        toast.success("Notícia excluída com sucesso");
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        
        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error("Falha ao buscar notícias:", err);
        setError("Falha ao carregar notícias. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const tableColumns = columns.map(col => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const news = row.original;
          return (
            <div className="flex gap-2">
              <Link href={`/dashboard/news/edit/${news.id}`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteNews(news.id)}
              >
                Excluir
              </Button>
            </div>
          );
        }
      };
    }
    return col;
  });

  if (loading) {
    return <div className="flex justify-center p-8">Carregando notícias...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Notícias</h1>
        <Link href="/dashboard/news/add">
          <Button className="bg-[#fbbe28] hover:bg-[#fbbe28]/90 text-zinc-900">
            <FilePlus2 className="mr-2 h-4 w-4" />
            Adicionar Notícia
          </Button>
        </Link>
      </div>
      
      {news.length === 0 ? (
        <div className="text-center p-8 border rounded-md">
          <p className="text-lg text-gray-500">Nenhuma notícia encontrada</p>
          <p className="text-sm text-gray-400 mt-2">Clique em &quot;Adicionar Notícia&quot; para criar conteúdo</p>
        </div>
      ) : (
        <DataTable 
          columns={tableColumns as ColumnDef<News, unknown>[]}
          data={news} 
          onDelete={handleDeleteNews}
        />
      )}
    </div>
  );
}