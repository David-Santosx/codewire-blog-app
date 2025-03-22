export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EditNewsForm from "./components/EditNewsForm";

// Componente de carregamento
function EditNewsLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Carregando notícia...</span>
    </div>
  );
}

// Buscar notícia pelo ID
async function getNewsById(id: string) {
  try {
    const origin =
      process.env.API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${origin}/api/news/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return null;
  }
}

export default async function EditNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const news = await getNewsById(params.id);

  // Se a notícia não for encontrada, retornar 404
  if (!news) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar Notícia</h1>
        <Link href="/dashboard/news">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista
          </Button>
        </Link>
      </div>
      
      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-6">
          <Suspense fallback={<EditNewsLoading />}>
                      <EditNewsForm news={news} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}