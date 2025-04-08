import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function POST(request: Request) {
  try {
    const { newsId, ipAddress } = await request.json();
    
    if (!newsId || !ipAddress) {
      return NextResponse.json({ error: 'ID da notícia e endereço IP são obrigatórios' }, { status: 400 });
    }

    // Check if this IP has already liked this news
    const existingLike = await prisma.like.findUnique({
      where: {
        newsId_ipAddress: {
          newsId,
          ipAddress
        }
      }
    });

    if (existingLike) {
      // If already liked, remove the like
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });

      // Decrement the likes count
      await prisma.news.update({
        where: { id: newsId },
        data: {
          likes: {
            decrement: 1
          }
        }
      });

      return NextResponse.json({ liked: false, likes: await getLikesCount(newsId) });
    } else {
      // If not liked, add a like
      await prisma.like.create({
        data: {
          newsId,
          ipAddress
        }
      });

      // Increment the likes count
      await prisma.news.update({
        where: { id: newsId },
        data: {
          likes: {
            increment: 1
          }
        }
      });

      return NextResponse.json({ liked: true, likes: await getLikesCount(newsId) });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Falha ao processar curtida' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const newsId = url.searchParams.get('newsId');
    const ipAddress = url.searchParams.get('ipAddress');
    
    if (!newsId) {
      return NextResponse.json({ error: 'ID da notícia é obrigatório' }, { status: 400 });
    }

    const likesCount = await getLikesCount(newsId);
    
    // If IP is provided, check if this user has liked the post
    let hasLiked = false;
    if (ipAddress) {
      const like = await prisma.like.findUnique({
        where: {
          newsId_ipAddress: {
            newsId,
            ipAddress
          }
        }
      });
      hasLiked = !!like;
    }

    return NextResponse.json({ likes: likesCount, hasLiked });
  } catch (error) {
    console.error('Error getting likes:', error);
    return NextResponse.json({ error: 'Falha ao obter curtidas' }, { status: 500 });
  }
}

async function getLikesCount(newsId: string): Promise<number> {
  const news = await prisma.news.findUnique({
    where: { id: newsId },
    select: { likes: true }
  });
  
  return news?.likes || 0;
}