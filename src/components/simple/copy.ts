// All plain-English copy for the simple-mode additions. Deliberately NOT in
// the i18n files: the audience is the English-speaking internal team, and
// keeping this here avoids touching upstream-merged locale files.

// Captions shown under the SAME five metrics the normal view shows
// (keys match the upstream stat names).
export const METRIC_CAPTIONS = {
  visitors: 'How many different people visited your site.',
  visits: 'Total times people visited. One person can visit more than once.',
  views: 'Total number of pages people looked at.',
  bounceRate: 'Share of visits where someone looked at one page and left. Lower is better.',
  visitDuration: 'How long an average visit lasted.',
};

export const WHATS_HAPPENING_TITLE = "What's happening";

export const CHART_CAPTION = 'Taller bars mean busier times.';

export const ACTIONS_PANEL = {
  title: 'What people did',
  caption: 'The most common tracked actions, in plain English.',
};

export const TIMES_METRIC = 'Times';

export const NO_DATA_TEXT = 'Nothing to show for this time period.';

export const SEE_ALL_ACTIONS = 'See every action explained';

export function formatCount(value: number): string {
  return Math.round(Number(value) || 0).toLocaleString();
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

export function getPeriodPhrases(value: string): { period: string; vs: string } {
  if (value === '0day') {
    return { period: 'today', vs: 'vs. yesterday' };
  }

  const match = /^(\d+)(hour|day|week|month|year)$/.exec(value || '');

  if (match) {
    const num = Number(match[1]);
    const unit = match[2];

    if (num > 0) {
      const unitLabel = num === 1 ? unit : `${unit}s`;
      return {
        period: `in the last ${num} ${unitLabel}`,
        vs: `vs. the ${num} ${unitLabel} before`,
      };
    }

    // 0week / 0month / 0year mean "this week/month/year"
    return { period: `this ${unit}`, vs: `vs. the ${unit} before` };
  }

  return { period: 'in this time period', vs: 'vs. the period before' };
}

// One full sentence per traffic channel (values from getChannelMetrics).
export const CHANNEL_INSIGHTS: Record<string, string> = {
  direct: 'Most visitors typed your web address directly or used a bookmark.',
  organicSearch: 'Most visitors found you through a search engine like Google.',
  paidSearch: 'Most visitors came from paid search ads on Google or Bing.',
  organicSocial: 'Most visitors came from social media.',
  paidSocial: 'Most visitors came from paid social media ads.',
  email: 'Most visitors came from links in emails.',
  referral: 'Most visitors came from links on other websites.',
  affiliate: 'Most visitors came from affiliate links.',
  paidAds: 'Most visitors came from paid ads.',
  llm: 'Most visitors came from AI assistants like ChatGPT.',
  organicVideo: 'Most visitors came from video sites like YouTube.',
  paidVideo: 'Most visitors came from paid video ads.',
  organicShopping: 'Most visitors came from shopping sites.',
  paidShopping: 'Most visitors came from paid shopping ads.',
  sms: 'Most visitors came from text messages.',
};

export function liveVisitorsText(count: number): string {
  if (count === 0) {
    return 'No one is on your site right now';
  }
  return `${formatCount(count)} ${pluralize(count, 'person is', 'people are')} on your site right now`;
}

// One-line captions shown under the EXISTING overview section headings when
// simple mode is on (rendered by small gated additions in WebsitePanels.tsx).
export const SECTION_HELP = {
  pages:
    "The pages people looked at. 'Path' is the page address, 'Entry' is the first page of a visit, 'Exit' is the last one. 'Titles' shows pages by their real names; 'Sites' shows which of your branded domains got the traffic.",
  sources:
    "Where visitors came from. 'Referrers' are websites that linked to you; 'Channels' groups them into types like search, social, or direct.",
  environment: 'What visitors used — their web browser, operating system (OS), and device type.',
  location: 'Where in the world your visitors were.',
  traffic: 'When people visit during the week — each dot is one hour, bigger dots mean busier.',
};

// Hover tooltips for the events-page metric cards (gated in EventsMetricsBar.tsx).
export const EVENT_METRIC_HELP = {
  visitors: 'How many different people did at least one tracked action.',
  visits: 'Total visits in which tracked actions happened.',
  events: 'Total number of tracked actions. One person can do many.',
  uniqueEvents: "How many different kinds of actions were done — 'purchase' counts once here.",
};

// Intro lines for existing pages (gated one-line additions).
export const PAGE_HELP = {
  eventsTabs:
    "The chart shows how often each action happened over time. 'Activity' lists every single action as it happened. 'Properties' shows the extra details actions carry.",
  sessions:
    'Each row is one visitor. Click their picture to see everything they did — every page viewed and action taken.',
  realtime:
    'A live view of the last 30 minutes — who is on the site right now and what they are doing.',
};

export const CAMPAIGNS_PANEL = {
  title: 'Campaigns',
  caption:
    'Which marketing campaigns brought visitors — read from the tags (UTM) on your links. Visits with no campaign tag are not listed here.',
  tabs: { source: 'Sources', medium: 'Mediums', campaign: 'Campaigns' },
};

export const FRUSTRATION_PANEL = {
  title: 'Where people got frustrated',
  caption:
    'Buttons and links people clicked three or more times in a row — usually a sign something looks clickable but is broken or slow.',
  metric: 'Bursts',
  empty: 'No rage clicks in this period — nothing looks broken.',
};

// Extra tab labels added (in simple mode) to the existing Pages panel.
export const PAGES_EXTRA_TABS = {
  title: 'Titles',
  hostname: 'Sites',
  titleColumn: 'Page title',
  hostnameColumn: 'Site',
};

export const EVENTS_EXPLAINER = {
  title: 'What these events mean',
  caption: 'Every tracked action from the table above, translated into plain English.',
  summary: (total: number, period: string) =>
    `People did ${formatCount(total)} tracked ${pluralize(total, 'action', 'actions')} ${period}.`,
  automaticNote:
    'These fire automatically on every click or screen — background detail, not deliberate actions.',
  countSuffix: (count: number) => `× ${formatCount(count)}`,
};
