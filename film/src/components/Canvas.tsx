import React from "react";
import { interpolate } from "remotion";
import { C, F, easeInOut } from "../theme";
import { NODE_COLOR, NODE_ICON, Workflow } from "../data/workflows";

/* ------------------------------------------------------------------
   An n8n canvas rebuilt from the real workflow file.
   `path` lists node names in execution order; `lit` (0..path.length)
   says how far execution has travelled. `cam` keyframes move a
   restrained camera: [frame, x, y, scale] in canvas coordinates.
------------------------------------------------------------------- */

const B = 58;

type Cam = [number, number, number, number];

export const Canvas: React.FC<{
  wf: Workflow;
  frame: number;
  width: number;
  height: number;
  path?: string[];
  lit?: number;
  cam: Cam[];
  dimUnlit?: boolean;
  labelSize?: number;
  follow?: { scale: number; y?: number; lead?: number };
}> = ({ wf, frame, width, height, path = [], lit = 0, cam, dimUnlit = true, labelSize = 13.5, follow }) => {
  const fs = cam.map((c) => c[0]);
  const ip = (i: number) =>
    cam.length === 1
      ? cam[0][i]
      : interpolate(frame, fs, cam.map((c) => c[i]), {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeInOut,
        });
  let cx = ip(1), cy = ip(2), s = ip(3);
  if (follow && path.length) {
    // camera tracks execution: centre on the node currently being reached
    const li = Math.max(0, Math.min(path.length - 1, lit - 0.5 + (follow.lead ?? 0)));
    const i0 = Math.floor(li), i1 = Math.min(path.length - 1, i0 + 1), t = li - i0;
    const a = wf.nodes.find((n) => n.n === path[i0])!, b = wf.nodes.find((n) => n.n === path[i1])!;
    const sm = t * t * (3 - 2 * t);
    cx = a.x + 29 + (b.x - a.x) * sm;
    cy = follow.y ?? a.y + 29 + (b.y - a.y) * sm;
    s = follow.scale;
    const half = width / 2 / s; // keep the canvas edge from showing emptiness
    cx = Math.max(half - 20, Math.min(wf.w - half + 20, cx));
  }

  const pos = Object.fromEntries(wf.nodes.map((n) => [n.n, n]));
  const litIndex = (name: string) => {
    const i = path.indexOf(name);
    if (i < 0) return -1;
    return Math.max(0, Math.min(1, lit - i)); // 0..1 brightness
  };
  const active = path.length > 0;

  const edgePath = (e: Workflow["edges"][number]) => {
    const a = pos[e.s], b = pos[e.t];
    const sy = a.y + B / 2 + (e.o - (e.k - 1) / 2) * (e.k > 1 ? 14 : 0);
    const sx = a.x + B, ty = b.y + B / 2, tx = b.x;
    if (!e.back && tx > a.x + 10) {
      const dx = Math.max(30, (tx - sx) / 2);
      return `M${sx},${sy} C${sx + dx},${sy} ${tx - dx},${ty} ${tx},${ty}`;
    }
    const low = Math.max(a.y, b.y) + B + 34;
    return `M${sx},${sy} C${sx + 50},${sy} ${sx + 50},${low} ${sx},${low} L${tx},${low} C${tx - 50},${low} ${tx - 50},${ty} ${tx},${ty}`;
  };

  return (
    <div style={{ width, height, overflow: "hidden", position: "relative" }}>
      <svg
        width={width}
        height={height}
        viewBox={`${cx - width / 2 / s} ${cy - height / 2 / s} ${width / s} ${height / s}`}
        style={{ display: "block" }}
      >
        {wf.edges.map((e, i) => {
          const ls = litIndex(e.s), lt = litIndex(e.t);
          const on = ls >= 1 && lt > 0;
          const d = edgePath(e);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={on ? C.acc : C.line2} strokeWidth={on ? 2.4 : 1.6} opacity={on ? 0.9 : active && dimUnlit ? 0.5 : 1} />
              {on && (
                <path d={d} fill="none" stroke="#ffffff" strokeWidth={2.4} strokeDasharray="4 18" strokeDashoffset={-frame * 1.2} opacity={0.7} />
              )}
            </g>
          );
        })}
        {wf.nodes.map((n) => {
          const k = litIndex(n.n);
          const col = NODE_COLOR[n.c];
          const on = k > 0;
          const faded = active && dimUnlit && !on;
          return (
            <g key={n.n} opacity={faded ? 0.38 : 1}>
              {on && (
                <rect x={n.x - 6} y={n.y - 6} width={B + 12} height={B + 12} rx={n.c === "trigger" ? 26 : 16} fill="none" stroke={C.acc} strokeOpacity={0.35 * k} strokeWidth={6} />
              )}
              <rect x={n.x} y={n.y} width={B} height={B} rx={n.c === "trigger" ? 22 : 12} fill={on ? "#141a17" : "#141417"} stroke={on ? C.acc : col} strokeOpacity={on ? 0.9 : 0.55} strokeWidth={on ? 2 : 1.4} />
              <g
                transform={`translate(${n.x + B / 2 - 11},${n.y + B / 2 - 11}) scale(.92)`}
                fill="none"
                stroke={col}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: NODE_ICON[n.c] }}
              />
              <text x={n.x + B / 2} y={n.y + B + 17} textAnchor="middle" fill={on ? C.text : "#a9a9b1"} fontSize={labelSize} fontFamily={F.sans} fontWeight={on ? 600 : 400}>
                {n.l.map((l, i) => (
                  <tspan key={i} x={n.x + B / 2} dy={i === 0 ? 0 : labelSize + 2}>
                    {l}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** center of a node, handy for camera keyframes */
export const nodeCenter = (wf: Workflow, name: string): [number, number] => {
  const n = wf.nodes.find((x) => x.n === name)!;
  return [n.x + B / 2, n.y + B / 2];
};
