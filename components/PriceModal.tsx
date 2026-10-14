"use client";

import { useEffect, useRef, useState } from "react";
import { fmt, iso, units, type Dict } from "@/lib/content";
import { EV_MODAL } from "@/lib/events";
import ContactOptions from "@/components/ContactOptions";
import { CloseIcon } from "@/components/Icons";

const AUTO_KEY = "pgpx_popup_seen";

export default function PriceModal({ d }: { d: Dict }) {
  const [open, setOpen] = useState(false);
  const [unitId, setUnitId] = useState<string | undefined>();
  const auto = useRef(false);
  const u = d.unitsSec;
  const unit = units.find((x) => x.id === unitId);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setUnitId((e as CustomEvent<{ unitId?: string }>).detail?.unitId);
      setOpen(true);
    };
    window.addEventListener(EV_MODAL, onOpen);

    // Auto popup once per session: at ~55% scroll or after 16 seconds.
    let seen = false;
    try {
      seen = sessionStorage.getItem(AUTO_KEY) === "1";
    } catch {
      /* storage blocked */
    }
    const fire = () => {
      if (auto.current || seen) return;
      auto.current = true;
      try {
        sessionStorage.setItem(AUTO_KEY, "1");
      } catch {
        /* ignore */
      }
      setUnitId(undefined);
      setOpen(true);
    };
    const timer = window.setTimeout(fire, 16000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.55) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener(EV_MODAL, onOpen);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const specs = unit
    ? [
        [u.kLand, `${iso(unit.land)} ${u.sqm}`],
        [u.kBua, `${unit.bua} ${u.sqm}`],
        [u.kPenthouse, `${unit.penthouse} ${u.sqm}`],
        ...(unit.pergola ? [[u.kPergola, `${unit.pergola} ${u.sqm}`]] : []),
        [u.kRoof, `${unit.roof} ${u.sqm}`],
        [u.kBeds, unit.bedsDetail[d.locale]],
        [u.kExtras, unit.extras[d.locale]],
        [u.kFinishing, u.finishing[unit.finishing]],
      ]
    : [];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px]" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={d.modal.title}>
      <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl sm:p-7" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} aria-label={d.modal.close} className="absolute end-4 top-4 text-ink/50 hover:text-ink">
          <CloseIcon />
        </button>
        <p className="eyebrow" dir="ltr" style={{ textAlign: d.locale === "ar" ? "right" : "left" }}>{d.modal.eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-ink">{unit ? unit.name : d.modal.title}</h3>

        {unit ? (
          <>
            <p className="mt-1 text-sm text-gold">
              {u.kindLabel[unit.kind]} · {unit.priceType === "avg" ? u.avg : u.from}{" "}
              <span className="font-num font-semibold">{fmt(unit.price)}</span> EGP
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-xl bg-white p-4 text-sm ring-1 ring-sand">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] text-muted">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : (
          <p className="mt-3 text-sm leading-7 text-muted">{d.modal.text}</p>
        )}

        <div className="mt-5">
          <ContactOptions d={d} source={unit ? `modal_${unit.id}` : "modal"} extraLine={unit ? unit.name : undefined} />
        </div>
      </div>
    </div>
  );
}
