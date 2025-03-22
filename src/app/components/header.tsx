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
import { useEffect, useState } from "react";
import CodeWire from "@/../public/CodeWire.svg";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherInfos {
  currentWeather: number;
  currentLocation: string;
}

interface AdSettings {
  headerAd: {
    imageUrl: string;
    linkUrl: string;
    isActive: boolean;
  };
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
  const [adSettings, setAdSettings] = useState<AdSettings | null>(null);
  const [adLoading, setAdLoading] = useState(true);

  useEffect(() => {
    async function fetchAdSettings() {
      try {
        const response = await fetch("/api/ads");
        if (response.ok) {
          const data = await response.json();
          setAdSettings(data);
        }
      } catch (error) {
        console.error("Erro ao carregar configurações de anúncios:", error);
      } finally {
        setAdLoading(false);
      }
    }

    fetchAdSettings();
  }, []);

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
          console.error("Geolocation error:", error);
          setLoadingState("error");
        }
      );
    } else {
      setLoadingState("error");
    }
  }, []);

  const adImageUrl =
    !adLoading && adSettings?.headerAd?.isActive && adSettings.headerAd.imageUrl
      ? adSettings.headerAd.imageUrl
      : "https://placehold.co/728x90/png";

  const adLinkUrl =
    !adLoading && adSettings?.headerAd?.linkUrl
      ? adSettings.headerAd.linkUrl
      : "#";

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
            src={CodeWire}
            alt="CodeWire"
            width={200}
            height={100}
            className="w-[150px] md:w-[200px] h-auto"
          />
        </Link>
        <div className="w-full md:w-auto overflow-hidden">
          {adLoading ? (
            <div className="w-full md:w-[728px] h-[90px] bg-muted/20 rounded-md animate-pulse flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Link href={adLinkUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src={adImageUrl}
                alt="Anúncio"
                width={728}
                height={90}
                className="w-full md:w-[728px] h-auto md:h-[90px] object-contain mx-auto"
                priority
              />
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="w-full border-b bg-background">
        <div className="container mx-auto lg:px-[80px] md:px-10 sm:px-6 px-4 py-3 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm md:text-base italic text-muted-foreground font-medium mb-3 md:mb-0">
            "Transformando linhas de código em soluções que mudam o mundo"
          </div>
          <nav>
            <ul className="flex space-x-4 font-medium">
              <li>
                <Link href="/cursos" className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
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
