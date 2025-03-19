import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CircleHelp, Anchor } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <>
      <header className="w-full px-4 py-5 flex flex-col space-y-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex lg:space-x-4 space-x-1 items-center">
            <SidebarTrigger/>
            <h1 className="leading-7">Dashboard</h1>
          </div>
          <nav>
            <ul className="w-full flex lg:gap-x-4 gap-x-1 items-center">
              <li>
                <Link href={"/"}>
                  <Button variant={"outline"}>
                    <Anchor /> Site
                  </Button>
                </Link>
              </li>
              <li>
                <Link target="_blank" href={"https://github.com/David-Santosx/codewire-blog-app?tab=readme-ov-file#readme"}>
                  <Button variant={"outline"}>
                    <CircleHelp /> Guia
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Separator />
      </header>
    </>
  );
}
