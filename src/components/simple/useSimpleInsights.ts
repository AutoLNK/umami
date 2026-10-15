'use client';
import {
  useCountryNames,
  useDateRange,
  useLocale,
  useWebsiteMetricsQuery,
} from '@/components/hooks';
import { useWebsitePageviewsQuery } from '@/components/hooks/queries/useWebsitePageviewsQuery';
import { useWebsiteStatsQuery } from '@/components/hooks/queries/useWebsiteStatsQuery';
import { formatDate } from '@/lib/date';
import { CHANNEL_INSIGHTS, formatCount, getPeriodPhrases, pluralize } from './copy';
import { AUTOMATIC_EVENTS, getEventMeaning } from './eventDictionary';

export interface SimpleInsight {
  id:
    | 'noTraffic'
    | 'summary'
    | 'trendUp'
    | 'trendDown'
    | 'trendFlat'
    | 'topSource'
    | 'topPage'
    | 'topAction'
    | 'topCountry'
    | 'busiestDay';
  text: string;
}

const MAX_INSIGHTS = 6;

// Queries share params with visible components on the page (stats bar, chart,
// panel tables, actions list) wherever possible, so react-query dedupes them
// and the insights block adds almost no extra HTTP calls.
export function useSimpleInsights(websiteId: string) {
  const { isAllTime, dateRange } = useDateRange();
  const { locale } = useLocale();
  const { countryNames } = useCountryNames(locale);
  // limit 10 matches the WebsitePanels tables and limit 5 matches the "What
  // people did" panel, so react-query serves these from the same requests.
  const stats = useWebsiteStatsQuery({ websiteId });
  const channels = useWebsiteMetricsQuery(websiteId, { type: 'channel', limit: 10 });
  const pages = useWebsiteMetricsQuery(websiteId, { type: 'path', limit: 10 });
  const countries = useWebsiteMetricsQuery(websiteId, { type: 'country', limit: 10 });
  const events = useWebsiteMetricsQuery(websiteId, { type: 'event', limit: 5 });
  const series = useWebsitePageviewsQuery({ websiteId });

  const queries = [stats, channels, pages, countries, events, series];
  const isLoading = queries.some(query => query.isLoading);
  const error = queries.find(query => query.error)?.error;

  const insights: SimpleInsight[] = [];

  if (!isLoading && stats.data) {
    const { visits = 0, visitors = 0, comparison } = stats.data;
    const { period, vs } = getPeriodPhrases(dateRange?.value);

    if (visits === 0) {
      insights.push({
        id: 'noTraffic',
        text: `No one visited your site ${period}. Once people start visiting, you'll see numbers here.`,
      });

      return { insights, isLoading, error };
    }

    insights.push({
      id: 'summary',
      text: `Your site had ${formatCount(visits)} ${pluralize(visits, 'visit', 'visits')} from ${formatCount(visitors)} ${pluralize(visitors, 'person', 'people')} ${period}.`,
    });

    if (!isAllTime && comparison?.visits > 0) {
      const pct = Math.round(Math.abs(((visits - comparison.visits) / comparison.visits) * 100));

      if (pct < 5) {
        insights.push({ id: 'trendFlat', text: "That's about the same as before." });
      } else if (visits > comparison.visits && pct > 500) {
        insights.push({ id: 'trendUp', text: `That's more than five times ${vs}.` });
      } else if (visits > comparison.visits) {
        insights.push({ id: 'trendUp', text: `That's up ${pct}% ${vs}.` });
      } else {
        insights.push({ id: 'trendDown', text: `That's down ${pct}% ${vs}.` });
      }
    }

    const topChannel = channels.data?.[0]?.x;
    if (topChannel && CHANNEL_INSIGHTS[topChannel]) {
      insights.push({ id: 'topSource', text: CHANNEL_INSIGHTS[topChannel] });
    }

    const topPage = pages.data?.[0]?.x;
    if (topPage) {
      insights.push({
        id: 'topPage',
        text:
          topPage === '/'
            ? 'Your homepage was the most-visited page.'
            : `The most-visited page was ${topPage}.`,
      });
    }

    const topEvent = events.data?.find(({ x }) => x && !AUTOMATIC_EVENTS.includes(x))?.x;
    if (topEvent && insights.length < MAX_INSIGHTS) {
      insights.push({
        id: 'topAction',
        text: `The most common action was: ${getEventMeaning(topEvent).label}.`,
      });
    }

    const topCountry = countries.data?.[0]?.x;
    const countryName = topCountry && countryNames[topCountry];
    if (countryName && insights.length < MAX_INSIGHTS) {
      insights.push({ id: 'topCountry', text: `Most visitors were in ${countryName}.` });
    }

    const sessions = series.data?.sessions;
    if (insights.length < MAX_INSIGHTS && dateRange?.unit === 'day' && sessions?.length > 0) {
      const busiest = sessions.reduce((max, point) => (point.y > max.y ? point : max), sessions[0]);

      if (busiest?.y > 0) {
        insights.push({
          id: 'busiestDay',
          text: `Your busiest day was ${formatDate(busiest.x, 'EEEE, MMM d', locale)}.`,
        });
      }
    }
  }

  return { insights: insights.slice(0, MAX_INSIGHTS), isLoading, error };
}
