import { Easing, interpolate } from "remotion";

/* ------------------------------------------------------------------
   Design system for the Outreach Engine film.
   Colors, type and motion all come from the project's case study page
   (ronaldlenser.github.io/outreach-engine) so the film reads as the
   same product.
------------------------------------------------------------------- */

export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const C = {
  bg: "#0a0a0b",
  panel: "#111114",
  panel2: "#16171b",
  line: "#232327",
  line2: "#2e2e34",
  text: "#f2f2f3",
  mute: "#9a9aa3",
  dim: "#6d6d75",
  acc: "#6ee7b7",
  accInk: "#06140d",
  accBg: "#0f1a16",
  accLine: "#2c5a43",
  find: "#f5b84b",
  verify: "#a78bfa",
  reach: "#e8956b",
  reply: "#5fd1e6",
  close: "#34c38f",
  red: "#f0686a",
};

export const F = {
  sans: "'Inter Variable', Inter, system-ui, sans-serif",
  mono: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace",
};

/* type scale (px at 1080p) */
export const T = {
  display: 132,
  h1: 68,
  h2: 44,
  body: 30,
  small: 24,
  label: 20,
};

/* layout grid */
export const G = {
  m: 96, // outer margin
  stageTop: 300, // where the machine/detail area starts
  stageH: 480,
  bandTop: 812, // the persistent sheet band
};

/* motion */
export const ease = Easing.bezier(0.22, 1, 0.36, 1); // confident ease out
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

export const p = (f: number, a: number, b: number, e = ease) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });

/** standard entrance: fade + 24px rise over 18 frames */
export const rise = (f: number, at: number, dur = 18, dist = 24) => {
  const k = p(f, at, at + dur);
  return { opacity: k, transform: `translateY(${(1 - k) * dist}px)` };
};

/** fade in at a, fade out at b */
export const window_ = (f: number, a: number, b: number, fade = 12) =>
  Math.min(p(f, a, a + fade, Easing.linear), 1 - p(f, b - fade, b, Easing.linear));

export const sec = (s: number) => Math.round(s * FPS);
