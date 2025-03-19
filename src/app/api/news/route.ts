import { NextResponse } from 'next/server';
import { prisma } from '@/lib';
import { put, del } from '@vercel/blob';

// Route to list all news
export async function GET() {
  try {
    const news = await prisma.news.findMany();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Falha ao buscar notícias' }, { status: 500 });
  }
}

// Route to add a new news item
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Get file from form data
    const file = formData.get('image') as File;
    let imagePath = '';
    
    if (file) {
      // Upload to Vercel Blob
      const filename = Date.now() + '-' + file.name.replace(/\s/g, '_');
      const blob = await put(filename, file, {
        access: 'public',
      });
      
      // Use the URL provided by Vercel Blob
      imagePath = blob.url;
    }
    
    // Get content as string (HTML)
    const contentHtml = formData.get('content') as string;
    
    // Prepare data for database
    const data = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string || null,
      // Wrap HTML content in a JSON object
      content: { html: contentHtml },
      category: formData.get('category') as string,
      source: formData.get('source') as string || '',
      isFeatured: formData.get('isFeatured') === 'true',
      image: imagePath
    };
    
    // Create news entry in database
    const newNews = await prisma.news.create({
      data
    });
    
    return NextResponse.json(newNews);
  } catch (error) {
    console.error('Error adding news:', error);
    return NextResponse.json({ error: 'Falha ao adicionar notícia' }, { status: 500 });
  }
}

// Route to delete a news item
export async function DELETE(request: Request) {
  try {
    // Parse the request body to get the ID
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID da notícia é obrigatório' }, { status: 400 });
    }

    // First, get the news item to retrieve the image URL
    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json({ error: 'Notícia não encontrada' }, { status: 404 });
    }

    // Delete the news item from the database
    await prisma.news.delete({
      where: { id },
    });
    
    // If the news has an image, delete it from Vercel Blob
    if (news.image && news.image.includes('blob.vercel-storage.com')) {
      try {
        // Extract the blob URL path
        const blobUrl = new URL(news.image);
        const pathname = blobUrl.pathname;
        const blobName = pathname.substring(pathname.lastIndexOf('/') + 1);
        
        // Delete from Vercel Blob
        await del(blobName);
      } catch (deleteError) {
        console.error('Error deleting image from Blob storage:', deleteError);
        // Continue execution even if image deletion fails
      }
    }
    
    return NextResponse.json({ message: 'Notícia excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Falha ao excluir notícia' }, { status: 500 });
  }
}

// Route to edit a news item
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