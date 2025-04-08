"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  newsId: string;
  initialLikes?: number;
}

export function LikeButton({ newsId, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ipAddress, setIpAddress] = useState("");

  // Get IP address and check if user has liked
  useEffect(() => {
    const getIpAndLikeStatus = async () => {
      try {
        // Get IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        setIpAddress(ip);

        // Check if user has liked this post
        const likeResponse = await fetch(`/api/news/like?newsId=${newsId}&ipAddress=${ip}`);
        const likeData = await likeResponse.json();
        
        setLikes(likeData.likes);
        setHasLiked(likeData.hasLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getIpAndLikeStatus();
  }, [newsId]);

  const handleLike = async () => {
    if (isLoading || !ipAddress) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/news/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsId,
          ipAddress,
        }),
      });

      const data = await response.json();
      setLikes(data.likes);
      setHasLiked(data.liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-1 hover:bg-primary/10",
          hasLiked && "text-red-500"
        )}
        onClick={handleLike}
        disabled={isLoading}
      >
        <Heart
          className={cn(
            "h-5 w-5",
            hasLiked && "fill-red-500 text-red-500"
          )}
        />
        <span>{likes}</span>
      </Button>
    </div>
  );
}