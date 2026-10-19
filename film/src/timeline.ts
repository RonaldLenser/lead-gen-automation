import { sec } from "./theme";

/* ------------------------------------------------------------------
   Master timeline. Change scene lengths here; everything that depends
   on the global frame (the sheet band) reads from TL.
------------------------------------------------------------------- */

export const SCENES = {
  row: { from: 0, dur: sec(4) },
  title: { from: sec(4), dur: sec(5) },
  find: { from: sec(9), dur: sec(8) },
  verify: { from: sec(17), dur: sec(11) },
  outreach: { from: sec(28), dur: sec(9) },
  replies: { from: sec(37), dur: sec(8) },
  crm: { from: sec(45), dur: sec(5) },
  close: { from: sec(50), dur: sec(7) },
};

export const TOTAL = SCENES.close.from + SCENES.close.dur;

const s = SCENES;
export const TL = {
  bandIn: s.title.from + 64,
  rowAppear: s.find.from + 176, // Append to Verification lights up
  checking: s.verify.from + 26, // Mark Rows Checking
  approved: s.verify.from + 268, // Scoring + Verdict
  toLeads: s.verify.from + 300, // Has Email? -> Append to Leads
  sent: s.outreach.from + 170, // Send Email via Gmail -> Update Lead Row
  replied: s.replies.from + 92, // Mark Lead Replied
  toSettings: s.replies.from + 160,
  paused: s.replies.from + 186, // Set Settings Pause Flag (hypothetical)
  toPipeline: s.crm.from + 4,
  pipelineRow: s.crm.from + 40, // Append to Pipeline
  bandOut: s.close.from - 6,
};
