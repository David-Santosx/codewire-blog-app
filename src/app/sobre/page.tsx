'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, Coffee, Github, Heart, Laptop, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/header";
import AppFooter from "../components/footer";

export default function SobrePage() {
  return (
    <>
      <AppHeader />
      <main className="container mx-auto py-8 px-4 lg:px-[80px] md:px-10 sm:px-6">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Sobre o CodeWire</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Um projeto pessoal desenvolvido com paixão para compartilhar conhecimento e experiências no mundo da programação.
            </p>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">A Jornada</h2>
              <p className="text-muted-foreground">
                O CodeWire é fruto da minha paixão por desenvolvimento web e da vontade de compartilhar conhecimento. Como estudante de Análise e Desenvolvimento de Sistemas na UNIC, aos 18 anos, decidi criar este projeto como forma de documentar minha jornada e contribuir com a comunidade.
              </p>
              <p className="text-muted-foreground">
                Desenvolver este site foi um desafio que me permitiu aplicar conhecimentos de React, Next.js, TypeScript e Tailwind CSS, além de explorar conceitos de design responsivo e experiência do usuário.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
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
            <h2 className="text-3xl font-bold text-center">Desafios e Aprendizados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Code className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Arquitetura Moderna</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Implementar uma arquitetura moderna com Next.js App Router, autenticação com Clerk e banco de dados com Prisma foi um desafio que expandiu meus horizontes técnicos.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Design Responsivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Criar uma experiência consistente em todos os dispositivos foi um aprendizado valioso sobre design responsivo e acessibilidade.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle>Paixão pelo Código</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Cada linha de código deste projeto foi escrita com dedicação, refletindo minha paixão por desenvolvimento e meu sonho de me tornar um desenvolvedor fullstack.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Sobre o Desenvolvedor</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
              Conheça um pouco mais sobre quem está por trás do CodeWire.
            </p>
            
            <div className="grid grid-cols-1 gap-8 mt-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-primary/20">
                  <Image 
                    src="https://github.com/David-Santosx.png" 
                    alt="David Willians" 
                    width={128} 
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">David Santos</h3>
                  <p className="text-muted-foreground">Desenvolvedor & Estudante de ADS</p>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Aos 18 anos, sou estudante de Análise e Desenvolvimento de Sistemas na UNIC. Apaixonado por tecnologia desde cedo, venho construindo minha jornada no desenvolvimento web com foco em tecnologias modernas como React, Next.js e TypeScript. Meu sonho é me tornar um desenvolvedor fullstack e criar soluções que impactem positivamente a vida das pessoas.
                </p>
                <div className="flex space-x-2">
                  <Link href="https://github.com/David-Santosx" target="_blank" className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Propósito do CodeWire</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
              Este projeto nasceu com múltiplos objetivos que se complementam.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Portfólio Pessoal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    O CodeWire serve como uma demonstração prática das minhas habilidades técnicas e criativas, representando meu crescimento como desenvolvedor e minha capacidade de criar aplicações web completas.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Compartilhar Conhecimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Acredito que o conhecimento deve ser acessível. Este blog é um espaço para compartilhar tutoriais, dicas e reflexões sobre programação, especialmente para iniciantes que, como eu, estão construindo seu caminho no mundo do desenvolvimento.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Documentar Aprendizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cada desafio superado durante o desenvolvimento deste projeto representa um aprendizado valioso. Documentar esse processo me ajuda a consolidar conhecimentos e pode inspirar outros estudantes.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Conectar com a Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Busco criar conexões com outros desenvolvedores, trocar experiências e crescer profissionalmente através da colaboração e do feedback da comunidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="bg-card rounded-lg p-8 text-center space-y-4 shadow-md">
            <div className="flex justify-center space-x-4">
              <Coffee className="h-8 w-8 text-brand-primary" />
              <Laptop className="h-8 w-8 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold">Quer fazer parte dessa jornada?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estou sempre aberto a novas conexões, feedback e oportunidades de colaboração. Se você se identifica com minha jornada ou tem interesse em tecnologia, ficarei feliz em conversar!
            </p>
            <div className="pt-4">
              <Link 
                href="/contribuir" 
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-primary text-black hover:brightness-110 hover:scale-105 transition-all h-10 px-6 py-2"
              >
                <Heart className="h-4 w-4" /> Quero contribuir
              </Link>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}