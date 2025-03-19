"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Editor } from "./editor";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const formSchema = z.object({
  title: z
    .string({ message: "É necessário um título" })
    .min(15, "O título deve ter pelo menos 15 caracteres")
    .max(65, "O título não pode exceder 65 caracteres"),
  subtitle: z
    .string()
    .min(15, "O subtítulo deve ter pelo menos 15 caracteres")
    .max(50, "O subtítulo não pode exceder 50 caracteres")
    .optional(),
  source: z
    .string()
    .min(2, "A fonte deve ter pelo menos 2 caracteres")
    .max(50, "A fonte não pode exceder 50 caracteres")
    .optional(),
  content: z
    .string({ required_error: "Digite o conteúdo da notícia" })
    .min(50, "O conteúdo deve ter pelo menos 50 caracteres"),
  category: z.enum(
    [
      "Desenvolvimento",
      "Programação",
      "Inteligência Artificial",
      "Carreira Tech",
      "Cloud Computing",
      "Cibersegurança",
      "Hardware",
      "Software",
      "Inovação",
      "Mercado Tech",
      "DevOps",
      "Mobile",
      "Web",
      "Dados",
      "Outros",
    ],
    {
      required_error: "Selecione uma categoria",
      invalid_type_error: "Categoria inválida",
    }
  ),
  image: z
    .instanceof(File, {
      message: "Por favor, selecione uma imagem principal",
    })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      "Formato de imagem inválido. Use PNG, JPEG ou JPG"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "A imagem não pode exceder 5MB"
    ),
  isFeatured: z.boolean(),
  highlightText: z
    .string({ message: "Digite uma chamada para a notícia" })
    .min(2, "O destaque deve ter pelo menos 2 caracteres")
    .max(20, "O destaque não pode exceder 20 caracteres"),
});

const categories = [
  {
    value: "development",
    label: "Desenvolvimento",
  },
  {
    value: "programming",
    label: "Programação",
  },
  {
    value: "ai",
    label: "Inteligência Artificial",
  },
  {
    value: "techcareer",
    label: "Carreira Tech",
  },
  {
    value: "cloudcomputing",
    label: "Cloud Computing",
  },
  {
    value: "cybersecurity",
    label: "Cibersegurança",
  },
  {
    value: "hardware",
    label: "Hardware",
  },
  {
    value: "software",
    label: "Software",
  },
  {
    value: "innovation",
    label: "Inovação",
  },
  {
    value: "techmarket",
    label: "Mercado Tech",
  },
  {
    value: "devops",
    label: "DevOps",
  },
  {
    value: "mobile",
    label: "Mobile",
  },
  {
    value: "web",
    label: "Web",
  },
  {
    value: "data",
    label: "Dados",
  },
  {
    value: "others",
    label: "Outros",
  },
];

export function NewsAddForm() {
  const [open, setOpen] = useState(false);
  const [_, setCategoryValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "Programação",
      isFeatured: false,
    },
  });

  // Set initial category value based on form default
  React.useEffect(() => {
    const category = categories.find(
      (cat) => cat.label === form.getValues().category
    );
    if (category) {
      setCategoryValue(category.value);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle || "");
      formData.append("source", values.source || "");
      formData.append("content", values.content);
      formData.append("category", values.category);
      formData.append("highlightText", values.highlightText);
      formData.append("isFeatured", String(values.isFeatured));
      formData.append("image", values.image); // Append the image file
  
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add news");
      }
  
      const result = await response.json();
      form.reset();
      // You can add a toast notification here to show success
    } catch (error) {
      console.error("Error submitting form:", error);
      // You can add a toast notification here to show error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        {/* Form header */}
        <div className="border-b pb-4 mb-2">
          <h2 className="text-lg font-medium">Informações Básicas</h2>
          <p className="text-sm text-zinc-500">Preencha os detalhes principais da notícia</p>
        </div>
        
        {/* Title, subtitle, highlight section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 focus-visible:ring-[#fbbe28]"
                    placeholder="Título da Notícia"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtítulo</FormLabel>
                <FormControl>
                  <Input 
                    className="h-12 focus-visible:ring-[#fbbe28]" 
                    placeholder="Subtítulo" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="highlightText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destaque</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 focus-visible:ring-[#fbbe28]"
                    placeholder="Chamada da Notícia"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - metadata */}
          <div className="space-y-6">
            <div className="border-b pb-4 mb-2">
              <h2 className="text-lg font-medium">Metadados</h2>
              <p className="text-sm text-zinc-500">Informações adicionais sobre a notícia</p>
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          className="h-12 w-full justify-between border-zinc-300 focus:ring-[#fbbe28] focus:border-[#fbbe28]"
                          role="combobox"
                          aria-expanded={open}
                          variant="outline"
                        >
                          {field.value || "Selecione uma categoria..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar categoria..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Nenhuma categoria encontrada.
                            </CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  key={category.value}
                                  value={category.value}
                                  onSelect={() => {
                                    setCategoryValue(category.value);
                                    field.onChange(category.label);
                                    setOpen(false);
                                  }}
                                >
                                  {category.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      field.value === category.label
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonte</FormLabel>
                  <FormControl>
                    <Input 
                      className="h-12 focus-visible:ring-[#fbbe28]" 
                      placeholder="Fonte da notícia" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem Principal</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        className="h-12 focus-visible:ring-[#fbbe28]"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />
                      <p className="text-xs text-zinc-500">
                        Formatos aceitos: PNG, JPEG, JPG (máx. 5MB)
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[#fbbe28] data-[state=checked]:border-[#fbbe28]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Destacar notícia</FormLabel>
                    <FormDescription>
                      Se marcado, a notícia será destacada na página inicial.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              className="h-12 w-full bg-[#fbbe28] hover:bg-[#fbbe28]/90 text-zinc-900 font-medium" 
              type="submit"
            >
              Publicar Notícia
            </Button>
          </div>
          
          {/* Right column - content editor */}
          <div className="lg:col-span-2">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-medium">Conteúdo</h2>
              <p className="text-sm text-zinc-500">Escreva o corpo da notícia</p>
            </div>
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      placeholder={"Corpo da Notícia"}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
