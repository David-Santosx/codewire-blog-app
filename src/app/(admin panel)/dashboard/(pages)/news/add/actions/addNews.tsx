import { z } from "zod";

import { formSchema } from "../components/form-news";

type NewsToAdd = z.infer<typeof formSchema>;

const API_URL = "/api/news";

// Função auxiliar para fazer requisições HTTP
async function fetchAPI<T>(endpoint: string, method: string, data?: any): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

// Função principal para adicionar notícias
export default async function addNews(newsToAdd: NewsToAdd) {
  try {
    // Preparar os dados da notícia
    const newsData = {
      title: newsToAdd.title,
      subtitle: newsToAdd.subtitle,
      content: newsToAdd.content,
      category: newsToAdd.category,
      source: newsToAdd.source,
      highlightText: newsToAdd.highlightText,
      isFeatured: newsToAdd.isFeatured,
      createdAt: new Date().toISOString(),
      image: newsToAdd.image ? newsToAdd.image.toString() : "", // Convert image to string
    };

    // Enviar para a API
    return await fetchAPI("/api/news", "POST", newsData);
  } catch (error) {
    console.error("Error adding news:", error);
    throw error;
  }
}