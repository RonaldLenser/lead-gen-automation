import React from "react";
import { Composition } from "remotion";
import { Film } from "./Film";
import { FPS, W, H } from "./theme";
import { TOTAL } from "./timeline";

export const Root: React.FC = () => (
  <Composition id="OutreachEngine" component={Film} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
);
