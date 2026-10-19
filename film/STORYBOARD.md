# Lead Gen Automation: "One Row" storyboard

57s · 1920×1080 · 30 fps · silent by design. The status cell changes are the beat, so no voiceover or music is needed. A soft track can be added later at about -18 LUFS without changing the edit.

| Time | Scene | On screen copy | Visual + motion | Audio cue (if scored later) |
|---|---|---|---|---|
| 0:00 to 0:04 | Row | "63 reviews. 4.8 stars. **No website.**" / "Finding businesses like this by hand is slow. Proving they have no site is slower." | One sheet row, large. Cells type in left to right. The empty `website` cell outlines red with a blinking caret. | Single low tone on the red outline |
| 0:04 to 0:09 | Title | "N8N · CLAUDE · GOOGLE SHEETS · GMAIL" / **Lead Gen Automation** / "Six n8n workflows that find local businesses with no website, prove it, and start the conversation." / "Every lead lives in one Google Sheet. Each workflow moves it one step." | Type rises in. The RLD Leads sheet band (5 real tabs) slides up and stays for the demo. | Music enters |
| 0:09 to 0:17 | 01 Scrape Sources | "Scrape. Filter. Dedupe." + one fixed lower third per step (search matrix, filters, dedupe, queue) | Real Scrape Sources canvas. Execution lights the path node by node and the camera follows. At Append to Verification the row lands in the band as `pending`. | Soft tick per lit node |
| 0:17 to 0:28 | 02 Verify Leads | "Proves there's no website. Nine ways." | Status `checking`. Strip: the real Verify canvas lights Q1 to Q7. Detail: the 7 query strings type out, then 20 generated domains get probed (no match), then Claude's JSON and the score climbing to 97 past the 95 line. Status `approved` (97), then the row moves to Leads. | Rising tone into "approved" |
| 0:28 to 0:37 | 03 Send Outreach | "Claude writes it. Code checks it." | Draft types in a light email panel, then the quality gate ticks (no links, no dashes, no spam phrases, under 90 words, one rewrite then skip). SENT VIA GMAIL, status `sent_1`, last_sent filled. Then the sequence: sent_1, +3 days in the same thread, +4 days done. | Send whoosh, muted |
| 0:37 to 0:42 | 04 Reply Catcher | "Every reply gets sorted." | Reply "yeah send it over" arrives. The four real classifier buckets, with `replied` selected. Notify Ron of Reply. Status `replied`. | Notification blip |
| 0:42 to 0:45 | 04 Guardrail | "Two bounces in a day pauses everything." (tagged "hypothetical bounces, real logic") | Bounce branch lights. Count = 2, PAUSED = TRUE, Stop When Paused. Band switches to Settings and PAUSED flips to TRUE. | Low hit on TRUE |
| 0:45 to 0:50 | 05 CRM | "Replies become deals." | Find New Entries rule. A Pipeline row appears (stage Replied, next action "Reply + send mockup"). Light digest email "RLD follow-ups today: 1". | Resolve |
| 0:50 to 0:57 | Close | "6 WORKFLOWS · 146 NODES · N8N, CLAUDE, SHEETS, GMAIL" / **Lead Gen Automation** / "See how it works: ronaldlenser.github.io/lead-gen-automation" / "Built by Ron Lenser · ronlenserdigital.com" | All six real canvases tile in, dim, and the title settles. Holds about 3.5s. | Tail out |

## Verified vs staged

- **From the workflow code:** node names, the execution order, sheet tabs and columns, the filter rules (trade, 10+ reviews, 3.8+ stars, no real site), the query construction, domain generation (bases × 5 TLDs, max 20), the Claude judge fields, the 95/90 thresholds, the copy gate rules, the sequence timing (3 and 4 days), the classifier buckets, the 2 bounce auto pause, the Pipeline next action text and the digest subject.
- **Fictional:** Example Roofing, its rating, reviews, phone, address, masked email, the model's 97 output, the reply text and the dates.
- **Not shown on purpose:** outcome metrics (none exist in the project files).
