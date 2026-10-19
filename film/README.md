# Lead Gen Automation film

A 57 second, 1920×1080, 30 fps launch film for Lead Gen Automation, built in Remotion (React + TypeScript). It's silent and works without sound.

Concept: **One Row.** One fictional lead row travels through all six real n8n workflows. Its status cell (pending, checking, approved, sent_1, replied, then Pipeline) changes on screen, and each change cuts to the exact nodes that made it.

## Folder

```
out/lead-gen-automation.mp4      final render
out/thumbnail.png            poster frame
src/
  theme.ts                   colors, type scale, layout grid, easing, motion helpers
  timeline.ts                scene lengths + the global moments the sheet row changes
  Film.tsx                   assembles scenes + the persistent sheet band
  Root.tsx / index.ts        Remotion entry
  data/workflows.ts          node graphs generated from the real n8n export files
  data/demo.ts               ALL fictional data (lead, queries, domains, email copy)
  components/Canvas.tsx      n8n canvas renderer (execution path + camera)
  components/SheetBand.tsx   the "RLD Leads" sheet row that persists across scenes
  components/ui.tsx          Chapter header, Panel, Label, Check, Typed
  scenes/                    Row, Title, Find, Verify, Outreach, Replies, Crm, Close
remotion.config.ts
```

## Preview and render

```bash
npm install
npm run studio          # live preview at http://localhost:3000, scrub any frame
npm run render          # writes out/lead-gen-automation.mp4
npx remotion still src/index.ts OutreachEngine out/thumbnail.png --frame=1640
```

On a machine where Remotion can't download its own Chrome, point it at a local Chromium headless shell:

```bash
REMOTION_CHROME=/path/to/headless_shell npm run render
```

## Changing things

- **Copy:** every headline is in its scene file in `src/scenes/` (look for `title=` on `<Chapter>` and the text in Row, Title and Close). Email text, queries and the lead itself are in `src/data/demo.ts`.
- **Timing:** scene lengths are in `src/timeline.ts` under `SCENES`. The moments the sheet row changes are under `TL`. Moments inside a scene are frame numbers (30 = 1 second) local to that scene.
- **Look:** colors, fonts, type sizes and easing are in `src/theme.ts`.
- **Workflows:** if the n8n workflows change, regenerate `src/data/workflows.ts` from the new export files. Node names in each scene's `PATH` must match the real node names.
- **Footage:** there's no captured footage. Every interface is rebuilt in code from the real workflow files, so it stays sharp and editable. To add a real screen capture, drop the file in `public/` and use Remotion's `<OffthreadVideo src={staticFile("clip.mp4")} />` inside a scene.

## Honesty rules this film follows

- The business, phone, email and scores are fictional and labeled "Fictional demo data".
- Every rule, threshold, node name and column name comes from the workflow code.
- The two bounce guardrail is shown as hypothetical bounces running through real logic.
- There are no results claims, because the files contain no results data.
