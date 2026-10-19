import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F, T, p, rise } from "../theme";
import { Canvas } from "../components/Canvas";
import { WORKFLOWS } from "../data/workflows";

/* 0:50 to 0:57. All six real canvases, then the name and where to look. */

const TW = 540, TH = 230;

export const Close: React.FC = () => {
  const f = useCurrentFrame();
  const dim = p(f, 56, 84);
  const total = WORKFLOWS.reduce((a, w) => a + w.count, 0);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: 96, top: 250, display: "grid", gridTemplateColumns: `repeat(3, ${TW}px)`, gap: 24, opacity: 1 - 0.82 * dim }}>
        {WORKFLOWS.map((w, i) => {
          const fit = Math.min((TW - 30) / w.w, (TH - 50) / w.h);
          const s = Math.max(fit, 0.62); // crop big workflows so nodes stay legible
          const cx = w.nodes[0].x + (TW / 2) / s - 20;
          return (
            <div key={w.key} style={{ ...rise(f, i * 5, 18, 20), width: TW, height: TH + 44, borderRadius: 16, border: `1px solid ${C.line}`, background: "#0c0c0e", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px 0", display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontSize: 16, color: C.mute }}>
                <span style={{ color: C.text }}>{w.name}</span>
                <span>{w.count} nodes</span>
              </div>
              <Canvas wf={w} frame={f} width={TW} height={TH} cam={[[0, s > fit ? cx : w.w / 2, w.h / 2, s], [210, s > fit ? cx + 160 : w.w / 2, w.h / 2, s]]} labelSize={12} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 96, top: 400, right: 96 }}>
        <div style={{ ...rise(f, 70, 18), fontFamily: F.mono, fontSize: T.label, letterSpacing: "0.16em", color: C.acc }}>
          6 WORKFLOWS · {total} NODES · N8N, CLAUDE, SHEETS, GMAIL
        </div>
        <div style={{ ...rise(f, 76, 22, 40), fontSize: T.display, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.95, marginTop: 24 }}>
          Lead Gen Automation
        </div>
        <div style={{ ...rise(f, 92, 18), fontSize: 38, marginTop: 34, color: C.text }}>
          See how it works: <span style={{ color: C.acc }}>ronaldlenser.github.io/lead-gen-automation</span>
        </div>
        <div style={{ ...rise(f, 104, 18), fontSize: 26, marginTop: 22, color: C.mute }}>Built by Ron Lenser · ronlenserdigital.com</div>
      </div>
    </div>
  );
};
