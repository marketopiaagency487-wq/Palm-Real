"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/lib/content";
import { track } from "@/lib/events";
import ContactOptions from "@/components/ContactOptions";

type Status = "idle" | "sending" | "ok" | "error";

export default function LeadForm({ d }: { d: Dict }) {
  const l = d.lead;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        setStatus("ok");
        track("form_submit", { source: "lead_section" });
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-lg border border-sand-2 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold";

  return (
    <div className="edge bg-white p-6 shadow-sm sm:p-7">
      <form onSubmit={onSubmit} className="grid gap-3">
        <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""} />
        <input type="hidden" name="subject" value={`New lead | Palm Gardens at PX | ${d.locale.toUpperCase()}`} />
        <input type="hidden" name="from_name" value="Palm Gardens at PX landing page" />
        <input type="hidden" name="page_language" value={d.locale} />
        <label className="hidden" aria-hidden="true">
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" required autoComplete="name" placeholder={l.name} aria-label={l.name} className={input} />
          <input name="phone" type="tel" required inputMode="tel" autoComplete="tel" pattern="[+0-9 ]{8,16}" placeholder={l.phone} aria-label={l.phone} dir="ltr" className={`${input} ${d.locale === "ar" ? "text-right" : ""}`} />
        </div>
        <button type="submit" disabled={status === "sending"} className="rounded-full bg-gold-light py-3 text-sm font-semibold text-ink transition hover:bg-sand disabled:opacity-60">
          {status === "sending" ? l.sending : l.submit}
        </button>
        {status === "ok" && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">{l.success}</p>}
        {status === "error" && <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-800">{l.error}</p>}
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-sand" />
        {l.or}
        <span className="h-px flex-1 bg-sand" />
      </div>
      <ContactOptions d={d} source="lead_section" />
    </div>
  );
}
