import type { Metadata } from "next";
import { Providers } from "@/providers/providers";
import { inter, mononokiFont, karnakPro } from "@/utils/fonts";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craftle",
  description: "A minimalist Minecraft-themed Wordle-like clone inspired by the New York Times' popular game.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["wordle", "minecraft", "craft"],
  authors: [
    { name: "Jason Korol" },
    {
      name: "Jason Korol",
      url: "https://www.linkedin.com/in/ejkorol"
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "apple-touch-icon.png" },
    { rel: "icon", url: "favicon.ico" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${mononokiFont.variable} ${karnakPro.variable}`}>
        <Providers>
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
