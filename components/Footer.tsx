"use client";

import { useState } from "react";
import { LEADS_EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink, type Dict } from "@/lib/content";
import { CloseIcon } from "@/components/Icons";

type Doc = "about" | "privacy" | "disclaimer";

export default function Footer({ d }: { d: Dict }) {
  const [doc, setDoc] = useState<Doc | null>(null);
  const f = d.footer;

  return (
    <footer className="bg-ink pb-24 pt-14 text-white/70 sm:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-num text-lg font-semibold tracking-[0.28em] text-white" dir="ltr" style={{ textAlign: d.locale === "ar" ? "right" : "left" }}>{d.brand.name}</p>
            <p className="mt-2 text-sm text-gold-light">{d.brand.by}</p>
            <p className="mt-4 text-sm">{f.address}</p>
          </div>
          <div className="text-sm">
            <p className="text-white/45">{f.contactTitle}</p>
            <a href={`tel:${PHONE_TEL}`} className="mt-3 block font-num text-lg font-semibold text-white" dir="ltr">{PHONE_DISPLAY}</a>
            <a href={waLink(d.contact.waGreeting)} target="_blank" rel="noopener noreferrer" className="mt-2 block hover:text-gold-light">{f.whatsapp}</a>
            <a href={`mailto:${LEADS_EMAIL}`} className="mt-1 block hover:text-gold-light">{LEADS_EMAIL}</a>
          </div>
          <div className="text-sm">
            <p className="text-white/45">{f.linksTitle}</p>
            <ul className="mt-3 space-y-2">
              {f.links.map((l) => (
                <li key={l.id}>
                  <button onClick={() => setDoc(l.id)} className="hover:text-gold-light">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
        <p className="text-[12px] leading-6 text-white/50">{f.disclaimer}</p>
        <p className="mt-4 text-[12px] text-white/45">© {new Date().getFullYear()} {f.copy}</p>
      </div>

      {doc && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4" onClick={() => setDoc(null)} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-lg rounded-2xl bg-paper p-7 text-ink" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDoc(null)} aria-label={d.modal.close} className="absolute end-4 top-4 text-ink/50 hover:text-ink">
              <CloseIcon />
            </button>
            <h3 className="font-display text-xl font-bold">{f.links.find((l) => l.id === doc)?.label}</h3>
            <p className="mt-4 text-sm leading-7 text-ink/80">{d.legal[doc]}</p>
          </div>
        </div>
      )}
    </footer>
  );
}
