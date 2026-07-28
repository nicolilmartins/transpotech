"use client";

import { useQuery } from "@tanstack/react-query";
import { loadCities, type City } from "@/lib/cities";

type UseCitiesState = {
  cities: City[];
  loading: boolean;
};

/**
 * Carrega a lista de municípios sob demanda via TanStack Query. Só dispara o
 * carregamento quando `enabled` fica verdadeiro (ex.: no primeiro foco do
 * campo), para não baixar os dados em páginas que nunca usam o autocomplete.
 * A base é imutável na sessão, então fica em cache sem revalidar.
 */
export function useCities(enabled: boolean): UseCitiesState {
  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: loadCities,
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

  return { cities: data ?? [], loading: isLoading };
}
