import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }
    
    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Tipo de arquivo inválido' }, { status: 400 });
    }
    
    // Validar tamanho do arquivo (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Arquivo muito grande (máximo 2MB)' }, { status: 400 });
    }
    
    // Gerar nome de arquivo único
    const extension = file.name.split('.').pop();
    const fileName = `${type}-${uuidv4()}.${extension}`;
    
    // Fazer upload para o Vercel Blob Storage
    const blob = await put(fileName, file, {
      access: 'public',
    });
    
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Erro ao fazer upload de arquivo:', error);
    return NextResponse.json({ error: 'Falha ao fazer upload de arquivo' }, { status: 500 });
  }
}