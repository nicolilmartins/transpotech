import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { Mukta_Vaani } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { getSiteSettings } from "@/sanity/queries/site-settings";
import { getUnits } from "@/sanity/queries/units";
import { getSharedTexts } from "@/sanity/queries/shared";
import { SharedTextsProvider } from "@/components/layout/shared-texts";

// "Stack Sans Text" — fonte do design original (TPT01 / Figma), carregada
// localmente. O arquivo variável cobre os pesos 400–700 usados nos headings.
// O .woff2 é um subconjunto do .ttf original (125KB → 37KB): Latin-1 (todos os
// acentos do português), pontuação, setas e ≈ ≤ ≥ − € ™. Caractere fora disso
// cai na fonte de fallback. Para regerar com outros caracteres:
//   python -m fontTools.subset StackSansText-VariableFont_wght.ttf --flavor=woff2 --layout-features='*' --unicodes=...
const stackSans = localFont({
  src: "../components/ui/Typography/Stack_Sans_Text/StackSansText-VariableFont_wght.woff2",
  variable: "--font-stack-sans",
  weight: "400 700",
  display: "swap",
});

// 400 e 600 aparecem acima da dobra em todas as páginas (header, hero) e são
// pré-carregados; o 700 só aparece abaixo da dobra (exceto /simular-economia)
// e fica numa segunda instância sem preload. Com Turbopack as duas instâncias
// declaram o mesmo `font-family: Mukta Vaani`, então as @font-face se somam
// numa família só e o CSS resultante é o mesmo de uma instância com os três
// pesos; a variável dela entra no <html> só para garantir que esse CSS seja
// incluído. (Com webpack o nome ganharia hash por instância e o 700 deixaria de
// ser encontrado — aí é voltar para uma instância só.)
const muktaVaani = Mukta_Vaani({
  variable: "--font-mukta-vaani",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const muktaVaaniBold = Mukta_Vaani({
  variable: "--font-mukta-vaani-bold",
  subsets: ["latin"],
  weight: "700",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteSettings();
  return {
    title: {
      default: "TranspoTech | Empilhadeiras Industriais",
      template: "%s | TranspoTech",
    },
    description: seo.description,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://transpotech.com.br"
    ),
    openGraph: {
      ...baseOpenGraph,
      title: "TranspoTech | Empilhadeiras Industriais",
      description: seo.shareDescription,
      ...(seo.shareImage && {
        images: [
          {
            url: seo.shareImage.src,
            width: seo.shareImage.width,
            height: seo.shareImage.height,
            alt: seo.shareImage.alt,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, units, shared] = await Promise.all([
    getSiteSettings(),
    getUnits(),
    getSharedTexts(),
  ]);
  const { leadForm, newsletter, productCard, productQuote } = shared;

  return (
    <html
      lang="pt-BR"
      className={`${stackSans.variable} ${muktaVaani.variable} ${muktaVaaniBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-neutral-900">
        <Providers>
          <SharedTextsProvider
            texts={{ leadForm, newsletter, productCard, productQuote }}
          >
            <Header careersUrl={settings.careersUrl} />
            {children}
            <Footer
              units={units}
              careersUrl={settings.careersUrl}
              social={settings.social}
            />
            <FloatingActions />
            <ScrollReveal />
          </SharedTextsProvider>
        </Providers>
      </body>
    </html>
  );
}
