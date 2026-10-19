import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import { C, F } from "./theme";
import { SCENES } from "./timeline";
import { SheetBand } from "./components/SheetBand";
import { Row } from "./scenes/Row";
import { Title } from "./scenes/Title";
import { Find } from "./scenes/Find";
import { Verify } from "./scenes/Verify";
import { Outreach } from "./scenes/Outreach";
import { Replies } from "./scenes/Replies";
import { Crm } from "./scenes/Crm";
import { Close } from "./scenes/Close";

export const Film: React.FC = () => {
  const f = useCurrentFrame();
  const S = SCENES;
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: F.sans, color: C.text }}>
      {/* very soft vignette so the frame has depth without decoration */}
      <AbsoluteFill style={{ background: "radial-gradient(1400px 800px at 70% 0%, rgba(110,231,183,0.05), transparent 60%)" }} />
      <Sequence from={S.row.from} durationInFrames={S.row.dur}><Row /></Sequence>
      <Sequence from={S.title.from} durationInFrames={S.title.dur}><Title /></Sequence>
      <Sequence from={S.find.from} durationInFrames={S.find.dur}><Find /></Sequence>
      <Sequence from={S.verify.from} durationInFrames={S.verify.dur}><Verify /></Sequence>
      <Sequence from={S.outreach.from} durationInFrames={S.outreach.dur}><Outreach /></Sequence>
      <Sequence from={S.replies.from} durationInFrames={S.replies.dur}><Replies /></Sequence>
      <Sequence from={S.crm.from} durationInFrames={S.crm.dur}><Crm /></Sequence>
      <Sequence from={S.close.from} durationInFrames={S.close.dur}><Close /></Sequence>
      <SheetBand f={f} />
    </AbsoluteFill>
  );
};
