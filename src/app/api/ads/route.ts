import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { del } from '@vercel/blob';

// Rota para obter as configurações de anúncios
export async function GET() {
  try {
    // Verificar se existe um arquivo de configuração
    const configPath = path.join(process.cwd(), 'public/config/ads.json');
    
    try {
      const fileContent = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(fileContent);
      return NextResponse.json(config);
    } catch (error) {
      // Se o arquivo não existir, retornar configuração padrão
      const defaultConfig = {
        headerAd: {
          imageUrl: "",
          linkUrl: "",
          isActive: false
        }
      };
      
      // Garantir que o diretório existe
      await fs.mkdir(path.join(process.cwd(), 'public/config'), { recursive: true });
      
      // Criar arquivo com configuração padrão
      await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
      
      return NextResponse.json(defaultConfig);
    }
  } catch (error) {
    console.error('Erro ao buscar configurações de anúncios:', error);
    return NextResponse.json({ error: 'Falha ao buscar configurações' }, { status: 500 });
  }
}

// Rota para salvar as configurações de anúncios
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validar dados
    if (!data || !data.headerAd) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    
    // Obter configurações atuais para comparar
    const configPath = path.join(process.cwd(), 'public/config/ads.json');
    let previousImageUrl = "";
    
    try {
      const fileContent = await fs.readFile(configPath, 'utf-8');
      const currentConfig = JSON.parse(fileContent);
      previousImageUrl = currentConfig.headerAd.imageUrl;
    } catch (error) {
      // Se o arquivo não existir, não há imagem anterior para deletar
      console.log('Nenhuma configuração anterior encontrada');
    }
    
    // Salvar configurações no arquivo
    // Garantir que o diretório existe
    await fs.mkdir(path.join(process.cwd(), 'public/config'), { recursive: true });
    
    // Salvar configurações
    await fs.writeFile(configPath, JSON.stringify(data, null, 2));
    
    // Deletar imagem anterior se houver uma nova imagem e a URL anterior for diferente
    if (
      previousImageUrl && 
      data.headerAd.imageUrl && 
      previousImageUrl !== data.headerAd.imageUrl && 
      previousImageUrl.includes('blob.vercel-storage.com')
    ) {
      try {
        // Extract the blob URL path
        const blobUrl = new URL(previousImageUrl);
        const pathname = blobUrl.pathname;
        const blobName = pathname.substring(pathname.lastIndexOf('/') + 1);
        
        // Delete from Vercel Blob
        await del(blobName);
        console.log(`Imagem anterior deletada com sucesso: ${blobName}`);
      } catch (deleteError) {
        console.error('Erro ao deletar imagem anterior:', deleteError);
        // Continue execution even if image deletion fails
      }
    }
    
    return NextResponse.json({ message: 'Configurações salvas com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar configurações de anúncios:', error);
    return NextResponse.json({ error: 'Falha ao salvar configurações' }, { status: 500 });
  }
}