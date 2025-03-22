import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { del } from '@vercel/blob';

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'public/config/ads.json');
    
    try {
      const fileContent = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(fileContent);
      return NextResponse.json(config);
    } catch (error) {
      const defaultConfig = {
        headerAd: {
          imageUrl: "",
          linkUrl: "",
          isActive: false
        }
      };
      
      await fs.mkdir(path.join(process.cwd(), 'public/config'), { recursive: true });
      
      await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
      
      return NextResponse.json(defaultConfig);
    }
  } catch (error) {
    console.error('Erro ao buscar configurações de anúncios:', error);
    return NextResponse.json({ error: 'Falha ao buscar configurações' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data || !data.headerAd) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    
    const configPath = path.join(process.cwd(), 'public/config/ads.json');
    let previousImageUrl = "";
    
    try {
      const fileContent = await fs.readFile(configPath, 'utf-8');
      const currentConfig = JSON.parse(fileContent);
      previousImageUrl = currentConfig.headerAd.imageUrl;
    } catch (error) {
      console.log('Nenhuma configuração anterior encontrada');
    }
    
    await fs.mkdir(path.join(process.cwd(), 'public/config'), { recursive: true });
    
    await fs.writeFile(configPath, JSON.stringify(data, null, 2));
    
    if (
      previousImageUrl && 
      data.headerAd.imageUrl && 
      previousImageUrl !== data.headerAd.imageUrl && 
      previousImageUrl.includes('blob.vercel-storage.com')
    ) {
      try {
        const blobUrl = new URL(previousImageUrl);
        const pathname = blobUrl.pathname;
        const blobName = pathname.substring(pathname.lastIndexOf('/') + 1);
        
        await del(blobName);
        console.log(`Imagem anterior deletada com sucesso: ${blobName}`);
      } catch (deleteError) {
        console.error('Erro ao deletar imagem anterior:', deleteError);
      }
    }
    
    return NextResponse.json({ message: 'Configurações salvas com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar configurações de anúncios:', error);
    return NextResponse.json({ error: 'Falha ao salvar configurações' }, { status: 500 });
  }
}