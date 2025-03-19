import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import AppHeader from "@/app/components/header";
import { Metadata } from "next";

// Add metadata for the not-found page
export const metadata: Metadata = {
  title: "Notícia não encontrada | CodeWire",
  description: "A notícia que você está procurando não existe ou foi removida.",
};

export default function NewsNotFound() {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4 py-10 max-w-md">
          <FileQuestion className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Notícia não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            A notícia que você está procurando não existe ou foi removida.
          </p>
          <Link href="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </div>
      </main>
    </>
  );
}