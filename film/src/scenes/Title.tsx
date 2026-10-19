import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F, T, p, rise } from "../theme";

/* 0:04 to 0:09. Name + one sentence. The sheet tabs arrive underneath (SheetBand). */

export const Title: React.FC = () => {
  const f = useCurrentFrame();
  const out = 1 - p(f, 136, 150);
  return (
    <div style={{ position: "absolute", left: 96, top: 210, right: 96, opacity: out }}>
      <div style={{ ...rise(f, 0, 16), fontFamily: F.mono, fontSize: T.label, letterSpacing: "0.16em", color: C.acc }}>
        N8N · CLAUDE · GOOGLE SHEETS · GMAIL
      </div>
      <div style={{ ...rise(f, 6, 22, 40), fontSize: T.display, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.95, marginTop: 26 }}>
        Lead Gen Automation
      </div>
      <div style={{ ...rise(f, 22, 20), fontSize: 40, lineHeight: 1.3, color: C.text, marginTop: 34, maxWidth: 1320, fontWeight: 450 }}>
        Six n8n workflows that find local businesses with no website, prove it, and start the conversation.
      </div>
      <div style={{ ...rise(f, 70, 18), fontSize: 26, color: C.mute, marginTop: 36 }}>
        Every lead lives in one Google Sheet. Each workflow moves it one step.
      </div>
    </div>
  );
};
