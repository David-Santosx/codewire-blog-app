"use client";

/**
 * Exclui uma notícia pelo ID
 * @param id O ID da notícia a ser excluída
 * @returns Uma promessa que é resolvida quando a notícia é excluída
 */
export async function deleteNews(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/news", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Erro desconhecido" }));
      throw new Error(errorData.error || `Erro: ${response.status}`);
    }

    return { success: true, message: "Notícia excluída com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    return { success: false, message: "Falha ao excluir notícia. Tente novamente." };
  }
}