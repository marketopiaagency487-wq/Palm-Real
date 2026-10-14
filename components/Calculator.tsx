"use client";

import { useEffect, useState } from "react";
import { fmt, units, type Dict } from "@/lib/content";
import { EV_CALC, openModal } from "@/lib/events";

const YEARS = 7.5;
const SECOND = 0.05; // fixed 5% after 3 months

export default function Calculator({ d }: { d: Dict }) {
  const c = d.calc;
  const u = d.unitsSec;
  const [unitId, setUnitId] = useState(units[0].id);
  const [down, setDown] = useState(5);
  const [freq, setFreq] = useState<"q" | "m">("q");

  useEffect(() => {
    const on = (e: Event) => setUnitId((e as CustomEvent<{ unitId: string }>).detail.unitId);
    window.addEventListener(EV_CALC, on);
    return () => window.removeEventListener(EV_CALC, on);
  }, []);

  const unit = units.find((x) => x.id === unitId) ?? units[0];
  const price = unit.price;
  const downAmt = Math.round((price * down) / 100);
  const secondAmt = Math.round(price * SECOND);
  const remaining = price - downAmt - secondAmt;
  const count = freq === "q" ? YEARS * 4 : YEARS * 12;
  const inst = Math.round(remaining / count);

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      {/* Controls */}
      <div className="edge bg-white p-6 shadow-sm sm:p-8">
        <label className="block text-sm text-muted" htmlFor="calc-unit">{c.unitLabel}</label>
        <select
          id="calc-unit"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="mt-2 w-full rounded-lg border border-sand-2 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-gold"
        >
          {units.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name} — {x.priceType === "avg" ? u.avg : u.from} {fmt(x.price)}
            </option>
          ))}
        </select>

        <div className="mt-7 flex items-center justify-between text-sm">
          <span className="text-muted">{c.downLabel}</span>
          <span className="font-num text-base font-semibold text-gold">{down}%</span>
        </div>
        <input type="range" min={5} max={30} step={5} value={down} onChange={(e) => setDown(Number(e.target.value))} className="mt-3 w-full" aria-label={c.downLabel} />
        <p className="mt-2 text-[11px] text-muted">{c.downHint}</p>

        <p className="mt-7 text-sm text-muted">{c.freqLabel}</p>
        <div className="mt-3 flex gap-2">
          {(["q", "m"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFreq(f)}
              aria-pressed={freq === f}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${freq === f ? "bg-ink text-white" : "border border-gold/60 text-ink/80"}`}
            >
              {f === "q" ? c.quarterly : c.monthly}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="edge flex flex-col bg-ink-2 p-6 text-white sm:p-8">
        <p className="text-sm text-white/70">
          {unit.name} — {unit.priceType === "avg" ? u.avg : u.from}
        </p>
        <p className="mt-2 flex items-baseline gap-2" dir="ltr">
          <span className="font-num text-3xl font-bold text-gold-light sm:text-4xl">{fmt(price)}</span>
          <span className="font-num text-sm text-white/70">EGP</span>
        </p>
        <div className="rule mt-5 opacity-80" />
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-[11px] text-white/55">{c.down}</dt>
            <dd className="font-num font-semibold" dir="ltr">{fmt(downAmt)}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/55">{c.second}</dt>
            <dd className="font-num font-semibold" dir="ltr">{fmt(secondAmt)}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/55">{c.count}</dt>
            <dd className="font-num font-semibold">{count}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/55">{c.years}</dt>
            <dd className="font-semibold">
              <span className="font-num">{YEARS}</span> {c.yearsWord}
            </dd>
          </div>
        </dl>
        <div className="mt-6 rounded-xl bg-ink p-5">
          <p className="text-sm text-white/70">{freq === "q" ? c.instQuarter : c.instMonth}</p>
          <p className="mt-2 font-num text-3xl font-bold text-gold-light sm:text-4xl" dir="ltr">{fmt(inst)}</p>
          <p className="mt-1 text-xs text-white/55">{c.currency}</p>
        </div>
        <button onClick={() => openModal(unit.id)} className="mt-6 self-start rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-ink transition hover:bg-sand">
          {c.cta}
        </button>
      </div>
    </div>
  );
}
