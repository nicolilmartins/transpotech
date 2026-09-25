// Hooks de módulo do Node para o build-seed importar src/data como no Next:
// resolve o alias "@/", imports sem extensão e transforma imagem importada
// em { src: <caminho absoluto> } para o seed apontar o arquivo a enviar.
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = path.resolve(fileURLToPath(import.meta.url), "../../../src");
const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const CANDIDATES = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

function resolveFile(base) {
  for (const ext of CANDIDATES) {
    const file = base + ext;
    if (existsSync(file) && (ext !== "" || path.extname(file))) return file;
  }
  return null;
}

export async function resolve(specifier, context, next) {
  let base = null;
  if (specifier.startsWith("@/")) base = path.join(SRC, specifier.slice(2));
  else if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
    base = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
  }
  if (base) {
    const file = resolveFile(base);
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (IMAGE.test(url)) {
    const src = JSON.stringify(fileURLToPath(url));
    return {
      format: "module",
      source: `export default { src: ${src}, width: 0, height: 0 };`,
      shortCircuit: true,
    };
  }
  if (url.endsWith(".ts") || url.endsWith(".tsx")) {
    return { ...(await next(url, context)), format: "module-typescript" };
  }
  return next(url, context);
}
