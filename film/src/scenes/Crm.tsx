import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, F, G, p, window_ } from "../theme";
import { Canvas } from "../components/Canvas";
import { Chapter, Label, Panel } from "../components/ui";
import { wf } from "../data/workflows";

/* 0:45 to 0:50. CRM: replied lead becomes a Pipeline deal; the 8 AM digest lists it. */

const PATH_A = ["Sync Every 2 Hours", "Read Leads", "Read Call List", "Read Pipeline", "Find New Entries", "Append to Pipeline"];
const PATH_B = ["Digest Weekdays 8AM", "Read Pipeline for Digest", "Build Digest", "Send Digest Email"];

export const Crm: React.FC = () => {
  const f = useCurrentFrame();
  const w = wf("crm");
  const a = interpolate(f, [4, 40], [0, PATH_A.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b = interpolate(f, [62, 96], [0, PATH_B.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const path = [...PATH_A, ...PATH_B];
  const lit = a < PATH_A.length ? a : PATH_A.length + b;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Chapter f={f} n="05" name="CRM" when="every 2 hours · digest 8 AM" color={C.close} title="Replies become deals." out={138} />
      <div style={{ position: "absolute", left: G.m, top: 262, opacity: window_(f, 2, 148) }}>
        <Panel style={{ width: 1728, height: 220, overflow: "hidden", background: "#0c0c0e" }}>
          <Canvas wf={w} frame={f} width={1728} height={220} path={path} lit={lit} cam={[[0, 470, 118, 1.3]]} />
        </Panel>
      </div>
      <div style={{ position: "absolute", left: G.m, top: 512, width: 1728, display: "flex", gap: 24, opacity: window_(f, 8, 148) }}>
        <Panel style={{ flex: 1, height: 278, padding: "20px 26px" }}>
          <Label color={C.close}>Find New Entries</Label>
          <div style={{ fontSize: 26, marginTop: 20, lineHeight: 1.45 }}>
            Status <span style={{ fontFamily: F.mono, color: C.close }}>replied</span> and not in Pipeline yet
          </div>
          <div style={{ fontSize: 26, marginTop: 8, lineHeight: 1.45, color: C.mute }}>
            becomes stage <span style={{ fontFamily: F.mono, color: C.text }}>Replied</span>, next action <span style={{ color: C.text }}>Reply + send mockup</span>, due today.
          </div>
          <div style={{ fontSize: 20, marginTop: 16, color: C.dim }}>Interested calls from the Call List come in the same way.</div>
        </Panel>
        <div style={{ width: 760, height: 278, borderRadius: 18, overflow: "hidden", background: "#f4f4f2", color: "#18181b", opacity: p(f, 84, 96), transform: `translateY(${(1 - p(f, 84, 98)) * 16}px)` }}>
          <div style={{ background: "#e6e6e3", padding: "14px 24px", fontSize: 20, color: "#55555c", display: "flex" }}>
            <span><b style={{ color: "#18181b" }}>Subject:</b> RLD follow-ups today: 1</span>
            <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 16, color: "#8a8a92" }}>Send Digest Email · 8:00 AM</span>
          </div>
          <div style={{ padding: "18px 24px" }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>RLD follow-ups for {"2026-10-20"}</div>
            <div style={{ fontSize: 21, marginTop: 14, lineHeight: 1.5 }}>
              <b>Example Roofing</b> · Stage: Replied · Next action: Reply + send mockup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
