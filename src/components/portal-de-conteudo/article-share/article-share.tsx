import { Facebook, Linkedin, Whatsapp, X } from "@/components/ui/icons";
import { env } from "@/lib/env";

// Ícones de compartilhamento. A URL vem de env.siteUrl + caminho do artigo.
// Server Component: os hrefs saem prontos no HTML e o env (que valida com
// zod) não vai para o bundle do cliente.
export function ArticleShare({ title, path }: { title: string; path: string }) {
  const url = new URL(path, env.siteUrl).href;

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Compartilhar no Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: Facebook,
    },
    {
      label: "Compartilhar no LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: Linkedin,
    },
    {
      label: "Compartilhar no WhatsApp",
      href: `https://wa.me/?text=${t}%20${u}`,
      Icon: Whatsapp,
    },
    {
      label: "Compartilhar no X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
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
