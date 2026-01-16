import type { Metadata } from "next";
import {
  Forum,
  Tangerine,
  Inter,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TransitionWrapper } from "@/components/layout/transition-wrapper";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LoadingScreen } from "@/components/loading-screen";
import { LanguageProvider } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: ["400"],
});

const script = Tangerine({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Monsieur La Doulaise font - loaded via Google Fonts link in head

export const metadata: Metadata = {
  metadataBase: new URL("https://zaitoone.ro"),
  title: {
    default: "Zaitoone | Gusturi libaneze atemporale în București",
    template: "%s | Zaitoone",
  },
  description:
    "Restaurant libanez în București. Mezze autentice, 100% HALAL, evenimente private și cine romantice.",
  openGraph: {
    title: "Zaitoone - Lebanese Dining in Bucharest",
    description:
      "Bucură-te de o experiență culinară libaneză reimaginată, cu ingrediente premium și atmosferă caldă.",
    url: "https://zaitoone.ro",
    siteName: "Zaitoone",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaitoone Restaurant",
    description: "Experiențe libaneze în București",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        suppressHydrationWarning
        className={cn(
          forum.variable,
          script.variable,
          body.variable,
          "bg-[#111111] text-text-onDark font-forum"
        )}
      >
        <LanguageProvider>
          <SmoothScroll>
            <LoadingScreen />
            <CustomCursor />
            <Header />
            <TransitionWrapper>
              <main className="pt-24">{children}</main>
            </TransitionWrapper>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
