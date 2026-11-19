"use client";

import { useEffect } from "react";

// Chat da Hi Platform (dtbot). O dtbot.js cria e dimensiona o iframe, então o
// tamanho, o z-index e as cores vêm do widget e ficam fora dos tokens do site
// de propósito. O token é público (identifica o bot no navegador).
const CHAT_SRC =
  "https://cdn-bot.hiplatform.com/dtbot.js?token=0f341fb1-e1b8-4703-b02d-556fefdd1029" +
  "&widget=true&tab=true&from=bottomright&widgetType=circle" +
  "&text=Posso%20te%20ajudar%3F&textcolor=ffffff&bgcolor=eb8125";

// Mesmo id da tag do container do GTM (que também carrega o chat no window.onload).
const SCRIPT_ID = "dtbot-script";

// Carrega o chat só se o container do GTM não o carregou: a tag do container
// roda no window.onload, então esperamos um instante depois dele para ver se
// ela já injetou o script. Assim o chat sobe uma vez só, com ou sem a tag.
export function ChatWidget() {
  useEffect(() => {
    let timer: number | undefined;
    const loadIfMissing = () => {
      const hiBot = (window as unknown as { HiBot?: unknown }).HiBot;
      if (document.getElementById(SCRIPT_ID) || hiBot !== undefined) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = CHAT_SRC;
      script.async = true;
      document.body.appendChild(script);
    };
    const onLoad = () => {
      timer = window.setTimeout(loadIfMissing, 1500);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
