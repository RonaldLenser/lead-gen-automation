import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F, p, rise } from "../theme";
import { LEAD } from "../data/demo";
import { Typed } from "../components/ui";

/* 0:00 to 0:04. One sheet row, close up. The empty website cell is the problem. */

const CELLS: [string, string, number][] = [
  ["business_name", LEAD.business_name, 400],
  ["category", LEAD.category, 210],
  ["city", LEAD.city, 210],
  ["rating", LEAD.rating, 150],
  ["reviews", LEAD.reviews, 160],
  ["website", "", 300],
];

export const Row: React.FC = () => {
  const f = useCurrentFrame();
  const out = 1 - p(f, 108, 120);
  const wAt = 50; // website cell focus
  const focus = p(f, wAt, wAt + 12);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <div style={{ position: "absolute", left: 96, top: 230, right: 96 }}>
        <div style={{ ...rise(f, 34, 18, 30), fontSize: 84, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1 }}>
          63 reviews. 4.8 stars. <span style={{ color: C.red }}>No website.</span>
        </div>
        <div style={{ ...rise(f, 64, 18), fontSize: 32, color: C.mute, marginTop: 26, maxWidth: 1250, lineHeight: 1.35 }}>
          Finding businesses like this by hand is slow. Proving they have no site is slower.
        </div>
      </div>

      <div style={{ position: "absolute", right: 96, bottom: 70, fontFamily: F.mono, fontSize: 16, letterSpacing: "0.12em", color: C.dim, opacity: p(f, 20, 34) }}>FICTIONAL DEMO DATA</div>
      <div style={{ position: "absolute", left: 96, top: 600, ...rise(f, 0, 16, 40) }}>
        <div style={{ display: "flex", border: `1px solid ${C.line}`, borderRadius: "16px 16px 0 0", background: "#0d0d10" }}>
          {CELLS.map(([k, , w]) => (
            <div key={k} style={{ width: w, padding: "16px 24px", fontFamily: F.mono, fontSize: 21, color: k === "website" ? (focus > 0.5 ? C.red : C.dim) : C.dim, borderRight: `1px solid ${C.line}` }}>
              {k}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", border: `1px solid ${C.line}`, borderTop: 0, borderRadius: "0 0 16px 16px", background: C.panel, height: 104 }}>
          {CELLS.map(([k, v, w], i) => (
            <div
              key={k}
              style={{
                width: w,
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                fontSize: 40,
                fontWeight: k === "business_name" ? 650 : 400,
                color: k === "rating" ? C.find : C.text,
                borderRight: `1px solid ${C.line}`,
                boxShadow: k === "website" ? `inset 0 0 0 ${3 * focus}px ${C.red}` : "none",
                background: k === "website" ? `rgba(240,104,106,${0.07 * focus})` : "transparent",
                borderRadius: k === "website" ? "0 0 16px 0" : 0,
              }}
            >
              {k === "website" ? (
                <span style={{ width: 4, height: 44, background: C.red, opacity: Math.floor(f / 12) % 2 && f > 30 ? 1 : 0 }} />
              ) : (
                <Typed f={f} at={6 + i * 7} text={v} cps={60} caret={false} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
