import { NextResponse } from 'next/server';
import { prisma } from '@/lib';

// Make sure this route is publicly accessible
export const config = {
  runtime: 'edge',
  regions: ['iad1'],
  // If using Clerk, you can add this to bypass auth for this route
  // skipMiddlewareUrlNormalization: true,
};

// Route to list all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59'
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Falha ao buscar notícias' }, { status: 500 });
  }
}