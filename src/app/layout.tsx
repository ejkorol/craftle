import type { Metadata } from "next";
import { Providers } from "./providers";
import { inter, mononokiFont, karnakPro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craftle",
  description: "A minimalist Minecraft-themed Wordle-like clone inspired by the New York Times' popular game.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${mononokiFont.variable} ${karnakPro.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
