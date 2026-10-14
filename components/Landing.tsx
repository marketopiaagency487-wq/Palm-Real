import type { ReactNode } from "react";
import { LEADS_EMAIL, PHONE_DISPLAY, PHONE_TEL, type Dict } from "@/lib/content";
import Header from "@/components/Header";
import ContactOptions from "@/components/ContactOptions";
import UnitsGrid from "@/components/UnitsGrid";
import Calculator from "@/components/Calculator";
import LeadForm from "@/components/LeadForm";
import PriceModal from "@/components/PriceModal";
import Floating from "@/components/Floating";
import Footer from "@/components/Footer";
import { FilterButton, ModalButton, WaButton } from "@/components/Buttons";
import { Waves } from "@/components/Icons";

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";

function Head({ eyebrow, title, text, light = false, className = "" }: { eyebrow: string; title: string; text?: string; light?: boolean; className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="eyebrow text-left" dir="ltr">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-[30px] font-bold leading-[1.35] sm:text-[38px] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      <div className="rule mt-4" />
      {text && <p className={`mt-5 text-[15px] leading-8 ${light ? "text-white/75" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

function Dot({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <li className={`flex items-start gap-2.5 text-[14px] leading-7 ${light ? "text-white/80" : "text-ink/80"}`}>
      <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
      <span>{children}</span>
    </li>
  );
}

export default function Landing({ d }: { d: Dict }) {
  const isAr = d.locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: d.seo.title,
        description: d.seo.description,
        inLanguage: isAr ? "ar-EG" : "en",
        about: { "@type": "Residence", name: "Palm Gardens at PX — Palm Hills" },
      },
      {
        "@type": "FAQPage",
        mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <div dir={d.dir} lang={d.locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header d={d} />

      <main>
        {/* ================= HERO ================= */}
        <section id="top" className="relative isolate overflow-hidden bg-ink">
          <img src="/images/render-4.jpg" alt={isAr ? "تصور معماري لبالم جاردنز PX بالم هيلز" : "Rendering of Palm Gardens at PX, Palm Hills"} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/80 to-ink/95" />
          <div className={`${wrap} grid gap-10 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.3fr_0.85fr] lg:items-center lg:gap-14 lg:pb-20`}>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[12px] text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
                {d.hero.badge}
              </span>
              <p className="eyebrow mt-7 !text-[11px]" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>{d.hero.eyebrow}</p>
              <h1 className="mt-4 font-display text-[44px] font-bold leading-[1.2] text-white sm:text-[60px] lg:text-[66px]">{d.hero.title}</h1>
              <Waves className="mt-2 h-5 w-36 sm:w-44" />
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/80 sm:text-[17px]">
                {d.hero.lead}
                <b className="font-num font-semibold text-white" dir="ltr">{d.hero.fromPrice}</b>
                {d.hero.leadEnd}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#units" className="rounded-full bg-gold-light px-7 py-3 text-[15px] font-semibold text-ink transition hover:bg-sand">{d.hero.ctaPrices}</a>
                <WaButton text={d.contact.waGreeting} source="hero" className="rounded-full border border-white/35 px-7 py-3 text-[15px] font-semibold text-white transition hover:border-gold-light hover:text-gold-light">
                  {d.hero.ctaWhatsapp}
                </WaButton>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-4 sm:gap-0 sm:rounded-none sm:bg-transparent">
                {d.hero.stats.map((s, i) => (
                  <div key={s.label} className={`bg-ink/60 p-4 sm:bg-transparent sm:px-5 sm:py-1 ${i ? "sm:border-s sm:border-white/15" : "sm:ps-0"}`}>
                    <dd className="font-num text-[26px] font-semibold text-gold-light">{s.value}</dd>
                    <dt className="mt-1 text-[12px] text-white/60">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[11px] text-white/45">{d.hero.note}</p>
            </div>

            <div className="rounded-2xl bg-paper p-6 shadow-2xl shadow-black/30 sm:p-7">
              <p className="eyebrow" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>{d.contact.eyebrow}</p>
              <h2 className="mt-2 font-display text-[22px] font-bold leading-snug text-ink">{d.contact.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-muted">{d.contact.text}</p>
              <div className="mt-5">
                <ContactOptions d={d} source="hero_card" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}
        <section id="products" className="bg-paper py-20 sm:py-24">
          <div className={wrap}>
            <Head eyebrow={d.products.eyebrow} title={d.products.title} text={d.products.text} />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {d.products.items.map((p) => (
                <article key={p.name} className="edge flex flex-col bg-white shadow-sm">
                  <img src={p.img} alt={p.alt} loading="lazy" className="h-56 w-full object-cover sm:h-64" />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="eyebrow" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>{p.eyebrow}</p>
                    <h3 className="mt-2 font-num text-xl font-bold tracking-wide text-ink" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>{p.name}</h3>
                    <p className="mt-2 font-display text-lg font-semibold text-ink-2">{p.sub}</p>
                    <div className="rule mt-4" />
                    <p className="mt-4 text-[14px] leading-7 text-muted">{p.text}</p>
                    <ul className="mt-4 space-y-1">
                      {p.bullets.map((b) => (
                        <Dot key={b}>{b}</Dot>
                      ))}
                    </ul>
                    <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-sand pt-5">
                      {p.stats.map((s, i) => (
                        <div key={s.k}>
                          <dt className="text-[11px] text-muted">{s.k}</dt>
                          <dd className={`mt-1 text-sm font-semibold ${i === 0 ? "font-num text-base text-ink" : "text-ink"}`}>{s.v}</dd>
                        </div>
                      ))}
                    </dl>
                    <FilterButton kind={p.filter} className="mt-6 self-end rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-2">
                      {p.cta}
                    </FilterButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= UNITS & PRICES ================= */}
        <section id="units" className="bg-ink py-20 sm:py-24">
          <div className={wrap}>
            <Head eyebrow={d.unitsSec.eyebrow} title={d.unitsSec.title} text={d.unitsSec.text} light />
            <UnitsGrid d={d} />
            <p className="mt-8 text-[12px] leading-6 text-white/55">{d.unitsSec.note}</p>
          </div>
        </section>

        {/* ================= COMPARE ================= */}
        <section id="compare" className="bg-cream py-20 sm:py-24">
          <div className={wrap}>
            <Head eyebrow={d.compare.eyebrow} title={d.compare.title} text={d.compare.text} />
            {/* desktop table */}
            <div className="mt-12 hidden md:block">
              <table className="w-full border-collapse text-start text-[14px]">
                <thead>
                  <tr className="border-b border-sand-2">
                    <th className="w-[22%] pb-4 text-start align-bottom text-[12px] font-normal text-muted">{d.compare.rowLabel}</th>
                    {[d.compare.colA, d.compare.colB].map((c) => (
                      <th key={c.name} className="pb-4 text-start align-bottom">
                        <span className="eyebrow block" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>{c.eyebrow}</span>
                        <span className="mt-2 block font-display text-base font-bold text-ink">{c.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.compare.rows.map((r) => (
                    <tr key={r.k} className="border-b border-sand-2">
                      <td className="py-3.5 text-[12px] text-muted">{r.k}</td>
                      <td className="py-3.5 text-ink">{r.a}</td>
                      <td className="py-3.5 text-ink">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* mobile cards */}
            <div className="mt-10 grid gap-4 md:hidden">
              {(["a", "b"] as const).map((col) => {
                const c = col === "a" ? d.compare.colA : d.compare.colB;
                return (
                  <div key={col} className="edge bg-white p-5 shadow-sm">
                    <p className="eyebrow" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>{c.eyebrow}</p>
                    <p className="mt-1 font-display text-lg font-bold text-ink">{c.name}</p>
                    <dl className="mt-3 divide-y divide-sand">
                      {d.compare.rows.map((r) => (
                        <div key={r.k} className="flex justify-between gap-4 py-2.5 text-[13px]">
                          <dt className="text-muted">{r.k}</dt>
                          <dd className="text-end font-medium text-ink">{r[col]}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <ModalButton className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-2">{d.compare.cta}</ModalButton>
            </div>
          </div>
        </section>

        {/* ================= CALCULATOR ================= */}
        <section id="calc" className="bg-cream pb-20 pt-4 sm:pb-24">
          <div className={wrap}>
            <Head eyebrow={d.calc.eyebrow} title={d.calc.title} text={d.calc.text} />
            <Calculator d={d} />
          </div>
        </section>

        {/* ================= LIFESTYLE ================= */}
        <section className="bg-cream pb-20 pt-4 sm:pb-24">
          <div className={wrap}>
            <Head eyebrow={d.lifestyle.eyebrow} title={d.lifestyle.title} text={d.lifestyle.text} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.lifestyle.items.map((x) => (
                <div key={x.title} className="edge bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink">{x.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-muted">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= NUMBERS ================= */}
        <section className="bg-ink-2 py-20 sm:py-24">
          <div className={wrap}>
            <Head eyebrow={d.numbers.eyebrow} title={d.numbers.title} text={d.numbers.text} light />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {d.numbers.items.map((n) => (
                <div key={n.value} className="border-t border-white/40 pt-5">
                  <p className="font-display text-xl font-bold text-white" dir={isAr ? "rtl" : "ltr"}>{n.value}</p>
                  <p className="mt-2 text-[13px] leading-7 text-white/65">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MASTERPLAN ================= */}
        <section id="masterplan" className="bg-paper py-20 sm:py-24">
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
            <div>
              <Head eyebrow={d.masterplan.eyebrow} title={d.masterplan.title} text={d.masterplan.text} />
              <dl className="mt-8">
                {d.masterplan.rows.map((r) => (
                  <div key={r.k} className="flex items-center justify-between gap-6 border-b border-sand-2 py-3 text-[14px]">
                    <dt className="font-semibold text-ink">{r.k}</dt>
                    <dd className="text-end text-muted">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a href="/images/masterplan.jpg" target="_blank" rel="noopener" className="edge block bg-white shadow-lg shadow-ink/10">
              <img src="/images/masterplan.jpg" alt={d.masterplan.alt} width={1600} height={1264} loading="lazy" className="h-auto w-full object-contain p-2" />
            </a>
          </div>
        </section>

        {/* ================= WHY NOW ================= */}
        <section className="bg-paper pb-20 sm:pb-24">
          <div className={wrap}>
            <Head eyebrow={d.why.eyebrow} title={d.why.title} text={d.why.text} />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {d.why.items.map((w) => (
                <div key={w.title} className="edge flex gap-5 bg-white p-6 shadow-sm">
                  <div className="w-14 shrink-0 text-center">
                    <p className="font-num text-[26px] font-semibold leading-none text-gold">{w.num}</p>
                    <p className="mt-1.5 text-[11px] text-muted">{w.unit}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 text-[14px] leading-7 text-muted">{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DEVELOPER ================= */}
        <section className="bg-ink-2 py-20 sm:py-24">
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
            <div>
              <Head eyebrow={d.developer.eyebrow} title={d.developer.title} text={d.developer.text} light />
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {d.developer.blocks.map((b) => (
                  <div key={b.title}>
                    <h3 className="font-display text-base font-bold text-white">{b.title}</h3>
                    <p className="mt-2 text-[13px] leading-7 text-white/70">{b.text}</p>
                  </div>
                ))}
              </div>
              <ModalButton className="mt-8 rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold-light hover:text-gold-light">{d.developer.cta}</ModalButton>
            </div>
            <div className="edge shadow-xl shadow-black/20">
              <img src="/images/render-5.jpg" alt={d.developer.alt} loading="lazy" className="h-72 w-full object-cover sm:h-[420px]" />
            </div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section id="gallery" className="bg-ink py-20 sm:py-24">
          <div className={wrap}>
            <Head eyebrow={d.gallery.eyebrow} title={d.gallery.title} text={d.gallery.text} light />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {d.gallery.items.map((g) => (
                <a key={g.src} href={g.src} target="_blank" rel="noopener" className="edge block">
                  <img src={g.src} alt={g.alt} loading="lazy" className={`h-36 w-full transition duration-500 hover:scale-105 sm:h-60 ${g.src.includes("masterplan") ? "bg-white object-contain p-1" : "object-cover"}`} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="bg-paper py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Head eyebrow={d.faq.eyebrow} title={d.faq.title} />
            <div className="mt-10 space-y-3">
              {d.faq.items.map((f) => (
                <details key={f.q} className="edge group bg-white shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] text-ink">
                    {f.q}
                    <span className="font-num text-xl leading-none text-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-[14px] leading-7 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LEAD ================= */}
        <section id="lead" className="bg-cream py-20 sm:py-24">
          <div className={`${wrap} grid items-start gap-12 lg:grid-cols-2`}>
            <div>
              <Head eyebrow={d.lead.eyebrow} title={d.lead.title} text={d.lead.text} />
              <ul className="mt-6 space-y-1.5">
                {d.lead.bullets.map((b) => (
                  <Dot key={b}>{b}</Dot>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
                <div>
                  <p className="text-[12px] text-muted">{d.lead.phoneLabel}</p>
                  <a href={`tel:${PHONE_TEL}`} className="mt-1 block font-num text-[28px] font-semibold text-ink" dir="ltr">{PHONE_DISPLAY}</a>
                </div>
                <div>
                  <p className="text-[12px] text-muted">{d.lead.emailLabel}</p>
                  <a href={`mailto:${LEADS_EMAIL}`} className="mt-2 block text-[17px] text-ink underline decoration-ink/40 underline-offset-8" dir="ltr">{LEADS_EMAIL}</a>
                </div>
              </div>
            </div>
            <LeadForm d={d} />
          </div>
        </section>
      </main>

      <Footer d={d} />
      <Floating d={d} />
      <PriceModal d={d} />
    </div>
  );
}
