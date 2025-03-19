import { NewsAddForm } from "./components/form-news";

export default function NewsAddPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Nova Notícia</h1>
        <p className="text-zinc-200">Crie e publique uma nova notícia para o blog</p>
      </div>
      
      <div className="rounded-lg shadow-sm border border-zinc-900 p-6">
        <NewsAddForm />
      </div>
    </div>
  );
}
