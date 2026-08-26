'use client';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import { useDateRange, useMessages } from '@/components/hooks';
import { useWebsiteStatsQuery } from '@/components/hooks/queries/useWebsiteStatsQuery';
import { MetricsBar } from '@/components/metrics/MetricsBar';
import { formatShortTime } from '@/lib/format';
import { getPeriodPhrases, METRIC_CAPTIONS } from './copy';
import { SimpleMetricCard, type SimpleMetricCardProps } from './SimpleMetricCard';

// The SAME five metrics as the upstream WebsiteMetricsBar (same names, same
// math, same query) — plus visible captions explaining each one, full numbers
// instead of "1.5k", and a spelled-out comparison period.
export function SimpleMetricsBar({ websiteId }: { websiteId: string }) {
  const { isAllTime, dateRange } = useDateRange();
  const { t, labels, getErrorMessage } = useMessages();
  const { data, isLoading, isFetching, error } = useWebsiteStatsQuery({ websiteId });
  const { vs } = getPeriodPhrases(dateRange?.value);

  const { pageviews = 0, visitors = 0, visits = 0, bounces = 0, totaltime = 0 } = data || {};
  const prev = data?.comparison || {
    pageviews: 0,
    visitors: 0,
    visits: 0,
    bounces: 0,
    totaltime: 0,
  };

  const bounceRate = visits ? (Math.min(visits, bounces) / visits) * 100 : 0;
  const prevBounceRate = prev.visits
    ? (Math.min(prev.visits, prev.bounces) / prev.visits) * 100
    : 0;
  const duration = visits ? totaltime / visits : 0;
  const prevDuration = prev.visits ? prev.totaltime / prev.visits : 0;

  const cards: SimpleMetricCardProps[] = data
    ? [
        {
          label: t(labels.visitors),
          caption: METRIC_CAPTIONS.visitors,
          value: visitors,
          previousValue: prev.visitors,
        },
        {
          label: t(labels.visits),
          caption: METRIC_CAPTIONS.visits,
          value: visits,
          previousValue: prev.visits,
        },
        {
          label: t(labels.views),
          caption: METRIC_CAPTIONS.views,
          value: pageviews,
          previousValue: prev.pageviews,
        },
        {
          label: t(labels.bounceRate),
          caption: METRIC_CAPTIONS.bounceRate,
          value: bounceRate,
          previousValue: prevBounceRate,
          formatValue: (n: number) => `${Math.round(Math.abs(n))}%`,
          reverseColors: true,
        },
        {
          label: t(labels.visitDuration),
          caption: METRIC_CAPTIONS.visitDuration,
          value: duration,
          previousValue: prevDuration,
          formatValue: (n: number) => formatShortTime(Math.abs(~~n), ['m', 's'], ' '),
        },
      ]
    : null;

  return (
    <LoadingPanel
      data={cards}
      isLoading={isLoading}
      isFetching={isFetching}
      error={getErrorMessage(error)}
      minHeight="200px"
    >
      <MetricsBar columns="repeat(auto-fit, minmax(220px, 1fr))">
        {cards?.map(card => (
          <SimpleMetricCard key={card.label} {...card} vsText={vs} showChange={!isAllTime} />
        ))}
      </MetricsBar>
    </LoadingPanel>
  );
}
