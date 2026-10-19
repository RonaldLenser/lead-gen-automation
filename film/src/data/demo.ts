/* ------------------------------------------------------------------
   FICTIONAL demo data. No real business, person or result.
   The values are shaped exactly like the columns the workflows write,
   and every rule/threshold shown in the film comes from the workflow
   code (see /workflows in the lead-gen-automation repo).
------------------------------------------------------------------- */

export const LEAD = {
  business_name: "Example Roofing",
  category: "Roofer",
  city: "Stafford",
  rating: "4.8",
  reviews: "63",
  website: "",
  phone: "(540) 555-0134", // 555-01xx is reserved for fiction
  email: "e••••••@gmail.com",
};

/* The 7 Serper queries, built the same way "Layer 4 GBP Check + Queries" builds them */
export const QUERIES = [
  ["Q1 Name", '"Example Roofing"'],
  ["Q2 Name + city", '"Example Roofing Stafford VA"'],
  ["Q3 Name + state", '"Example Roofing Virginia"'],
  ["Q4 Phone", '"(540) 555-0134" OR "540-555-0134"'],
  ["Q5 Address", '"1200 Example Rd" "Example Roofing"'],
  ["Q6 Social", '"Example Roofing" site:facebook.com OR site:instagram.com'],
  ["Q7 Directories", '"Example Roofing" site:yelp.com OR site:bbb.org'],
];

/* "Collect Results + Domain Candidates": bases x TLDs, capped at 20 */
const bases = ["exampleroofing", "example-roofing", "exampleroofingstafford", "exampleroofing-stafford"];
const tlds = [".com", ".net", ".biz", ".us", ".co"];
export const DOMAINS = bases.flatMap((b) => tlds.map((t) => b + t)).slice(0, 20);

export const EMAIL = {
  subject: "question about example roofing",
  body:
    "Hi Example Roofing team,\n\n" +
    "Saw you have a 4.8 rating from 63 reviews on Google but your listing only links to a Facebook page.\n\n" +
    "I can put together a free mockup of what a site for Example Roofing could look like, no cost and no strings.\n\n" +
    "Want me to send it over?",
};

export const REPLY = "yeah send it over";

export const DATES = { sent: "2026-10-19", replied: "2026-10-20" };
