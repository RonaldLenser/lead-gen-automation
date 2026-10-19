import React from "react";
import { C, F, G, p } from "../theme";
import { LEAD, DATES } from "../data/demo";
import { TL } from "../timeline";

/* ------------------------------------------------------------------
   The persistent "RLD Leads" sheet band: the film's protagonist row.
   Everything is driven by the GLOBAL frame so the row's state is
   continuous across scene cuts. Column names are the real ones the
   workflows read and write.
------------------------------------------------------------------- */

type Cell = { key: string; w: number; v: string; changedAt?: number; prev?: string; tone?: string };

const TABS = ["Verification", "Leads", "Call List", "Pipeline", "Settings"];

const tabAt = (f: number) => {
  if (f < TL.toLeads) return "Verification";
  if (f < TL.toSettings) return "Leads";
  if (f < TL.toPipeline) return "Settings";
  return "Pipeline";
};

const status = (f: number, steps: [number, string][]) => {
  let v = "", at = -1, prev = "";
  for (const [t, s] of steps) if (f >= t) { prev = v; v = s; at = t; }
  return { v, at, prev };
};

const rowFor = (tab: string, f: number): { cells: Cell[]; enterAt: number } => {
  if (tab === "Verification") {
    const st = status(f, [[TL.rowAppear, "pending"], [TL.checking, "checking"], [TL.approved, "approved"]]);
    return {
      enterAt: TL.rowAppear,
      cells: [
        { key: "business_name", w: 290, v: LEAD.business_name },
        { key: "category", w: 170, v: LEAD.category },
        { key: "city", w: 170, v: LEAD.city },
        { key: "rating", w: 120, v: LEAD.rating },
        { key: "reviews", w: 130, v: LEAD.reviews },
        { key: "listed_website", w: 230, v: "" },
        { key: "status", w: 220, v: st.v, changedAt: st.at, prev: st.prev, tone: st.v === "approved" ? C.close : st.v === "checking" ? C.verify : C.find },
        { key: "confidence", w: 170, v: f >= TL.approved ? "97" : "", changedAt: TL.approved },
      ],
    };
  }
  if (tab === "Leads") {
    const st = status(f, [[TL.toLeads, ""], [TL.sent, "sent_1"], [TL.replied, "replied"]]);
    return {
      enterAt: TL.toLeads,
      cells: [
        { key: "business_name", w: 290, v: LEAD.business_name },
        { key: "email", w: 270, v: LEAD.email },
        { key: "site_status", w: 180, v: "none" },
        { key: "status", w: 220, v: st.v, changedAt: st.at, prev: st.prev, tone: st.v === "replied" ? C.close : C.reach },
        { key: "last_sent", w: 210, v: f >= TL.sent ? DATES.sent : "", changedAt: TL.sent },
        { key: "thread_id", w: 330, v: f >= TL.sent ? "saved for follow ups" : "", changedAt: TL.sent },
      ],
    };
  }
  if (tab === "Settings") {
    return {
      enterAt: TL.toSettings,
      cells: [
        { key: "PAUSED", w: 220, v: f >= TL.paused ? "TRUE" : "FALSE", changedAt: TL.paused, prev: "FALSE", tone: f >= TL.paused ? C.red : C.mute },
        { key: "", w: 900, v: f >= TL.paused ? "Send Outreach checks this cell before every run" : "" , changedAt: TL.paused },
      ],
    };
  }
  return {
    enterAt: TL.pipelineRow,
    cells: [
      { key: "business_name", w: 290, v: LEAD.business_name },
      { key: "stage", w: 180, v: "Replied", tone: C.close },
      { key: "next_action", w: 330, v: "Reply + send mockup" },
      { key: "next_action_date", w: 250, v: DATES.replied },
      { key: "source", w: 150, v: "maps" },
    ],
  };
};

export const SheetBand: React.FC<{ f: number }> = ({ f }) => {
  const show = Math.min(p(f, TL.bandIn, TL.bandIn + 20), 1 - p(f, TL.bandOut, TL.bandOut + 14));
  if (show <= 0) return null;
  const tab = tabAt(f);
  const { cells, enterAt } = rowFor(tab, f);
  const tabStart = tab === "Verification" ? TL.bandIn : tab === "Leads" ? TL.toLeads : tab === "Settings" ? TL.toSettings : TL.toPipeline;
  const swap = p(f, tabStart, tabStart + 14);
  const rowIn = p(f, enterAt, enterAt + 16);

  return (
    <div style={{ position: "absolute", left: 96, right: 96, top: G.bandTop, opacity: show, transform: `translateY(${(1 - show) * 30}px)` }}>
      {/* tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontFamily: F.mono, fontSize: 17, letterSpacing: "0.14em", color: C.dim, marginRight: 10 }}>RLD LEADS</div>
        {TABS.map((t) => (
          <div
            key={t}
            style={{
              fontFamily: F.mono,
              fontSize: 17,
              padding: "7px 14px",
              borderRadius: 8,
              border: `1px solid ${t === tab ? C.accLine : C.line}`,
              background: t === tab ? C.accBg : "transparent",
              color: t === tab ? "#9fe3c2" : C.dim,
            }}
          >
            {t}
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 16, color: C.dim, letterSpacing: "0.1em" }}>FICTIONAL DEMO DATA · REAL WORKFLOW LOGIC</div>
      </div>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, background: C.panel, overflow: "hidden", opacity: 0.35 + 0.65 * swap }}>
        {/* header */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.line}`, background: "#0d0d10" }}>
          {cells.map((c, i) => (
            <div key={i} style={{ width: c.w, padding: "12px 18px", fontFamily: F.mono, fontSize: 17, color: C.dim, borderRight: `1px solid ${C.line}` }}>
              {c.key}
            </div>
          ))}
          <div style={{ flex: 1 }} />
        </div>
        {/* the row */}
        <div style={{ display: "flex", height: 64, opacity: rowIn, transform: `translateY(${(1 - rowIn) * 16}px)` }}>
          {cells.map((c, i) => {
            const at = c.changedAt ?? -1;
            const flash = at > 0 && f >= at ? 1 - p(f, at + 6, at + 36) : 0;
            const swapK = at > 0 ? p(f, at, at + 10) : 1;
            return (
              <div
                key={i}
                style={{
                  width: c.w,
                  position: "relative",
                  padding: "0 18px",
                  display: "flex",
                  alignItems: "center",
                  borderRight: `1px solid ${C.line}`,
                  fontFamily: c.key === "status" || c.key === "PAUSED" || c.key === "stage" ? F.mono : F.sans,
                  fontSize: 24,
                  fontWeight: c.key === "business_name" ? 600 : 400,
                  color: c.tone ?? C.text,
                  boxShadow: flash > 0 ? `inset 0 0 0 2px rgba(110,231,183,${0.9 * flash})` : "none",
                  background: flash > 0 ? `rgba(110,231,183,${0.08 * flash})` : "transparent",
                }}
              >
                {c.prev !== undefined && swapK < 1 && (
                  <span style={{ position: "absolute", left: 18, opacity: 1 - swapK, transform: `translateY(${-14 * swapK}px)` }}>{c.prev}</span>
                )}
                <span style={{ opacity: swapK, transform: `translateY(${14 * (1 - swapK)}px)` }}>{c.v || <span style={{ color: C.dim }}>&nbsp;</span>}</span>
              </div>
            );
          })}
          <div style={{ flex: 1 }} />
        </div>
      </div>
    </div>
  );
};
