"use client";

import { useEffect, useRef } from "react";

export default function CustomAd() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the first script element (atOptions)
    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.text = `
      atOptions = {
        'key' : '04647b89bd575eee7e54afa2eb08c4e8',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    
    // Create the second script element (invoke.js)
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "https://www.highperformanceformat.com/04647b89bd575eee7e54afa2eb08c4e8/invoke.js";
    
    // Store a reference to the current value
    const currentRef = adContainerRef.current;
    
    // Append scripts to the container
    if (currentRef) {
      currentRef.appendChild(optionsScript);
      currentRef.appendChild(invokeScript);
    }
    
    // Cleanup function using the stored reference
    return () => {
      if (currentRef) {
        if (optionsScript.parentNode === currentRef) {
          currentRef.removeChild(optionsScript);
        }
        if (invokeScript.parentNode === currentRef) {
          currentRef.removeChild(invokeScript);
        }
      }
    };
  }, []);

  return <div ref={adContainerRef} className="w-full md:w-[728px] h-[90px]" />;
}