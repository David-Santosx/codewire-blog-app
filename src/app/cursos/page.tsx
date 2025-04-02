import AppHeader from "../components/header";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Database, Globe, Server, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CursosPage() {
  return (
    <>
      <AppHeader />
      <main className="container mx-auto py-8 px-4 lg:px-[80px] md:px-10 sm:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Cursos de Programação
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expanda seus conhecimentos com nossos cursos selecionados para
              desenvolvedores
            </p>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Aprenda com os melhores</h2>
              <p className="text-muted-foreground">
                Selecionamos os melhores cursos disponíveis para ajudar você a
                se tornar um desenvolvedor completo. Desde fundamentos de
                programação até tecnologias avançadas, temos recomendações para
                todos os níveis.
              </p>
              <p className="text-muted-foreground">
                Todos os cursos foram cuidadosamente avaliados para garantir
                conteúdo de qualidade e relevante para o mercado atual.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent"></div>
                <Image
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Coding"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">
              Cursos Recomendados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Code className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>
                    Aprendendo Javascript do Zero: Manual Completo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="min-h-[80px]">
                    Aprenda JavaScript do zero, dominando conceitos fundamentais
                    como variáveis, funções, objetos e manipulação do DOM.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://go.hotmart.com/K99022839F"
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="w-full">Ver Curso</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Globe className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Curso de Node.js, React e React Native</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="min-h-[80px]">
                    Domine o desenvolvimento full-stack com Node.js no backend, React para web e React Native para aplicativos móveis em um único curso completo.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://go.hotmart.com/Y99022705B"
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="w-full">Ver Curso</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Server className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Carreira de Formação Completa para Desenvolvedor JAVA</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="min-h-[80px]">
                    Formação completa em Java, desde conceitos básicos até desenvolvimento avançado com Spring Boot, microserviços e integração com bancos de dados.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://go.hotmart.com/T99022862I"
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="w-full">Ver Curso</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Database className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>SQL Completo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="min-h-[80px]">
                    Domine bancos de dados relacionais com SQL, desde consultas
                    básicas até otimização de performance.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://www.udemy.com/course/curso-sql-completo-desafios-e-muita-pratica/"
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="w-full">Ver Curso</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Next.js & TypeScript</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="min-h-[80px]">
                    Crie aplicações web modernas com Next.js e TypeScript,
                    explorando SSR, SSG e outras funcionalidades avançadas.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://www.udemy.com/course/nextjs-e-typescript/"
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="w-full">Ver Curso</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Desenvolvimento Full Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="min-h-[80px]">
                    Torne-se um desenvolvedor completo dominando tanto o
                    front-end quanto o back-end com tecnologias modernas.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href="https://www.udemy.com/course/desenvolvimento-web-full-stack/"
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="w-full">Ver Curso</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}