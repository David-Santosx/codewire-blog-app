"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Instagram, Linkedin, Mail, BookOpen, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CodeWire from "@/../public/CodeWire.svg";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  // Categories from your form schema
  const categories = [
    "Programação",
    "Inteligência Artificial",
    "Desenvolvimento",
    "Carreira Tech",
    "Cloud Computing",
    "Cibersegurança",
    "Hardware",
    "Software"
  ];

  // Handle category selection
  const handleCategoryClick = (category: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-10 pb-6">
      <div className="container mx-auto px-4 lg:px-[80px] md:px-10 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src={CodeWire} alt="CodeWire Logo" width={150} height={40} />
            </Link>
            <p className="text-zinc-400 text-sm">
              Um portal de notícias e artigos sobre tecnologia, programação e inovação.
              Desenvolvido como projeto de estudo e compartilhamento de conhecimento.
            </p>
          </div>

          {/* Links úteis */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-[#fbbe28] transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-zinc-400 hover:text-[#fbbe28] transition-colors">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link href="/contribuir" className="text-zinc-400 hover:text-[#fbbe28] transition-colors">
                  Como Contribuir
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-zinc-400 hover:text-[#fbbe28] transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Categorias</h3>
            <ul className="space-y-2">
              {categories.slice(0, 8).map((category) => (
                <li key={category}>
                  <a 
                    href={`/?category=${encodeURIComponent(category)}`}
                    onClick={(e) => handleCategoryClick(category, e)}
                    className="text-zinc-400 hover:text-[#fbbe28] transition-colors cursor-pointer"
                  >
                    {category}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/" className="text-[#fbbe28] hover:underline text-sm">
                  Ver todas as categorias
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato e Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Contato</h3>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-zinc-400" />
              <a href="mailto:willians.sant@proton.me" className="text-zinc-400 hover:text-[#fbbe28] transition-colors">
                willians.sant@proton.me
              </a>
            </div>
            <div className="space-y-2">
              <h4 className="text-zinc-300 font-medium text-sm">Redes Sociais</h4>
              <div className="flex space-x-2">
                <Link href="https://github.com/David-Santosx/codewire-blog-app" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#fbbe28] hover:bg-zinc-800">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/david-willians-dos-santos-212932254/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#fbbe28] hover:bg-zinc-800">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#fbbe28] hover:bg-zinc-800">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-zinc-300 font-medium text-sm">Documentação</h4>
              <Link href="https://github.com/David-Santosx/codewire-blog-app#readme" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-zinc-400 hover:text-[#fbbe28] border-zinc-700 hover:border-[#fbbe28] hover:bg-zinc-800">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Readme
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-zinc-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
            &copy; {currentYear} CodeWire. Todos os direitos reservados.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-zinc-500 text-sm flex items-center">
              Feito com <Heart className="h-3 w-3 mx-1 text-red-500" /> por 
              <Link href="https://github.com/David-Santosx" target="_blank" rel="noopener noreferrer" className="ml-1 text-[#fbbe28] hover:underline">
                David Santos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}