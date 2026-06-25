import type { Metadata } from "next";
import { Mukta_Vaani } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { ScrollReveal } from "@/components/layout/scroll-reveal";

// "Stack Sans Text" — fonte do design original (TPT01 / Figma), carregada
// localmente. O arquivo variável cobre os pesos 400–700 usados nos headings.
const stackSans = localFont({
  src: "../components/ui/Typography/Stack_Sans_Text/StackSansText-VariableFont_wght.ttf",
  variable: "--font-stack-sans",
  weight: "400 700",
  display: "swap",
});

const muktaVaani = Mukta_Vaani({
  variable: "--font-mukta-vaani",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TranspoTech | Empilhadeiras Industriais",
    template: "%s | TranspoTech",
  },
  description:
    "TranspoTech — locação, assistência técnica e venda de empilhadeiras industriais. Representante oficial STILL, Linde e Baoli. 25 anos de mercado, 11 unidades.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://transpotech.com.br"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "TranspoTech",
    title: "TranspoTech | Empilhadeiras Industriais",
    description:
      "Locação, assistência técnica e venda de empilhadeiras industriais. Representante oficial STILL, Linde e Baoli.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${stackSans.variable} ${muktaVaani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-neutral-900">
        <Providers>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
