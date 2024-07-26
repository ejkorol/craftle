import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const mononokiFont = localFont({
  src: '../../public/fonts/MononokiNerdFontMono-Regular.ttf',
  variable: '--font-mononoki'
});

export const karnakPro = localFont({
  src: [
    {
      path: '../../public/fonts/KarnakPro-Medium.otf',
      weight: '600'
    },
    {
      path: '../../public/fonts/KarnakPro-Book.otf',
      weight: '500'
    },
    {
      path: '../../public/fonts/KarnakPro-Light.otf',
      weight: '400'
    }
  ],
  variable: '--font-karnak'
});
