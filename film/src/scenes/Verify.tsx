import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, F, G, p, rise, window_ } from "../theme";
import { Canvas } from "../components/Canvas";
import { Chapter, Label, Panel, Typed } from "../components/ui";
import { wf } from "../data/workflows";
import { QUERIES, DOMAINS } from "../data/demo";

const PATH = [
  "Every 5 min (24/7)", "Read Verification Tab", "Pick First 20 Pending", "Mark Rows Checking",
  "Loop Over Leads", "Layer 4 GBP Check + Queries", "Phone Lookup Search", "Enrich City + Address",
  "Search Q1 Name", "Search Q2 Name City", "Search Q3 Name State", "Search Q4 Phone", "Search Q5 Address", "Search Q6 Social", "Search Q7 Directories",
  "Collect Results + Domain Candidates", "Split Domain List", "Probe Candidate Domains", "Domain Match Verdict",
  "AI Website Judge", "Scoring + Verdict",
  "Update Verification Row", "Route Approved Lead", "Should Append?", "Has Email?", "Append to Leads",
];

/* frame -> how many path nodes are lit, synced to the detail panels */
const LIT: [number, number][] = [[0, 0], [26, 4], [34, 8], [40, 9], [106, 15], [130, 16], [196, 19], [206, 20], [262, 21], [300, 26]];
const litAt = (f: number) => interpolate(f, LIT.map((x) => x[0]), LIT.map((x) => x[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const DETAIL_TOP = 512;

export const Verify: React.FC = () => {
  const f = useCurrentFrame();
  const w = wf("verify");

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Chapter f={f} n="02" name="Verify Leads" when="every 5 min · 20 at a time" color={C.verify} title="Proves there's no website. Nine ways." out={318} />

      {/* the machine */}
      <div style={{ position: "absolute", left: G.m, top: 262, opacity: window_(f, 4, 328) }}>
        <Panel style={{ width: 1728, height: 220, overflow: "hidden", background: "#0c0c0e" }}>
          <Canvas
            wf={w}
            frame={f}
            width={1728}
            height={220}
            path={PATH}
            lit={litAt(f)}
            cam={[[0, 560, 178, 1.2], [40, 700, 178, 1.2], [130, 1720, 178, 1.2], [215, 2800, 178, 1.2], [300, 3500, 165, 1.2]]}
          />
        </Panel>
      </div>

      {/* A: the seven searches */}
      <div style={{ position: "absolute", left: G.m, top: DETAIL_TOP, width: 1728, opacity: window_(f, 30, 128, 10) }}>
        <Label color={C.verify}>7 Google searches · Serper API</Label>
        <div style={{ marginTop: 16, display: "grid", gap: 9 }}>
          {QUERIES.map(([k, q], i) => {
            const at = 38 + i * 10;
            return (
              <div key={k} style={{ display: "flex", gap: 24, alignItems: "center", fontSize: 23, opacity: p(f, at - 4, at + 2) }}>
                <span style={{ width: 210, fontFamily: F.mono, fontSize: 19, color: C.mute }}>{k}</span>
                <span style={{ fontFamily: F.mono, color: C.text }}>
                  <Typed f={f} at={at} text={q} cps={140} />
                </span>
                <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 18, color: C.dim, opacity: p(f, at + 12, at + 18) }}>no owned site</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* B: domain hunt */}
      <div style={{ position: "absolute", left: G.m, top: DETAIL_TOP, width: 1728, opacity: window_(f, 126, 208, 10), transform: `translateY(${(1 - p(f, 126, 142)) * 20}px)` }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Label color={C.verify}>20 likely domains · probed live</Label>
          <Label>parked pages ignored · match needs 2 name hits or the phone</Label>
        </div>
        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px 12px" }}>
          {DOMAINS.map((d, i) => {
            const at = 136 + i * 2.6;
            const done = p(f, at + 8, at + 12);
            return (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, border: `1px solid ${C.line}`, background: C.panel, opacity: p(f, at - 3, at + 2), fontFamily: F.mono, fontSize: 17, whiteSpace: "nowrap" }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: done > 0.5 ? C.dim : C.verify, flex: "none" }} />
                <span style={{ color: C.text }}>{d}</span>
                <span style={{ marginLeft: "auto", color: C.dim, fontSize: 17, opacity: done }}>&#10005;</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* C: the AI judge + scoring */}
      <div style={{ position: "absolute", left: G.m, top: DETAIL_TOP, width: 1728, display: "flex", gap: 24, opacity: window_(f, 204, 330, 10), transform: `translateY(${(1 - p(f, 204, 220)) * 20}px)` }}>
        <Panel style={{ flex: 1, padding: "22px 28px", height: 286 }}>
          <Label color={C.verify}>AI Website Judge · claude-haiku-4-5</Label>
          <pre style={{ fontFamily: F.mono, fontSize: 22, lineHeight: 1.5, color: C.text, marginTop: 16, whiteSpace: "pre-wrap" }}>
            <Typed
              f={f}
              at={214}
              cps={150}
              text={'{\n  "website_found": false,\n  "confidence_no_website": 97,\n  "notes": "no owned site in 7 searches or 20 domains"\n}'}
            />
          </pre>
        </Panel>
        <Panel style={{ width: 640, padding: "22px 28px", height: 286 }}>
          <Label color={C.verify}>Scoring + Verdict</Label>
          {(() => {
            const k = p(f, 232, 262);
            const v = Math.round(97 * k);
            const verdict = p(f, 266, 276);
            return (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 14 }}>
                  <span style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 84, letterSpacing: "-0.03em" }}>{v}</span>
                  <span style={{ fontSize: 24, color: C.mute }}>/ 100</span>
                  <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 30, fontWeight: 700, color: C.close, opacity: verdict, transform: `scale(${1.25 - 0.25 * verdict})` }}>approved</span>
                </div>
                <div style={{ position: "relative", height: 16, borderRadius: 8, background: "#25252b", marginTop: 14 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${97 * k}%`, borderRadius: 8, background: `linear-gradient(90deg, #6f55e0, ${C.verify})` }} />
                  <div style={{ position: "absolute", left: "90%", top: -8, bottom: -8, width: 2, background: C.mute }} />
                  <div style={{ position: "absolute", left: "95%", top: -8, bottom: -8, width: 2, background: C.close }} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, marginTop: 14, fontFamily: F.mono, fontSize: 17, color: C.mute }}>
                  <span>90 to 94: review</span>
                  <span style={{ color: C.close }}>95+: approved</span>
                </div>
              </>
            );
          })()}
        </Panel>
      </div>
    </div>
  );
};
