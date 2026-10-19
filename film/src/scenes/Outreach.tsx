import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, F, G, p, window_ } from "../theme";
import { Canvas } from "../components/Canvas";
import { Chapter, Check, Label, Panel, Typed, typedDone } from "../components/ui";
import { wf } from "../data/workflows";
import { EMAIL } from "../data/demo";

/* 0:28 to 0:37. Send Outreach: Claude drafts, code gates, Gmail sends, row becomes sent_1. */

const PATH = [
  "Weekdays 9 AM", "Wait 0-45min Random Start", "Read Settings Tab", "Is Paused", "Read Leads Tab", "Select Due Leads",
  "Loop One Lead at a Time", "Validate Email", "Check MX Records", "Has Valid Email", "Has Website", "Set No Website",
  "Write Email with Claude", "Clean Email Output", "Copy OK", "Has Saved Message Id", "Send Email via Gmail", "Is Test Run", "Update Lead Row",
];
const LIT: [number, number][] = [[0, 0], [30, 12], [40, 13], [128, 14], [160, 17], [172, 19]];

const SUBJ_AT = 40, BODY_AT = 60, CPS = 120;
const GATE_AT = typedDone(BODY_AT, EMAIL.body, CPS) + 4;

export const Outreach: React.FC = () => {
  const f = useCurrentFrame();
  const w = wf("outreach");
  const lit = interpolate(f, LIT.map((x) => x[0]), LIT.map((x) => x[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sent = p(f, 168, 180);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Chapter f={f} n="03" name="Send Outreach" when="weekdays 9 AM · random start" color={C.reach} title="Claude writes it. Code checks it." out={258} />
      <div style={{ position: "absolute", left: G.m, top: 262, opacity: window_(f, 2, 268) }}>
        <Panel style={{ width: 1728, height: 220, overflow: "hidden", background: "#0c0c0e" }}>
          <Canvas wf={w} frame={f} width={1728} height={220} path={PATH} lit={lit} cam={[[0, 0, 0, 1]]} follow={{ scale: 1.08, lead: 0.2 }} />
        </Panel>
      </div>

      <div style={{ position: "absolute", left: G.m, top: 512, width: 1728, display: "flex", gap: 24, opacity: window_(f, 30, 268) }}>
        {/* the draft */}
        <div style={{ width: 1000, height: 278, borderRadius: 18, overflow: "hidden", background: "#f4f4f2", color: "#18181b", position: "relative" }}>
          <div style={{ background: "#e6e6e3", padding: "14px 24px", fontSize: 20, color: "#55555c", display: "flex", gap: 30 }}>
            <span><b style={{ color: "#18181b" }}>To:</b> Example Roofing</span>
            <span><b style={{ color: "#18181b" }}>Subject:</b> <Typed f={f} at={SUBJ_AT} text={EMAIL.subject} cps={60} /></span>
            <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 16, color: "#8a8a92" }}>Write Email with Claude</span>
          </div>
          <div style={{ padding: "16px 24px", fontSize: 20, lineHeight: 1.36 }}>
            {(() => {
              const n = Math.max(0, Math.min(EMAIL.body.length, Math.floor(((f - BODY_AT) / 30) * CPS)));
              const typing = n > 0 && n < EMAIL.body.length;
              const paras = EMAIL.body.slice(0, n).split("\n\n");
              return paras.map((t, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  {t}
                  {typing && i === paras.length - 1 && <span style={{ display: "inline-block", width: "0.5em", height: "1em", background: C.reach, verticalAlign: "-0.12em", marginLeft: 2 }} />}
                </div>
              ));
            })()}
          </div>
          {/* sent overlay */}
          <div style={{ position: "absolute", right: 22, bottom: 18, fontFamily: F.mono, fontSize: 20, fontWeight: 700, color: "#0b7a52", border: "2px solid #0b7a52", borderRadius: 10, padding: "6px 14px", opacity: sent, transform: `scale(${1.2 - 0.2 * sent})` }}>
            SENT VIA GMAIL
          </div>
        </div>

        {/* gate, then the sequence */}
        <Panel style={{ flex: 1, height: 278, padding: "20px 26px", position: "relative" }}>
          <div style={{ position: "absolute", inset: "20px 26px", opacity: 1 - p(f, 190, 200) }}>
            <Label color={C.reach}>Clean Email Output · quality gate</Label>
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <Check f={f} at={GATE_AT} text="No links or URLs" fontSize={22} />
              <Check f={f} at={GATE_AT + 7} text="No dash characters" fontSize={22} />
              <Check f={f} at={GATE_AT + 14} text="No spam phrases" fontSize={22} />
              <Check f={f} at={GATE_AT + 21} text="Body under 90 words" note="52" fontSize={22} />
              <Check f={f} at={GATE_AT + 28} text="Fails get one rewrite, then skip" fontSize={22} />
            </div>
          </div>
          <div style={{ position: "absolute", inset: "20px 26px", opacity: p(f, 198, 210) }}>
            <Label color={C.reach}>Select Due Leads · the sequence</Label>
            <div style={{ display: "grid", gap: 14, marginTop: 18, fontSize: 23 }}>
              {[
                ["sent_1", "first email", 204],
                ["+3 days", "sent_2, replies in the same thread", 214],
                ["+4 days", "done, one short last note", 224],
              ].map(([a, b, at]) => (
                <div key={a as string} style={{ display: "flex", gap: 18, alignItems: "baseline", opacity: p(f, at as number, (at as number) + 8) }}>
                  <span style={{ width: 120, fontFamily: F.mono, color: C.reach }}>{a}</span>
                  <span style={{ color: C.text }}>{b}</span>
                </div>
              ))}
              <div style={{ fontSize: 19, color: C.mute, marginTop: 6, opacity: p(f, 234, 242) }}>Daily cap ramps 5, 10, 15, 20 by week. Stops on replied or unsub.</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};
