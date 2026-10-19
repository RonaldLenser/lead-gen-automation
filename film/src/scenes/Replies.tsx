import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, F, G, p, window_ } from "../theme";
import { Canvas } from "../components/Canvas";
import { Chapter, Label, Panel } from "../components/ui";
import { wf } from "../data/workflows";
import { EMAIL, REPLY } from "../data/demo";

/* 0:37 to 0:45. Reply Catcher sorts the reply, then one guardrail: bounces pause everything. */

const PATH_A = ["New Reply Email", "Read Leads Tab", "Match Sender and Classify", "Route by Category", "Mark Lead Replied", "Notify Ron of Reply"];
const PATH_B = ["Route by Category", "Mark Lead Bounced", "Count Bounces Today", "Pause Needed", "Set Settings Pause Flag", "Notify Ron Auto Paused"];

const RULES: [string, string, string][] = [
  ["bounced", "mailer-daemon, undeliverable", C.red],
  ["ooo", "out of office, auto reply", C.mute],
  ["unsub", "stop, remove me, not interested", C.find],
  ["replied", "a real answer from a known lead", C.close],
];

export const Replies: React.FC = () => {
  const f = useCurrentFrame();
  const w = wf("replies");
  const phaseB = f >= 150;
  const lit = phaseB
    ? interpolate(f, [156, 190], [1, PATH_B.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(f, [10, 96], [0, PATH_A.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pick = p(f, 62, 72);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Chapter f={f} n="04" name="Reply Catcher" when="checks Gmail every 10 min" color={C.reply} title={phaseB ? "Two bounces in a day pauses everything." : "Every reply gets sorted."} out={228} />
      <div style={{ position: "absolute", left: G.m, top: 262, opacity: window_(f, 2, 238) }}>
        <Panel style={{ width: 1728, height: 220, overflow: "hidden", background: "#0c0c0e" }}>
          <Canvas wf={w} frame={f} width={1728} height={220} path={phaseB ? PATH_B : PATH_A} lit={lit} cam={[[0, 690, 165, 1.18]]} />
        </Panel>
      </div>

      {/* phase A: reply arrives, gets classified, Ron is notified */}
      <div style={{ position: "absolute", left: G.m, top: 512, width: 1728, display: "flex", gap: 24, opacity: window_(f, 8, 152, 10) }}>
        <Panel style={{ width: 520, height: 278, padding: "20px 26px" }}>
          <Label color={C.reply}>New Reply Email</Label>
          <div style={{ marginTop: 18, opacity: p(f, 14, 24), transform: `translateY(${(1 - p(f, 14, 26)) * 14}px)` }}>
            <div style={{ fontSize: 24, fontWeight: 600 }}>Example Roofing</div>
            <div style={{ fontSize: 20, color: C.mute, marginTop: 4 }}>Re: {EMAIL.subject}</div>
            <div style={{ fontSize: 34, marginTop: 22, fontWeight: 500 }}>"{REPLY}"</div>
          </div>
        </Panel>
        <Panel style={{ flex: 1, height: 278, padding: "20px 26px" }}>
          <Label color={C.reply}>Match Sender and Classify</Label>
          <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
            {RULES.map(([k, d, col], i) => {
              const hit = k === "replied";
              return (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 18, padding: "8px 14px", borderRadius: 10, opacity: p(f, 30 + i * 6, 38 + i * 6) * (hit ? 1 : 1 - 0.55 * pick), border: `1px solid ${hit && pick > 0.5 ? C.accLine : C.line}`, background: hit && pick > 0.5 ? C.accBg : "transparent" }}>
                  <span style={{ width: 110, fontFamily: F.mono, fontSize: 20, color: col, fontWeight: 700 }}>{k}</span>
                  <span style={{ fontSize: 20, color: C.mute }}>{d}</span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel style={{ width: 470, height: 278, padding: "20px 26px", opacity: p(f, 96, 108), borderColor: C.accLine, background: C.accBg }}>
          <Label color={C.acc}>Notify Ron of Reply</Label>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 18 }}>Example Roofing: {REPLY}</div>
          <div style={{ fontSize: 20, color: C.mute, marginTop: 12, lineHeight: 1.4 }}>Lands in Ron's inbox with the full reply. Status is now replied, so no more follow ups go out.</div>
        </Panel>
      </div>

      {/* phase B: the guardrail (hypothetical bounces, real logic) */}
      <div style={{ position: "absolute", left: G.m, top: 512, width: 1728, display: "flex", gap: 24, opacity: window_(f, 152, 240, 10) }}>
        {[
          ["Count Bounces Today", "2", "bounces with today's send date", C.red],
          ["Set Settings Pause Flag", "PAUSED = TRUE", "written to the Settings tab", C.red],
          ["Is Paused · next run", "Stop When Paused", "nothing sends until it's set back", C.text],
        ].map(([k, big, small, col], i) => (
          <Panel key={k} style={{ flex: 1, height: 278, padding: "20px 26px", opacity: p(f, 158 + i * 16, 168 + i * 16) }}>
            <Label color={C.reply}>{k}</Label>
            <div style={{ fontFamily: F.mono, fontSize: 40, fontWeight: 700, color: col, marginTop: 34 }}>{big}</div>
            <div style={{ fontSize: 21, color: C.mute, marginTop: 14 }}>{small}</div>
          </Panel>
        ))}
      </div>
      <div style={{ position: "absolute", right: G.m, top: 488, fontFamily: F.mono, fontSize: 15, letterSpacing: "0.12em", color: C.dim, opacity: window_(f, 156, 238) }}>
        GUARDRAIL · HYPOTHETICAL BOUNCES, REAL LOGIC
      </div>
    </div>
  );
};
