"use client";

import getCurrentWeahter from "@/actions/getCurrentWeather";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Info,
  HandHelping,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherInfos {
  currentWeather: number;
  currentLocation: string;
}

type LoadingState = "idle" | "loading" | "loaded" | "error";

export default function AppHeader() {
  const [_, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [currentWeather, setCurrentWeather] = useState<WeatherInfos>({
    currentWeather: 0,
    currentLocation: "",
  });

  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const headerAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoadingState("loading");
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
            const weatherData = await getCurrentWeahter(latitude, longitude);
            setCurrentWeather(weatherData);
            setLoadingState("loaded");
          } catch (error) {
            console.error("Error fetching weather data:", error);
            setLoadingState("error");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingState("error");
        }
      );
    }
  }, []);

  useEffect(() => {
    // Store the current value of the ref in a variable
    const currentRef = headerAdRef.current;
    if (!currentRef) return;

    try {
      // Create the first script element (atOptions)
      const atOptionsScript = document.createElement("script");
      atOptionsScript.type = "text/javascript";
      atOptionsScript.text = `
        atOptions = {
          'key' : '04647b89bd575eee7e54afa2eb08c4e8',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      currentRef.appendChild(atOptionsScript);

      // Create the second script element (invoke.js)
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src =
        "//www.highperformanceformat.com/04647b89bd575eee7e54afa2eb08c4e8/invoke.js";
      invokeScript.async = true;
      invokeScript.crossOrigin = "anonymous"; // Add crossOrigin attribute
      
      // Add error handling for the script
      invokeScript.onerror = (error) => {
        console.error("Error loading ad script:", error);
        // Optionally add a fallback ad or message
      };
      
      currentRef.appendChild(invokeScript);
    } catch (error) {
      console.error("Error setting up ad scripts:", error);
    }

    // Cleanup function
    return () => {
      try {
        // Use the captured ref value instead of headerAdRef.current
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
      } catch (error) {
        console.error("Error cleaning up ad scripts:", error);
      }
    };
  }, []);

  return (
    <header>
      <div className="w-full h-auto min-h-[40px] py-2 text-black flex flex-col sm:flex-row items-center justify-between bg-brand-primary lg:px-[80px] md:px-10 sm:px-6 px-4">
        <div className="flex items-center gap-1 mb-2 sm:mb-0">
          <Label>Temperatura local: </Label>
          {loadingState === "loading" && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <Skeleton className="h-4 w-20" />
            </div>
          )}
          {loadingState === "loaded" && (
            <>
              <Label>{currentWeather.currentWeather}°C</Label>
              <Label> ({currentWeather.currentLocation})</Label>
            </>
          )}
          {loadingState === "error" && (
            <Label className="text-red-500">
              Não foi possível obter os dados
            </Label>
          )}
        </div>
        <div className="flex items-center justify-around">
          <Link
            href={"https://www.instagram.com/leao.willians/"}
            target="_blank"
          >
            <Button
              className="hover:scale-[120%] hover:text-black transition-transform bg-transparent hover:bg-transparent border-none"
              variant={"outline"}
            >
              <Instagram />
            </Button>
          </Link>
          <Link
            href={
              "https://www.linkedin.com/in/david-willians-dos-santos-212932254/"
            }
            target="_blank"
          >
            <Button
              className="hover:scale-[120%] hover:text-black transition-transform bg-transparent hover:bg-transparent border-none"
              variant={"outline"}
            >
              <Linkedin />
            </Button>
          </Link>
          <Link href={"https://github.com/David-Santosx"} target="_blank">
            <Button
              className="hover:scale-[120%] hover:text-black transition-transform bg-transparent hover:bg-transparent border-none"
              variant={"outline"}
            >
              <Github />
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4 lg:px-[80px] md:px-10 sm:px-6 px-4 border-b-2 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href={"/"} className="mb-3 md:mb-0">
          <Image
            src={"/CodeWire.svg"}
            alt="CodeWire"
            width={200}
            height={100}
            className="w-[150px] md:w-[200px] h-auto"
          />
        </Link>
        <div className="w-full md:w-auto overflow-hidden">
          <div className="w-full md:w-[728px] h-[90px] flex items-center justify-center">
            <div ref={headerAdRef} className="w-full h-full"></div>
          </div>
        </div>
      </div>
      {/* Navigation Menu */}
      <div className="w-full border-b bg-background">
        <div className="container mx-auto lg:px-[80px] md:px-10 sm:px-6 px-4 py-3 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm md:text-base italic text-muted-foreground font-medium mb-3 md:mb-0">
            &quot;Transformando linhas de código em soluções que mudam o
            mundo&quot;
          </div>
          <nav>
            <ul className="flex space-x-4 font-medium">
              <li>
                <Link
                  href="/cursos"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                >
                  <BookOpen className="mr-1 h-4 w-4" />
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                >
                  <Info className="h-4 w-4" /> Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contribuir"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-primary text-black hover:brightness-110 hover:scale-105 transition-all h-10 px-4 py-2"
                >
                  <HandHelping className="h-4 w-4" /> Quero contribuir
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
