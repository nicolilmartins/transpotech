import { Section } from "@/components/ui/section";
import {
  cookiePolicySections,
  cookiePolicyTitle,
  policyIntro,
  type PolicyBlock,
} from "./policy-content.data";

// Corpo da política — mesma tipografia do corpo dos artigos do Portal de
// Conteúdo (texto 16px / 1.7, marcador laranja nos itens), sobre o neutral-50
// das faixas claras secundárias do site. Hierarquia: introdução sem título;
// bloco da Política de Cookies com título maior (h2, text-h4) e seções como
// subtítulos (h3, text-h5) mais próximos entre si, por serem do mesmo bloco.
export function PolicyContent() {
  return (
    <div className="bg-neutral-50">
      {/* pb maior: o footer sobe 24px (-mt-6) sobre o fim da página. */}
      <Section className="pb-24 lg:pb-36">
        <article className="flex w-full max-w-[860px] flex-col gap-5 text-body leading-[1.7] text-neutral-700">
          {policyIntro.map((block) => (
            <PolicyBlockItem key={block.text} block={block} />
          ))}

          <section className="mt-12 flex flex-col gap-5 lg:mt-20">
            <h2 className="font-heading text-h4 font-semibold text-neutral-800">
              {cookiePolicyTitle}
            </h2>
            {cookiePolicySections.map((section) => (
              <section key={section.title} className="flex flex-col gap-5">
                <h3 className="mt-6 font-heading text-h5 font-semibold text-neutral-800 lg:mt-8">
                  {section.title}
                </h3>
                {section.blocks.map((block) => (
                  <PolicyBlockItem key={block.text} block={block} />
                ))}
              </section>
            ))}
          </section>
        </article>
      </Section>
    </div>
  );
}

function PolicyBlockItem({ block }: { block: PolicyBlock }) {
  if (block.type === "paragraph") return <p className="break-words">{block.text}</p>;

  return (
    <ul className="pl-1">
      <li className="flex gap-3">
        <span
          aria-hidden
          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary-500"
        />
        <span className="min-w-0 break-words">{block.text}</span>
      </li>
    </ul>
  );
}
