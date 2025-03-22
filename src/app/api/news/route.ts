import { NextResponse } from 'next/server';
import { prisma } from '@/lib';
import { put, del } from '@vercel/blob';

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(news, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Falha ao buscar notícias' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('image') as File;
    let imagePath = '';
    
    if (file) {
      const filename = Date.now() + '-' + file.name.replace(/\s/g, '_');
      const blob = await put(filename, file, {
        access: 'public',
      });
      
      imagePath = blob.url;
    }
    
    const contentHtml = formData.get('content') as string;
    
    const data = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string || null,
      content: { html: contentHtml },
      category: formData.get('category') as string,
      source: formData.get('source') as string || '',
      isFeatured: formData.get('isFeatured') === 'true',
      image: imagePath
    };
    
    const newNews = await prisma.news.create({
      data
    });
    
    return NextResponse.json(newNews);
  } catch (error) {
    console.error('Error adding news:', error);
    return NextResponse.json({ error: 'Falha ao adicionar notícia' }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID da notícia é obrigatório' }, { status: 400 });
    }

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json({ error: 'Notícia não encontrada' }, { status: 404 });
    }

    await prisma.news.delete({
      where: { id },
    });
    
    if (news.image && news.image.includes('blob.vercel-storage.com')) {
      try {
        const blobUrl = new URL(news.image);
        const pathname = blobUrl.pathname;
        const blobName = pathname.substring(pathname.lastIndexOf('/') + 1);
        
        await del(blobName);
      } catch (deleteError) {
        console.error('Error deleting image from Blob storage:', deleteError);
      }
    }
    
    return NextResponse.json({ message: 'Notícia excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Falha ao excluir notícia' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    const updatedNews = await prisma.news.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Falha ao atualizar notícia' }, { status: 500 });
  }
}