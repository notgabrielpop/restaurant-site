import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F2A24",
          light: "#1E3D34",
          dark: "#050F0D",
        },
        accent: {
          gold: "#D4AF37",
          goldSoft: "#E4C873",
          pomegranate: "#8C2430",
        },
        surface: {
          elevated: "#152D27",
          card: "#182F28",
          glass: "rgba(10, 24, 20, 0.8)",
        },
        background: {
          base: "#F7F1E7",
          alt: "#FFF9F0",
          dark: "#111111",
        },
        text: {
          primary: "#121212",
          onDark: "#FDF7E9",
          muted: "#6F6F6F",
          accent: "#D4AF37",
        },
        states: {
          success: "#2E7D32",
          error: "#C62828",
          warning: "#F9A825",
          info: "#0277BD",
        },
      },
      fontFamily: {
        forum: ["var(--font-forum)", "Forum", "serif"],
        script: ["var(--font-script)", "Tangerine", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-forum)", "Forum", "serif"],
      },
      boxShadow: {
        soft: "0 12px 30px rgba(0, 0, 0, 0.16)",
        card: "0 24px 50px rgba(0, 0, 0, 0.26)",
      },
      maxWidth: {
        content: "1200px",
        wide: "1440px",
      },
      borderRadius: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        pill: "999px",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37, #E4C873)",
        "hero-overlay":
          "linear-gradient(135deg, rgba(5, 15, 13, 0.85), rgba(10, 38, 32, 0.75))",
        "soft-wave":
          "radial-gradient(120% 80% at 50% 0%, rgba(12, 32, 27, 0.08), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;

