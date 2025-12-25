import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

// Import styleConfig with explicit .ts extension for Next.js 16 Turbopack
// eslint-disable-next-line @typescript-eslint/no-require-imports
const styleConfig = require("./styleConfig.ts");
const { backgroundColors, borders, colors } = styleConfig;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css",
  ],
  safelist: [
    "text-[#efb70d]",
    "text-green-600",
    "text-red-600",
    "text-amber-600",
    "text-sky-600",
    "text-rose-600",
    "text-emerald-600",
    "text-purple-600",
    "text-teal-600",
    "text-red-500",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "2xl": "1440px",
      },
      fontFamily: {
        quicksand: ["var(--quicksand-font)", "Quicksand", "sans-serif"],
        pacifico: ["var(--pacifico-font)", "Pacifico", "cursive"],
        bebas: ["var(--bebas-neue-font)"],
        gilroy: ["var(--gilroy-font)"],
        roboto: ["var(--roboto-flex-font)"],
        newave: ["var(--newave-font)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: borders,
      backgroundColor: backgroundColors,
      colors: colors,
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
      boxShadow: {
        button: "0px 4px 8px 0px rgba(0, 0, 0, 0.12)",
        buttonDelete: "0px 20px 40px 0px rgba(0, 0, 0, 0.25)",
        "country-list": "0px 8px 16px 0px #00000014",
      },
      spacing: {
        breakpoint: "1440px",
        "auto-layout-m": "16px",
        "auto-layout-s": "12px",
        margin: "32px",
        "auto-layout-xs": "8px",
        "auto-layout-l": "20px",
      },
      borderRadius: {
        "corner-radius-sm": "4px",
        "corner-radius-xs": "8px",
        "corner-radius-s": "12px",
        "corner-radius-xl": "24px",
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "20px",
        "25xl": "44px",
        sm: "14px",
        inherit: "inherit",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#1A1A1A",
            },
            danger: {
              DEFAULT: "#AC2125",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#000000", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#1A1A1A",
            },
            danger: {
              DEFAULT: "#AC2125",
            },
          },
        },
      },
    }),
    function ({ addVariant }: any) {
      addVariant("country-list", "& > ul.country-list");
      addVariant("country-list-scrollbar", "&::-webkit-scrollbar");
      addVariant("country", "& > li.country");
      addVariant("country-span", "& > li.country span");
      addVariant("country-highlight", "& > li.country.highlight");
      addVariant("country-hover", "& > li.country:hover");
      addVariant("form-control-focus", "& > .form-control:focus");
      addVariant("flag", "& > .flag-dropdown .selected-flag");
      addVariant("flag-arrow", "& > .arrow");
    },
  ],
};
export default config;
