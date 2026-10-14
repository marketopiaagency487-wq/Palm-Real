import { Archivo, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";

export const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-kufi",
  display: "swap",
});

export const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVars = `${kufi.variable} ${plex.variable} ${archivo.variable}`;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";
