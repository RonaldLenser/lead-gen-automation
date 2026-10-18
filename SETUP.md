# Setup

## 1. Import the workflows

In n8n: **Workflows > Import from File**, one at a time, files in `workflows/`.

## 2. Create the Google Sheet

One spreadsheet with these five tabs. Row 1 of each tab is the header row.

| Tab | Columns |
|---|---|
| Verification | business_name, category, owner, phone, email, address, city, state, rating, reviews, maps_url, listed_website, gbp_links, source, status, confidence, reject_reason, website_found, verification_notes, added_date, checked_date |
| Leads | business_name, category, city, phone, email, website, rating, reviews, facebook, instagram, status, last_sent, added_date, thread_id, message_id, site_status, site_notes, skip_reason, source |
| Call List | business_name, category, city, phone, website, rating, reviews, added_date, source, notes, contact_name, email, owner, outcome |
| Pipeline | business_name, contact_name, phone, email, source, stage, owner, deal_value, next_action, next_action_date, notes, added_date, closed_date |
| Settings | PAUSED (set A2 to FALSE) |

Then find and replace `YOUR_GOOGLE_SHEET_ID` in every workflow with your sheet's ID.

## 3. Add credentials in n8n

| Credential | Used for |
|---|---|
| Google Sheets OAuth2 | Every workflow |
| Gmail OAuth2 | Send Outreach, Reply Catcher, CRM |
| Google Drive OAuth2 | Import Leads |
| Anthropic API | Verify Leads, Send Outreach |
| Apify API token (custom auth) | Scrape Sources |
| Serper API (header auth, `X-API-KEY`) | Verify Leads |

Open each node with a warning icon and pick the matching credential.

## 4. Replace placeholders

- `YOUR_DRIVE_FOLDER_ID` in Import Leads: the Drive folder you drop CSVs into
- `you@example.com`: where alerts, replies and digests go
- `YOUR MAILING ADDRESS` and `YOUR PHONE` in Send Outreach (Clean Email Output node): required in every cold email footer
- Search terms and towns in Scrape Sources (Build Search Matrix node)
- The email prompt in Send Outreach (Write Email with Claude node): rewrite it for your offer and voice
- `START_DATE` in Send Outreach (Select Due Leads node): first day of sending, drives the ramp

## 5. Turn it on

Activate in this order: Verify Leads, Reply Catcher, CRM, Import Leads, Scrape Sources, then Send Outreach last. Warm up a new sending inbox for a couple of weeks before cold sending.

Follow CAN-SPAM and the rules where you send. Only email businesses, honor every opt out.
