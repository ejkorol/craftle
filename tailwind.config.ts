import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-karnak)'],
        mono: ['var(--font-mononoki)']
      },
      colors: {
        white: '#FAFAFA'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: '#FAFAFA',
          foreground: '#212121',
          primary: {
            DEFAULT: '#212121',
            foreground: '#FAFAFA'
          }
        }
      }
    }
  })]
};

export default config;
