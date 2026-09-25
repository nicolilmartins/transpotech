import { cache } from "react";
import { sharedPage } from "../content/pages/shared";
import { getPage } from "./pages";

// Vários componentes da mesma página leem estes textos: uma busca por renderização.
export const getSharedTexts = cache(() => getPage(sharedPage));
