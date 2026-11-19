"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

// Previews da Vercel (*.vercel.app) não carregam o GTM: os cliques do time
// contariam conversões falsas no Ads e no Meta da conta do cliente.
const subscribe = () => () => {};
const isTrackedHost = () => !window.location.hostname.endsWith(".vercel.app");

// Snippet padrão do Google Tag Manager. O id vem de env.gtmId (padrão no código);
// sem id, ou em preview da Vercel, não renderiza nada.
export function GtmScript({ id }: { id: string }) {
  const tracked = useSyncExternalStore(subscribe, isTrackedHost, () => false);
  if (!id || !tracked) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}

export function GtmNoscript({ id }: { id: string }) {
  if (!id) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
