"use client";

import { useRef } from "react";
import Script from "next/script";

export default function CustomAd() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={adContainerRef} className="w-full md:w-[728px] h-[90px]" />
      
      <Script id="ad-options" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : '04647b89bd575eee7e54afa2eb08c4e8',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}
      </Script>
      
      <Script 
        id="ad-invoke"
        src="//www.highperformanceformat.com/04647b89bd575eee7e54afa2eb08c4e8/invoke.js"
        strategy="lazyOnload"
      />
    </>
  );
}