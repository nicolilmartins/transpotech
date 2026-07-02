import { Section } from "@/components/ui/section";

const segments = [
  "E-commerce e omnichannel",
  "Indústria de alimentos e bebidas",
  "Farmacêutico e saúde",
  "Cosméticos e personal care",
  "Auto-peças e industrial",
  "Têxtil e moda",
  "Eletrônicos e bens de consumo",
  "Operadores logísticos (3PL)",
];

export function SegmentsSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      <div className="flex flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Segmentos
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Operações que automatizamos
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Adaptamos a solução ao perfil do seu negócio.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {segments.map((segment) => (
          <li
            key={segment}
            className="flex items-center rounded-xl bg-neutral-50 px-5 py-5 text-body font-semibold text-neutral-800"
          >
            {segment}
          </li>
        ))}
      </ul>
    </Section>
  );
}
