import { ClerkLoading, SignIn } from "@clerk/nextjs";
import CodeWireLogo from "@/../public/CodeWire.svg";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-br from-zinc-50 to-zinc-200">
      <div className="w-full md:w-1/2 lg:w-1/3 p-6 flex items-center justify-center order-2 md:order-1 relative z-10">
        <div className="w-full max-w-md relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
          
          <ClerkLoading>
            <Card className="w-full p-8 rounded-xl shadow-lg">
              <div className="w-full flex justify-center">
                <Skeleton className="w-1/2 h-10 rounded-xl mb-5" />
              </div>
              <Skeleton className="w-full h-10 rounded-xl" />
              <div>
                <Skeleton className="w-full h-10 rounded-xl mt-20" />
                <Skeleton className="w-full h-10 rounded-xl mt-5" />
              </div>
            </Card>
          </ClerkLoading>
          
          <SignIn appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl rounded-xl p-6 border-0 backdrop-blur-sm bg-white/90",
              formButtonPrimary: "bg-[#fbbe28] text-zinc-900 hover:bg-[#ffd15c] border-none transition-all duration-200 shadow-sm font-medium",
              formFieldInput: "rounded-lg border-zinc-300 focus:border-[#fbbe28] focus:ring-[#fbbe28]/20 transition-all duration-200",
              headerTitle: "text-2xl font-bold text-zinc-900",
              headerSubtitle: "text-zinc-600",
              footerAction: "text-[#fbbe28] hover:text-[#ffd15c] transition-colors font-medium",
              dividerLine: "bg-zinc-200",
              dividerText: "text-zinc-500",
              formFieldLabel: "text-zinc-700 font-medium",
              identityPreviewText: "text-zinc-800",
              identityPreviewEditButton: "text-[#fbbe28] hover:text-[#ffd15c]",
              socialButtonsBlockButton: "border-zinc-300 hover:border-zinc-400 transition-all",
              socialButtonsBlockButtonText: "text-zinc-700 font-medium"
            }
          }} />
        </div>
      </div>
      
      <div className="w-full md:w-1/2 lg:w-2/3 min-h-[30vh] md:h-screen flex flex-col items-center justify-center bg-zinc-900 order-1 md:order-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-80"></div>
        <div className="absolute w-64 h-64 rounded-full bg-[#fbbe28]/10 -top-20 -right-20 blur-3xl"></div>
        <div className="absolute w-96 h-96 rounded-full bg-[#fbbe28]/5 -bottom-40 -left-20 blur-3xl"></div>
        
        <div className="p-8 text-center relative z-10 flex flex-col items-center">
          <div className="mb-6 transform hover:scale-105 transition-transform duration-300 relative flex justify-center">
            <div className="absolute inset-0 bg-[#fbbe28]/10 filter blur-xl rounded-full scale-90 animate-pulse"></div>
            <Image 
              src={CodeWireLogo} 
              alt="CodeWire" 
              width={200} 
              height={200}
              className="max-w-full h-auto drop-shadow-lg relative z-10"
              priority
            />
          </div>
          
          <h2 className="text-white text-2xl md:text-3xl mt-6 font-bold">Bem-vindo ao Painel Administrativo</h2>
          <p className="text-zinc-400 mt-3 max-w-md mx-auto">Gerencie seu conteúdo, monitore estatísticas e muito mais em um só lugar.</p>
          
          <div className="mt-10 flex gap-3 justify-center">
            <div className="w-3 h-3 rounded-full bg-[#fbbe28]/70 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-[#fbbe28]/50 animate-pulse delay-150"></div>
            <div className="w-3 h-3 rounded-full bg-[#fbbe28]/30 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
