import type { Metadata } from "next";
import { Geist, Sora, Mukta_Vaani } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// "Stack Sans Text" é uma fonte licenciada do design original (fora do Google Fonts).
// Usamos Sora como fallback fiel para os headings — --font-heading referencia
// var(--font-stack-sans) primeiro, bastando carregá-la nessa variável ao licenciar.
const stackSans = Sora({
  variable: "--font-stack-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      className={`${geistSans.variable} ${stackSans.variable} ${muktaVaani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-neutral-900">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
