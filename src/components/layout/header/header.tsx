import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo-transpotech.svg";
import arrowDown from "@/assets/icons/arrow-down-s.svg";

type NavItem = { label: string; hasDropdown?: boolean };

const navItems: NavItem[] = [
  { label: "Produtos", hasDropdown: true },
  { label: "Serviços" },
  { label: "Automação" },
  { label: "Empresa", hasDropdown: true },
  { label: "Contato" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-[30px] z-50">
      <div className="mx-auto flex w-[1312px] max-w-[calc(100%-32px)] items-center justify-between rounded-[200px] bg-primary-500/5 py-4 pl-8 pr-4 backdrop-blur-[2px]">
        {/* Esquerda: logo + navegação */}
        <div className="flex items-center gap-20">
          <Link href="/" className="shrink-0">
            <Image
              src={logo}
              alt="TranspoTech"
              priority
              className="h-8 w-[174px]"
            />
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href="#"
                className="flex h-6 items-center justify-center gap-1 px-2 py-1 text-body font-normal text-neutral-800 hover:text-primary-500"
              >
                {item.label}
                {item.hasDropdown && (
                  <Image src={arrowDown} alt="" className="size-5" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Direita: CTAs */}
        <div className="flex items-center gap-2">
          <Button variant="gray" size="lg">
            Calcular orçamento
          </Button>
          <Button variant="primary" size="lg">
            Fale com vendas
          </Button>
        </div>
      </div>
    </header>
  );
}
