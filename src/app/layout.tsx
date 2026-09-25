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
      className={`${stackSans.variable} ${muktaVaani.variable} h-full antialiased`}
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
