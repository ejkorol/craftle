import type { Metadata } from "next";
import { Providers } from "@/providers/providers";
import { inter, mononokiFont, karnakPro } from "@/utils/fonts";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craftle",
  description: "A minimalist Minecraft-themed Wordle-like clone inspired by the New York Times' popular game.",
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
