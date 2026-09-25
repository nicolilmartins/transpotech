import type { PageDefinition } from "../fields";
import { homePage } from "./home";
import { locacaoPage } from "./locacao";
import { empilhadeirasNovasPage } from "./empilhadeiras-novas";
import { seminovasPage } from "./seminovas";
import { pneusPage } from "./pneus";
import { bateriasPage } from "./baterias";
import { pecasPage } from "./pecas";
import { servicosPage } from "./servicos";
import { automacaoPage } from "./automacao";
import { quemSomosPage } from "./quem-somos";
import { sustentabilidadePage } from "./sustentabilidade";
import { canalTransparenciaPage } from "./canal-transparencia";
import { ouvidoriaPage } from "./ouvidoria";
import { portalConteudoPage } from "./portal-conteudo";
import { artigoPage } from "./artigo";
import { contatoPage } from "./contato";
import { simularEconomiaPage } from "./simular-economia";
import { sharedPage } from "./shared";

// Uma entrada por página, na ordem do menu "Páginas" do Studio.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- cada página tem seções próprias
export const pages: PageDefinition<any>[] = [
  homePage,
  locacaoPage,
  empilhadeirasNovasPage,
  seminovasPage,
  pneusPage,
  bateriasPage,
  pecasPage,
  servicosPage,
  automacaoPage,
  quemSomosPage,
  sustentabilidadePage,
  canalTransparenciaPage,
  ouvidoriaPage,
  portalConteudoPage,
  artigoPage,
  contatoPage,
  simularEconomiaPage,
  sharedPage,
];
