"use client";

import { useEffect } from "react";

export default function GoogleAdsense() {
  useEffect(() => {
    try {
      // Load Google AdSense script
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1306875437034957";
      script.async = true;
      script.dataset.adSlot = "5557634349";
      script.crossOrigin = "anonymous";
      script.dataset.adClient = "ca-pub-1306875437034957"; // Your AdSense Publisher ID
      document.head.appendChild(script);

      // Initialize ads after script loads
      script.onload = () => {
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          ((window as any).adsbygoogle as any[]).push({});
        }
      };
    } catch (error) {
      console.error("Error loading AdSense:", error);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
