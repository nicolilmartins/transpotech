import { Section } from "@/components/ui/section";
import { IconCard } from "@/components/acessorios/icon-card/icon-card";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { acessoriosPage } from "@/sanity/content/pages/acessorios";
import artDocumento from "@/assets/images/stats/card-document.webp";
import artBalanca from "@/assets/images/stats/card-balanca.webp";
import artAlerta from "@/assets/images/stats/card-alerta.webp";
import artPessoa from "@/assets/images/stats/card-person.webp";
import artCadeado from "@/assets/images/stats/card-cadeado.webp";
import artVisibilidade from "@/assets/images/stats/card-visibilidade.webp";

// Ilustração de cada card, na ordem dos cards da definição.
const arts = [artDocumento, artBalanca, artAlerta, artPessoa, artCadeado, artVisibilidade];

type ChallengesContent = SectionContent<typeof acessoriosPage.sections.challenges>;

export function ChallengesSection({ content }: { content: ChallengesContent }) {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          <LineBreaks text={content.title} brClassName="hidden lg:inline" />{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          <LineBreaks text={content.description} brClassName="hidden lg:inline" />
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {content.items.map((item, i) => (
          <IconCard key={item.title} {...item} art={arts[i]} />
        ))}
      </div>
    </Section>
  );
}
