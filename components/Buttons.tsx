"use client";

import type { ReactNode } from "react";
import { waLink } from "@/lib/content";
import { filterUnits, openModal, track } from "@/lib/events";

export function FilterButton({ kind, className, children }: { kind: "townhouse" | "villa"; className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => filterUnits(kind)} className={className}>
      {children}
    </button>
  );
}

export function ModalButton({ unitId, className, children }: { unitId?: string; className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => openModal(unitId)} className={className}>
      {children}
    </button>
  );
}

export function WaButton({ text, source, className, children }: { text: string; source: string; className?: string; children: ReactNode }) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source })} className={className}>
      {children}
    </a>
  );
}
