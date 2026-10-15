// Plain-English definitions for every analytics term the dashboard uses.
// Rendered by SimpleGlossaryPage; grouped for scanning.

export interface GlossaryTerm {
  term: string;
  meaning: string;
}

export interface GlossaryGroup {
  group: string;
  terms: GlossaryTerm[];
}

export const GLOSSARY_TITLE = 'Glossary';
export const GLOSSARY_INTRO =
  'What every word on this dashboard means, in plain English. For what each tracked action means, see the "What these events mean" section on the Events page.';

export const GLOSSARY: GlossaryGroup[] = [
  {
    group: 'The main numbers',
    terms: [
      {
        term: 'Visitor',
        meaning:
          'One person, counted once no matter how many times they come back. Worked out from their browser, so the count is very good but not perfect.',
      },
      {
        term: 'Visit (or Session)',
        meaning:
          'One sitting on the site — a person arrives, looks around, and leaves. The same person coming back in the evening counts as a second visit.',
      },
      {
        term: 'View (or Pageview)',
        meaning: 'One page being looked at once. Ten pages in one visit = ten views.',
      },
      {
        term: 'Bounce rate',
        meaning:
          'The share of visits where someone looked at a single page and left. Lower is usually better, but a high number on a page that answers a question quickly can be fine.',
      },
      {
        term: 'Visit duration',
        meaning: 'How long an average visit lasted, from first page to last activity.',
      },
    ],
  },
  {
    group: 'Pages',
    terms: [
      {
        term: 'Path',
        meaning: "The page's address after the site name — for example /pricing.",
      },
      {
        term: 'URL',
        meaning: 'The full page address, including anything after a question mark.',
      },
      {
        term: 'Entry page',
        meaning: 'The first page someone landed on when their visit started.',
      },
      {
        term: 'Exit page',
        meaning: 'The last page someone looked at before leaving.',
      },
      {
        term: 'Title',
        meaning: "The page's human-readable name, as shown in the browser tab.",
      },
    ],
  },
  {
    group: 'Where visitors come from',
    terms: [
      {
        term: 'Referrer',
        meaning:
          'The website someone was on right before they arrived — the site that linked to you.',
      },
      {
        term: 'Channel',
        meaning:
          'Referrers grouped into buckets: search engines, social media, email, ads, and so on.',
      },
      {
        term: 'Direct',
        meaning:
          'No referrer at all — the person typed the address, used a bookmark, or came from an app that hides where they were.',
      },
      {
        term: 'Campaign / UTM',
        meaning:
          "Tags added to links you share (like ?utm_source=newsletter) so visits from that link can be counted. 'UTM' is just the name of the tagging format.",
      },
    ],
  },
  {
    group: 'Actions',
    terms: [
      {
        term: 'Event',
        meaning:
          'One tracked action — a click, a purchase, a search. Events are counted every time they happen, so one person can produce many.',
      },
      {
        term: 'Unique events',
        meaning: "How many different kinds of actions happened — 'purchase' counts once here.",
      },
      {
        term: 'Properties',
        meaning:
          'The details attached to an action — which code was used, what was searched, how much was paid.',
      },
      {
        term: 'Rage click',
        meaning:
          'Three or more rapid clicks on the same thing within a second — a sign of a control that looks clickable but is broken or slow.',
      },
    ],
  },
  {
    group: 'Everything else',
    terms: [
      {
        term: 'Realtime',
        meaning: 'A live view of roughly the last 30 minutes.',
      },
      {
        term: 'Device / OS / Browser',
        meaning:
          'What the visitor used: phone, tablet or computer; its operating system (like iOS or Windows); and the browser (like Chrome or Safari).',
      },
      {
        term: 'Country data',
        meaning:
          "Worked out from the visitor's internet connection. Accurate to the country, mostly accurate to the city.",
      },
      {
        term: 'Session replay',
        meaning:
          'A recording of a visit you can play back. Anything typed into forms is masked with asterisks and never stored.',
      },
    ],
  },
];
