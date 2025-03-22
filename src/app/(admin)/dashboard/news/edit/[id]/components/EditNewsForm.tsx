"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Esquema de validação
const formSchema = z.object({
  title: z.string().min(5, {
    message: "O título deve ter pelo menos 5 caracteres.",
  }),
  subtitle: z.string().optional(),
  content: z.string().min(10, {
    message: "O conteúdo deve ter pelo menos 10 caracteres.",
  }),
  category: z.string().min(1, {
    message: "A categoria é obrigatória.",
  }),
  source: z.string().min(1, {
    message: "A fonte é obrigatória.",
  }),
  image: z.string().url({
    message: "A URL da imagem deve ser válida.",
  }),
  isFeatured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditNewsForm({ news }: { news: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert content to string if it's an object
  const contentValue = typeof news.content === 'object' 
    ? JSON.stringify(news.content) 
    : news.content;

  // Inicializar o formulário com os dados da notícia
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: news.title,
      subtitle: news.subtitle || "",
      content: contentValue,
      category: news.category,
      source: news.source,
      image: news.image,
      isFeatured: news.isFeatured || false,
    },
  });

  // Função para atualizar a notícia
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Convert content back to object if needed
      const contentToSend = values.content;
      
      const response = await fetch(`/api/news/${news.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          content: contentToSend
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao atualizar notícia");
      }
  
      toast.success("Notícia atualizada com sucesso!");
      router.push("/dashboard/news");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar notícia");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isMounted) {
    return <div className="p-8 text-center">Carregando formulário...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da notícia" {...field} />
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
                    <Textarea
                      placeholder="Subtítulo da notícia (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Programação">Programação</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Inteligência Artificial">
                        Inteligência Artificial
                      </SelectItem>
                      <SelectItem value="Web Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Segurança">Segurança</SelectItem>
                      <SelectItem value="Carreira">Carreira</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Input placeholder="Fonte da notícia" {...field} />
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
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="URL da imagem de capa" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira a URL de uma imagem para a capa da notícia
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Destaque</FormLabel>
                    <FormDescription>
                      Marque para exibir esta notícia em destaque na página
                      inicial
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escreva o conteúdo da notícia aqui..."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/news")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}