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
    invokeScript.src = "//www.highperformanceformat.com/04647b89bd575eee7e54afa2eb08c4e8/invoke.js";
    
    // Append scripts to the container
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(optionsScript);
      adContainerRef.current.appendChild(invokeScript);
    }
    
    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        if (optionsScript.parentNode === adContainerRef.current) {
          adContainerRef.current.removeChild(optionsScript);
        }
        if (invokeScript.parentNode === adContainerRef.current) {
          adContainerRef.current.removeChild(invokeScript);
        }
      }
    };
  }, []);

  return <div ref={adContainerRef} className="w-full md:w-[728px] h-[90px]" />;
}