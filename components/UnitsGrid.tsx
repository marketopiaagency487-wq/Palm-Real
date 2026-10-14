"use client";

import { useEffect, useMemo, useState } from "react";
import { fmt, iso, units, type Dict } from "@/lib/content";
import { EV_FILTER, goToCalc, openModal } from "@/lib/events";

type Filter = "all" | "townhouse" | "villa";

export default function UnitsGrid({ d }: { d: Dict }) {
  const u = d.unitsSec;
  const [filter, setFilter] = useState<Filter>("all");
  const [lowFirst, setLowFirst] = useState(false);

  useEffect(() => {
    const on = (e: Event) => setFilter((e as CustomEvent<{ kind: Filter }>).detail.kind);
    window.addEventListener(EV_FILTER, on);
    return () => window.removeEventListener(EV_FILTER, on);
  }, []);

  const list = useMemo(() => {
    const l = units.filter((x) => filter === "all" || x.kind === filter);
    return lowFirst ? [...l].sort((a, b) => a.price - b.price) : l;
  }, [filter, lowFirst]);

  return (
    <div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {u.filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === f.id ? "bg-gold-light text-ink" : "border border-white/25 text-white/85 hover:border-gold-light"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={() => setLowFirst((v) => !v)} className="text-sm text-white/80 underline decoration-gold-light/70 underline-offset-8 hover:text-gold-light">
          {lowFirst ? u.sortDefault : u.sortLow}
        </button>
      </div>

      {/* Mobile: horizontal snap carousel · Desktop: 3-column grid */}
      <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
        {list.map((x) => (
          <article key={x.id} className="edge flex w-[82%] shrink-0 snap-start flex-col bg-ink-2 md:w-auto">
            <div className="relative h-44 overflow-hidden sm:h-48">
              <img src={x.img} alt={`${x.name} — ${d.locale === "ar" ? "بالم هيلز PX" : "Palm Hills PX"}`} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute end-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-num text-[10px] font-semibold tracking-[0.18em] text-gold-light" dir="ltr">
                {u.kindBadge[x.kind]}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs text-white/60">
                {u.kindLabel[x.kind]} · {u.finishing[x.finishing]}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-white">
                {x.name} — {x.beds} {u.bedsWord}
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-ink p-4 text-sm">
                <div>
                  <dt className="text-[11px] text-white/50">{u.kLand}</dt>
                  <dd className="font-medium text-white">{iso(x.land)} {u.sqm}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-white/50">{u.kBua}</dt>
                  <dd className="font-medium text-white">{x.bua} {u.sqm}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-white/50">{u.kRoof}</dt>
                  <dd className="font-medium text-white">{x.roof} {u.sqm}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-white/50">{u.kFinishing}</dt>
                  <dd className="font-medium text-white">{u.finishing[x.finishing]}</dd>
                </div>
              </dl>
              <p className="mt-5 text-xs text-white/60">{x.priceType === "avg" ? u.avg : u.from}</p>
              <p className="mt-1 flex items-baseline gap-1.5" dir="ltr">
                <span className="font-num text-2xl font-bold text-white sm:text-[26px]">{fmt(x.price)}</span>
                <span className="font-num text-xs font-semibold text-white/60">EGP</span>
              </p>
              <div className="mt-auto flex gap-2 pt-5">
                <button onClick={() => openModal(x.id)} className="flex-1 rounded-full bg-gold-light py-2.5 text-sm font-semibold text-ink transition hover:bg-sand">
                  {u.details}
                </button>
                <button onClick={() => goToCalc(x.id)} className="rounded-full border border-white/25 px-4 py-2.5 text-sm text-white/85 transition hover:border-gold-light">
                  {u.installment}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60 md:hidden">{u.swipe}</p>
    </div>
  );
}
