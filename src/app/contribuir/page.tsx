'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, Github, Heart, Laptop, Mail, MessageSquare, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/header";
// Add the import at the top of the file
import AppFooter from "../components/footer";

// At the end of your component, before the closing return tag:
export default function ContribuirPage() {
  return (
    <>
      <AppHeader />
      <main className="container mx-auto py-8 px-4 lg:px-[80px] md:px-10 sm:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Contribua com o CodeWire</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Junte-se a mim nessa jornada de aprendizado e compartilhamento de conhecimento
            </p>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Por que contribuir?</h2>
              <p className="text-muted-foreground">
                O CodeWire é um projeto em constante evolução, e sua contribuição pode fazer toda a diferença. Como estudante e desenvolvedor em início de carreira, acredito no poder da colaboração e no compartilhamento de conhecimento.
              </p>
              <p className="text-muted-foreground">
                Seja escrevendo artigos técnicos, sugerindo melhorias no código, ou simplesmente compartilhando suas experiências, sua participação é valiosa para o crescimento desta comunidade.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Colaboração" 
                  width={600} 
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Formas de Contribuir</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Code className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Código</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Contribua com melhorias no código, correções de bugs ou novas funcionalidades. O projeto é open-source e está disponível no GitHub.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Escreva artigos técnicos, tutoriais ou compartilhe suas experiências no mundo da programação para publicação no blog.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Share2 className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Divulgação</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Ajude a divulgar o projeto compartilhando nas redes sociais e indicando para outros desenvolvedores e estudantes.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Entre em Contato</h2>
              <p className="text-muted-foreground">
                Tem uma ideia para compartilhar ou quer saber mais sobre como contribuir? Entre em contato através de um dos canais abaixo.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <Github className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <Link href="https://github.com/David-Santosx" target="_blank" className="text-sm text-muted-foreground hover:text-brand-primary">
                      github.com/David-Santosx
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <Link href="mailto:willians@proton.me" className="text-sm text-muted-foreground hover:text-brand-primary">
                      willians@proton.me
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Inicie uma Issue no GitHub</CardTitle>
                <CardDescription>
                  A maneira mais fácil de contribuir é através das Issues no GitHub
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    As Issues do GitHub são um espaço perfeito para:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Reportar bugs ou problemas</li>
                    <li>Sugerir melhorias no código</li>
                    <li>Propor novas funcionalidades</li>
                    <li>Oferecer contribuições específicas</li>
                  </ul>
                </div>
                
                <Link 
                  href="https://github.com/David-Santosx/codewire-blog-app/issues/new" 
                  target="_blank"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-primary text-black hover:brightness-110 hover:scale-105 transition-all h-10 px-6 py-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Criar uma Issue
                </Link>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="bg-card rounded-lg p-8 text-center space-y-4 shadow-md">
            <div className="flex justify-center space-x-4">
              <Heart className="h-8 w-8 text-brand-primary" />
              <Laptop className="h-8 w-8 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold">Vamos construir algo incrível juntos!</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acredito que o conhecimento compartilhado tem o poder de transformar vidas. Sua contribuição, seja ela qual for, ajudará a criar uma comunidade mais forte e colaborativa.
            </p>
            <div className="pt-4">
              <Link 
                href="https://github.com/David-Santosx/codewire-blog-app" 
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-6 py-2"
              >
                <Github className="h-4 w-4" /> Ver no GitHub
              </Link>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}