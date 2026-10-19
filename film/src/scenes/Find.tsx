import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, F, G, p, window_ } from "../theme";
import { Canvas } from "../components/Canvas";
import { Chapter, Label, Panel } from "../components/ui";
import { wf } from "../data/workflows";

/* 0:09 to 0:17. Scrape Sources: the real canvas, execution travelling left to right. */

const PATH = [
  "Schedule: Daily 5AM", "Build Search Matrix", "Route Branch", "Scrape Google Maps Businesses", "Wait For Actor",
  "Check Actor Status", "Is Actor Done", "Fetch Actor Dataset", "Shape Maps Leads", "Combine Leads", "Add Dedupe Keys",
  "Dedupe Against Sheets", "Dedupe Complete", "Route by Source", "Prep Verification Rows", "Append to Verification",
];

/* notes pulled from the workflow code, shown in a fixed lower third */
const NOTES: [number, number, string, string][] = [
  [14, 70, "Build Search Matrix", "18 trades x 21 Virginia towns. Each run resumes where the last one stopped, capped at 1,500 places."],
  [70, 128, "Shape Maps Leads", "Keeps trades only, 10+ reviews, 3.8+ stars, no real website. A Facebook or Yelp link does not count as a site."],
  [128, 178, "Dedupe Against Sheets", "Skips anything already in Leads, Call List or Verification, matched by phone or name + city."],
  [178, 236, "Append to Verification", "Survivors are queued with status pending for the next workflow."],
];

export const Find: React.FC = () => {
  const f = useCurrentFrame();
  const w = wf("scrape");
  const lit = interpolate(f, [8, 176], [0, PATH.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Chapter f={f} n="01" name="Scrape Sources" when="daily 5:00 AM" color={C.find} title="Scrape. Filter. Dedupe." out={228} />
      <div style={{ position: "absolute", left: G.m, top: 262, opacity: window_(f, 2, 238) }}>
        <Panel style={{ width: 1728, height: 520, overflow: "hidden", background: "#0c0c0e", position: "relative" }}>
          <Canvas wf={w} frame={f} width={1728} height={520} path={PATH} lit={lit} cam={[[0, 0, 0, 1]]} follow={{ scale: 1.32, y: 226, lead: 0.6 }} />
          {/* lower third */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 112, background: "linear-gradient(180deg, rgba(12,12,14,0) 0%, rgba(12,12,14,0.92) 38%)" }} />
          {NOTES.map(([a, b, node, text]) => {
            const o = window_(f, a, b, 8);
            return (
              <div key={node} style={{ position: "absolute", left: 32, right: 32, bottom: 26, opacity: o, transform: `translateY(${(1 - p(f, a, a + 12)) * 12}px)`, display: "flex", alignItems: "baseline", gap: 22 }}>
                <Label color={C.find} style={{ flex: "none" }}>{node}</Label>
                <div style={{ fontSize: 26, color: C.text }}>{text}</div>
              </div>
            );
          })}
        </Panel>
      </div>
    </div>
  );
};
