"use client";

import { createContext, useContext } from "react";
import type { PageContent } from "@/sanity/content/fields";
import type { sharedPage } from "@/sanity/content/pages/shared";

type SharedPageContent = PageContent<typeof sharedPage>;

/** Só as seções lidas por Client Components — vão no payload de toda página. */
export type SharedTexts = Pick<
  SharedPageContent,
  "leadForm" | "newsletter" | "productCard" | "productQuote"
>;

const SharedTextsContext = createContext<SharedTexts | null>(null);

export function SharedTextsProvider({
  texts,
  children,
}: {
  texts: SharedTexts;
  children: React.ReactNode;
}) {
  return (
    <SharedTextsContext.Provider value={texts}>
      {children}
    </SharedTextsContext.Provider>
  );
}

export function useSharedTexts(): SharedTexts {
  const texts = useContext(SharedTextsContext);
  if (!texts) {
    throw new Error("useSharedTexts precisa do SharedTextsProvider (app/layout.tsx).");
  }
  return texts;
}
