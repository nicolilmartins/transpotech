import Image from "next/image";
import type { Article } from "@/data/articles";

export function ArticleCover({ article }: { article: Article }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100">
      <Image
        src={article.image}
        alt={article.title}
        priority
        fill
        sizes="(min-width: 1024px) 960px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
