"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { CircleCheck } from "lucide-react";
import {
  cssEase,
  playOnScroll,
  prefersReducedMotion,
  prepareFrom,
  prepareFromEach,
} from "@/lib/motion";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

type AutomationContent = SectionContent<typeof homePage.sections.automation>;

export function AutomationSection({ content }: { content: AutomationContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bulletRefs = useRef<HTMLLIElement[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useNearViewport(sectionRef, () => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const fade = { duration: 0.7, easing: cssEase.power1Out };
    return playOnScroll(section, 0.75, [
      ...prepareFrom(h2Ref.current, { opacity: 0, y: 16 }, fade),
      ...prepareFrom(descRef.current, { opacity: 0, y: 16 }, { ...fade, delay: 0.12 }),
      ...prepareFrom(imageRef.current, { opacity: 0, x: 28 }, { ...fade, delay: 0.16 }),
      ...prepareFromEach(
        bulletRefs.current,
        { opacity: 0, y: 16 },
        { ...fade, delay: 0.24, stagger: 0.09 }
      ),
      ...prepareFrom(buttonRef.current, { opacity: 0, y: 16 }, { ...fade, delay: 0.6 }),
    ]);
  });

  return (
    <Section
      ref={sectionRef}
      data-reveal-skip
      className="flex flex-col items-start"
    >
      {/* overflow-x-clip: a imagem entra com offset x:28 e, até a entrada
          disparar, esse deslocamento alargava a página no mobile */}
      <div className="flex w-full flex-col gap-8 overflow-x-clip lg:flex-row lg:items-center lg:gap-16">
        {/* Coluna de texto */}
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex w-[600px] max-w-full flex-col gap-4">
              <h2
                ref={h2Ref}
                className="w-[542px] max-w-full text-h2 text-neutral-800"
              >
                <span className="font-normal">
                  {content.titleRegular}{" "}
                </span>
                <span className="font-bold text-primary-500">
                  {content.titleAccent}
                </span>
              </h2>
              <p
                ref={descRef}
                className="w-[512px] max-w-full text-body leading-[1.35] text-neutral-600"
              >
                {content.description}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {content.bullets.map(({ label }, i) => (
                <li
                  key={i}
                  ref={(node) => {
                    if (node) bulletRefs.current[i] = node;
                  }}
                  className="flex items-center gap-2"
                >
                  <CircleCheck
                    className="size-5 shrink-0 text-neutral-600"
                    aria-hidden
                  />
                  <span className="text-body leading-[1.35] text-neutral-600">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={buttonRef} className="hidden self-start lg:block">
            <Button variant="primary" size="lg" href={ROUTES.LOCACAO}>
              {content.buttonLabel}
            </Button>
          </div>
        </div>

        {/* Imagem — desliza da direita junto da cascata */}
        <ParallaxFrame
          ref={imageRef}
          className="order-2 min-h-[280px] min-w-0 flex-1 self-stretch rounded-xl lg:order-none lg:min-h-0"
        >
          <Image
            src={content.image}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ParallaxFrame>

        {/* Botão — após a imagem no mobile */}
        <div className="order-3 self-start lg:hidden">
          <Button variant="primary" size="lg" href={ROUTES.LOCACAO}>
            {content.buttonLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}
