"use client";

import { useState } from "react";
import { LEADS_EMAIL, PHONE_TEL, waLink, type Dict } from "@/lib/content";
import { track } from "@/lib/events";
import { MailIcon, PhoneIcon, WaIcon } from "@/components/Icons";

/** Interest chips + WhatsApp / call / email, as on the reference contact cards. */
export default function ContactOptions({
  d,
  source,
  extraLine,
  showFine = true,
}: {
  d: Dict;
  source: string;
  extraLine?: string;
  showFine?: boolean;
}) {
  const c = d.contact;
  const [picked, setPicked] = useState<string | null>(null);

  const message = [c.waGreeting, extraLine, picked ? `${c.waInterest} ${picked}` : ""].filter(Boolean).join("\n");
  const mailHref = `mailto:${LEADS_EMAIL}?subject=${encodeURIComponent("Palm Gardens at PX")}&body=${encodeURIComponent(message)}`;

  return (
    <div>
      <p className="mb-2.5 text-sm text-ink/80">{c.interestLabel}</p>
      <div className="grid grid-cols-2 gap-2">
        {c.chips.map((chip) => {
          const on = picked === chip;
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={on}
              onClick={() => setPicked(on ? null : chip)}
              className={`rounded-full border px-3 py-2 text-[13px] transition ${
                on ? "border-ink bg-ink text-white" : "border-sand-2 bg-white text-ink/80 hover:border-gold"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source, interest: picked })}
        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-3.5 font-semibold text-white transition hover:brightness-110"
      >
        <WaIcon /> {c.whatsapp}
      </a>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => track("call_click", { source })}
          className="flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-2"
        >
          <PhoneIcon /> {c.call}
        </a>
        <a
          href={mailHref}
          onClick={() => track("email_click", { source })}
          className="flex items-center justify-center gap-2 rounded-full border border-ink px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
        >
          <MailIcon /> {c.email}
        </a>
      </div>
      {showFine && <p className="mt-3 text-center text-[11px] leading-5 text-muted">{c.fine}</p>}
    </div>
  );
}
