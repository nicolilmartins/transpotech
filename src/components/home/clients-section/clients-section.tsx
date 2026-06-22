import Image from "next/image";
import logo1 from "@/assets/images/clients/logo1.svg";
import logo2 from "@/assets/images/clients/logo2.svg";
import logo3 from "@/assets/images/clients/logo3.svg";
import logo4 from "@/assets/images/clients/logo4.svg";
import logo5 from "@/assets/images/clients/logo5.svg";

// 7 posições na faixa (logos placeholder "Logoipsum", intercambiáveis)
const logos = [logo1, logo2, logo3, logo4, logo5, logo1, logo2];

export function ClientsSection() {
  return (
    <section className="flex flex-col items-center gap-8 py-16">
      <p className="text-center font-heading text-[18px] font-normal leading-[1.3] text-neutral-800">
        Empresas que confiam na TranspoTech
      </p>

      <div className="relative flex h-[109px] w-full items-center gap-[90px] overflow-hidden">
        {logos.map((src, i) => (
          <Image key={i} src={src} alt="" className="h-9 w-auto shrink-0" />
        ))}

        {/* Fades nas bordas */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[247px] bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[247px] bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
