"use client";
import { ChartArea, FilePlus2, LogOut, Newspaper, ImageIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useClerk, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Painel de Análise",
    url: "/dashboard",
    icon: ChartArea,
  },
  {
    title: "Nova Notícia",
    url: "/dashboard/news/add",
    icon: FilePlus2,
  },
  {
    title: "Gerenciar Notícias",
    url: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Gerenciar Anúncios",
    url: "/dashboard/ads",
    icon: ImageIcon,
  },
];

export function AppSidebar() {
  const { signOut } = useClerk();
  const pathname = usePathname();

  function getUser() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
      return <Skeleton className="w-[200px] h-[30px]" />;
    }

    if (!user) {
      return <Skeleton className="w-[200px] h-[30px]" />;
    }

    return (
      <div className="flex items-center gap-x-2 p-2">
        <Avatar className="border-2 border-[#fbbe28]">
          <AvatarImage src={user.imageUrl} alt={user.firstName ?? "User"} />
          <AvatarFallback className="bg-zinc-700 text-white">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Label className="font-medium text-white">
            {[user.firstName, user.lastName].filter(Boolean).join(" ")}
          </Label>
          <span className="text-xs text-zinc-400">{user.emailAddresses[0].emailAddress}</span>
        </div>
      </div>
    );
  }

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-zinc-800 bg-zinc-900">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#fbbe28] font-bold">
            CodeWire - Dashboard
          </SidebarGroupLabel>
          <Separator className="my-3 bg-zinc-800" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url}
                        className={`transition-colors duration-200 ${
                          isActive ? "bg-zinc-800 text-[#fbbe28]" : "hover:bg-zinc-800/50 text-white"
                        }`}
                      >
                        <item.icon className={`w-6 h-6 ${isActive ? "text-[#fbbe28]" : "text-white"}`} />
                        <span className={`font-medium ${isActive ? "text-[#fbbe28]" : "text-white"}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="w-full">
        <Separator className="my-3 bg-zinc-800" />
        <SidebarMenu>
          <SidebarMenuItem className="w-full bg-zinc-800 rounded-md flex justify-between items-center px-2">
            {getUser()}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => signOut({ redirectUrl: "/" })}
                    variant={"ghost"}
                    className="text-red-500 hover:text-red-400 hover:bg-zinc-700"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Desconectar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
