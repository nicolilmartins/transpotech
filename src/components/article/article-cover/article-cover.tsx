import Image from "next/image";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import type { Article } from "@/data/articles";

export function ArticleCover({ article }: { article: Article }) {
  return (
    <ParallaxFrame className="aspect-[16/9] w-full rounded-2xl bg-neutral-100">
      <Image
        src={article.image}
        alt={article.title}
        priority
        fill
        sizes="(min-width: 1024px) 960px, 100vw"
        className="object-cover"
      />
    </ParallaxFrame>
  );
}
