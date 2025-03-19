import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import DashboardHeader from "./components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{
        ["--sidebar-width" as string]: "20rem",
        ["--sidebar-width-mobile" as string]: "20rem",
      }}
      defaultOpen
    >
      <AppSidebar />
      <main className="w-full">
        <DashboardHeader />
        <div className="lg:px-20 px-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
