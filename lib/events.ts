"use client";

// Tiny event bus so separate client islands can talk without a global store.
export const EV_MODAL = "px:modal"; // detail: { unitId?: string }
export const EV_CALC = "px:calc"; // detail: { unitId: string }
export const EV_FILTER = "px:filter"; // detail: { kind: "all" | "townhouse" | "villa" }

export function emit(name: string, detail: unknown = {}) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export const openModal = (unitId?: string) => emit(EV_MODAL, { unitId });

export function goToCalc(unitId: string) {
  emit(EV_CALC, { unitId });
  document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" });
}

export function filterUnits(kind: "all" | "townhouse" | "villa") {
  emit(EV_FILTER, { kind });
  document.getElementById("units")?.scrollIntoView({ behavior: "smooth" });
}

// Google Ads / GA4 event, only fires when gtag is loaded (NEXT_PUBLIC_GADS_ID set).
export function track(name: string, params: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", name, { event_category: "lead", ...params });
    const label = {
      whatsapp_click: process.env.NEXT_PUBLIC_GADS_WA_LABEL,
      call_click: process.env.NEXT_PUBLIC_GADS_CALL_LABEL,
      form_submit: process.env.NEXT_PUBLIC_GADS_FORM_LABEL,
    }[name];
    const id = process.env.NEXT_PUBLIC_GADS_ID;
    if (label && id) w.gtag?.("event", "conversion", { send_to: `${id}/${label}` });
  } catch {
    /* analytics must never break the page */
  }
}
