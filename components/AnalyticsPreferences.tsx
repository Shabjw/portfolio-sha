"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readAnalyticsExclusion, setAnalyticsExclusion } from "@/lib/analytics-preferences";

export function AnalyticsPreferences() {
  const [excluded, setExcluded] = useState<boolean | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { setExcluded(readAnalyticsExclusion()); }, []);

  function update(exclude: boolean) {
    const saved = setAnalyticsExclusion(exclude);
    setError(!saved);
    if (saved) setExcluded(exclude);
  }

  return <main className="min-h-svh bg-[#f7efe2] px-6 py-16 text-[#20354d]">
    <div className="mx-auto max-w-lg">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Retour au portfolio</Link>
      <h1 className="mt-8 font-serif text-3xl">Mes visites dans les statistiques</h1>
      <p className="mt-5 leading-7">Ce r&eacute;glage s&apos;applique uniquement &agrave; ce navigateur. Active-le aussi sur ton t&eacute;l&eacute;phone si tu ne veux pas compter tes propres visites.</p>
      <p role="status" className="mt-7 min-h-24 rounded-md border border-[#b89c7e80] bg-[#fffaf0] p-5 leading-7">
        {excluded === null ? "Lecture du r\u00e9glage..." : excluded ? "Tes visites sont exclues sur ce navigateur." : "Tes visites peuvent \u00eatre compt\u00e9es sur ce navigateur."}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" disabled={excluded === null} onClick={() => update(true)} className="min-h-11 rounded-md bg-[#243a4d] px-5 py-3 text-sm text-[#fff8ea] disabled:opacity-50">Exclure mes visites</button>
        <button type="button" disabled={excluded === null} onClick={() => update(false)} className="min-h-11 rounded-md border border-[#b89c7e80] px-5 py-3 text-sm disabled:opacity-50">Compter mes visites</button>
      </div>
      {error ? <p role="alert" className="mt-5 leading-7 text-[#8f4031]">Le navigateur bloque l&apos;enregistrement de ce r&eacute;glage. Tu peux ouvrir le portfolio avec <code>?analytics=off</code> pour exclure la visite en cours.</p> : null}
      <p className="mt-6 text-sm leading-6 text-[#53606b]">Cette page de r&eacute;glage n&apos;est jamais compt&eacute;e. Effacer les donn&eacute;es du navigateur ou utiliser la navigation priv&eacute;e r&eacute;initialise ce choix.</p>
    </div>
  </main>;
}
