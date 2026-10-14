"use client";

import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL, type Dict } from "@/lib/content";
import { openModal, track } from "@/lib/events";
import { CloseIcon, MenuIcon } from "@/components/Icons";

export default function Header({ d }: { d: Dict }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid || open ? "bg-ink/95 shadow-lg shadow-black/10 backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="leading-tight">
          <span className="block whitespace-nowrap font-num text-[12px] font-semibold tracking-[0.18em] text-white sm:text-base sm:tracking-[0.28em]" dir="ltr">
            {d.brand.name}
          </span>
          <span className="block whitespace-nowrap text-[10px] text-gold-light sm:text-[11px]">{d.brand.by}</span>
        </a>

        <nav className="hidden items-center gap-6 text-[13px] text-white/80 xl:flex">
          {d.nav.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-gold-light">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={`tel:${PHONE_TEL}`} onClick={() => track("call_click", { source: "header" })} className="hidden font-num text-sm font-semibold text-white/90 hover:text-gold-light lg:inline" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <a href={d.langSwitch.href} className="hidden rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/90 hover:border-gold-light hover:text-gold-light sm:inline-block">
            {d.langSwitch.label}
          </a>
          <button onClick={() => openModal()} className="whitespace-nowrap rounded-full bg-gold-light px-3.5 py-2 text-[12px] sm:px-4 sm:text-[13px] font-semibold text-ink transition hover:bg-sand">
            {d.ctaNow}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white xl:hidden"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-5 pt-2 xl:hidden">
          {d.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3 text-sm text-white/85">
              {n.label}
            </a>
          ))}
          <div className="mt-3 flex items-center justify-between">
            <a href={`tel:${PHONE_TEL}`} className="font-num text-lg font-semibold text-gold-light" dir="ltr">
              {PHONE_DISPLAY}
            </a>
            <a href={d.langSwitch.href} className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/90">
              {d.langSwitch.label}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
