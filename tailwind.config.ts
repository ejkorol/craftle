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
        white: '#FAFAFA',
        black: '#212121'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: '#212121',
          foreground: '#FAFAFA',
          primary: {
            DEFAULT: '#FAFAFA',
            foreground: '#212121'
          },
          secondary: {
            DEFAULT: '#424242'
          },
          danger: {
            DEFAULT: '#D14852'
          },
          success: {
            DEFAULT: '#5B8B32'
          }
        }
      },
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
