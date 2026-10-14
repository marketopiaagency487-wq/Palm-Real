"use client";

import { useEffect, useState } from "react";
import { LEADS_EMAIL, PHONE_TEL, waLink, type Dict } from "@/lib/content";
import { track } from "@/lib/events";
import { MailIcon, PhoneIcon, WaIcon } from "@/components/Icons";

const COOKIE_KEY = "pgpx_cookie_ok";

export default function Floating({ d }: { d: Dict }) {
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    try {
      setCookie(localStorage.getItem(COOKIE_KEY) !== "1");
    } catch {
      setCookie(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "1");
    } catch {
      /* storage blocked */
    }
    setCookie(false);
  };

  const btn = "grid h-12 w-12 place-items-center rounded-full shadow-lg shadow-black/20 transition hover:scale-105";

  return (
    <>
      <div className="fixed bottom-5 end-4 z-40 flex flex-col gap-3 sm:end-5">
        <a href={waLink(d.contact.waGreeting)} target="_blank" rel="noopener noreferrer" aria-label={d.contact.whatsapp} onClick={() => track("whatsapp_click", { source: "floating" })} className={`${btn} bg-wa text-white`}>
          <WaIcon className="h-6 w-6" />
        </a>
        <a href={`tel:${PHONE_TEL}`} aria-label={d.contact.call} onClick={() => track("call_click", { source: "floating" })} className={`${btn} bg-ink text-white`}>
          <PhoneIcon className="h-5 w-5" />
        </a>
        <a href={`mailto:${LEADS_EMAIL}`} aria-label={d.contact.email} className={`${btn} bg-white text-ink`}>
          <MailIcon className="h-5 w-5" />
        </a>
      </div>

      {cookie && (
        <div className="fixed inset-x-4 bottom-5 z-50 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-xl bg-ink px-5 py-3.5 text-[13px] text-white/85 shadow-2xl sm:bottom-8">
          <p>{d.cookie.text}</p>
          <button onClick={accept} className="shrink-0 rounded-full bg-gold-light px-5 py-2 text-sm font-semibold text-ink">
            {d.cookie.accept}
          </button>
        </div>
      )}
    </>
  );
}
