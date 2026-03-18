"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // Met à jour l'URL sans recharger toute la page (ex: /eleves?query=momo)
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</div>
      <input
        className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Rechercher par nom ou prénom..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}