"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface AdSettings {
  headerAd: {
    imageUrl: string;
    linkUrl: string;
    isActive: boolean;
  }
}

export default function AdsPage() {
  const [settings, setSettings] = useState<AdSettings>({
    headerAd: {
      imageUrl: "",
      linkUrl: "",
      isActive: true
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/ads");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
          setPreviewImage(data.headerAd.imageUrl);
        } else {
          console.log("Nenhuma configuração de anúncio encontrada, usando valores padrão");
        }
      } catch (error) {
        console.error("Erro ao carregar configurações de anúncios:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "headerAd");
        
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error("Falha ao fazer upload da imagem");
        }
        
        const { url } = await uploadResponse.json();
        settings.headerAd.imageUrl = url;
      }
      
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao salvar configurações");
      }
      
      toast.success("Configurações de anúncios salvas com sucesso");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast.error("Erro ao salvar configurações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Gerenciar Anúncios</h1>
        <p className="text-zinc-200">Configure as imagens de anúncios exibidas no site</p>
      </div>
      
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="header">Anúncio do Header (728x90)</TabsTrigger>
          <TabsTrigger value="sidebar" disabled>Anúncio da Sidebar (300x250)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="header">
          <Card>
            <CardHeader>
              <CardTitle>Anúncio do Header</CardTitle>
              <CardDescription>
                Configure o anúncio exibido no topo do site. Tamanho recomendado: 728x90 pixels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="header-active">Status</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="header-active"
                    checked={settings.headerAd.isActive}
                    onChange={(e) => setSettings({
                      ...settings,
                      headerAd: {
                        ...settings.headerAd,
                        isActive: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="header-active" className="text-sm font-normal">
                    Ativar anúncio no header
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="header-image">Imagem do Anúncio</Label>
                <Input
                  id="header-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 2MB.
                </p>
              </div>
              
              {previewImage && (
                <div className="border rounded-md p-2 bg-zinc-800">
                  <p className="text-xs text-muted-foreground mb-2">Pré-visualização:</p>
                  <div className="relative w-full h-[90px] max-w-[728px]">
                    <Image
                      src={previewImage}
                      alt="Pré-visualização do anúncio"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="header-link">Link do Anúncio</Label>
                <Input
                  id="header-link"
                  type="url"
                  placeholder="https://exemplo.com"
                  value={settings.headerAd.linkUrl}
                  onChange={(e) => setSettings({
                    ...settings,
                    headerAd: {
                      ...settings.headerAd,
                      linkUrl: e.target.value
                    }
                  })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-brand-primary text-black hover:bg-brand-primary/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : "Salvar Configurações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}