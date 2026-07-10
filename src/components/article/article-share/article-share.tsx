"use client";

import { useEffect, useState } from "react";
import { Facebook, Linkedin, Whatsapp, X } from "@/components/ui/icons";

// Ícones de compartilhamento. A URL do artigo é lida no client (window.location),
// então os links de compartilhamento funcionam em qualquer ambiente/domínio.
export function ArticleShare({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const raf = requestAnimationFrame(() => setUrl(window.location.href));
    return () => cancelAnimationFrame(raf);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Compartilhar no Facebook",
      href: url ? `https://www.facebook.com/sharer/sharer.php?u=${u}` : undefined,
      Icon: Facebook,
    },
    {
      label: "Compartilhar no LinkedIn",
      href: url ? `https://www.linkedin.com/sharing/share-offsite/?url=${u}` : undefined,
      Icon: Linkedin,
    },
    {
      label: "Compartilhar no WhatsApp",
      href: url ? `https://wa.me/?text=${t}%20${u}` : undefined,
      Icon: Whatsapp,
    },
    {
      label: "Compartilhar no X",
      href: url ? `https://twitter.com/intent/tweet?url=${u}&text=${t}` : undefined,
      Icon: X,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-primary-500 hover:text-primary-500"
        >
          <Icon className="size-4" aria-hidden />
        </a>
      ))}
    </div>
  );
}
