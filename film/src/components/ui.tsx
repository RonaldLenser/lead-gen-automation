import React from "react";
import { C, F, T, G, p, rise } from "../theme";

/* chapter header used by every demo scene */
export const Chapter: React.FC<{
  f: number;
  n: string;
  name: string;
  when: string;
  color: string;
  title: string;
  out?: number;
}> = ({ f, n, name, when, color, title, out = 1e9 }) => {
  const o = 1 - p(f, out, out + 10);
  return (
    <div style={{ position: "absolute", left: G.m, top: 92, right: G.m, opacity: o }}>
      <div style={{ ...rise(f, 0), fontFamily: F.mono, fontSize: T.label, letterSpacing: "0.16em", color, display: "flex", gap: 18 }}>
        <span>{n}</span>
        <span style={{ color: C.text }}>{name.toUpperCase()}</span>
        <span style={{ color: C.dim }}>{when.toUpperCase()}</span>
      </div>
      <div style={{ ...rise(f, 6, 20, 30), fontFamily: F.sans, fontSize: T.h1, fontWeight: 750, letterSpacing: "-0.03em", lineHeight: 1.05, marginTop: 20, color: C.text }}>
        {title}
      </div>
    </div>
  );
};

/* a panel surface */
export const Panel: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 18, ...style }}>{children}</div>
);

/* mono micro label */
export const Label: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({ children, color = C.dim, style }) => (
  <div style={{ fontFamily: F.mono, fontSize: 18, letterSpacing: "0.14em", color, textTransform: "uppercase", ...style }}>{children}</div>
);

/* animated check row */
export const Check: React.FC<{ f: number; at: number; text: string; note?: string; fontSize?: number }> = ({ f, at, text, note, fontSize = 26 }) => {
  const k = p(f, at, at + 8);
  const shown = p(f, at - 6, at);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: 0.3 + 0.7 * shown, fontSize, fontFamily: F.sans, color: "#dcdce0" }}>
      <div style={{ width: 32, height: 32, flex: "none", borderRadius: 9, border: `2px solid ${k > 0.5 ? C.accLine : C.line2}`, background: k > 0.5 ? C.accBg : "transparent", display: "grid", placeItems: "center" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.acc} strokeWidth={3.2} style={{ opacity: k }}>
          <path d="m5 12 5 5 9-10" strokeDasharray="30" strokeDashoffset={30 * (1 - k)} />
        </svg>
      </div>
      <span>{text}</span>
      {note && <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: fontSize * 0.72, color: C.mute, opacity: k }}>{note}</span>}
    </div>
  );
};

/* typed text with caret */
export const Typed: React.FC<{ f: number; at: number; text: string; cps?: number; caret?: boolean }> = ({ f, at, text, cps = 40, caret = true }) => {
  const n = Math.max(0, Math.min(text.length, Math.floor(((f - at) / 30) * cps)));
  const typing = n > 0 && n < text.length;
  return (
    <>
      {text.slice(0, n)}
      {caret && typing && <span style={{ display: "inline-block", width: "0.5em", height: "1em", background: C.acc, verticalAlign: "-0.12em", marginLeft: 2 }} />}
    </>
  );
};

export const typedDone = (at: number, text: string, cps = 40) => at + Math.ceil((text.length / cps) * 30);
