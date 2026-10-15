import { LoadingPanel } from '@/components/common/LoadingPanel';
import { useDateRange, useMessages } from '@/components/hooks';
import { useEventStatsQuery } from '@/components/hooks/queries/useEventStatsQuery';
import { MetricCard } from '@/components/metrics/MetricCard';
import { MetricsBar } from '@/components/metrics/MetricsBar';
import { EVENT_METRIC_HELP, useSimpleMode } from '@/components/simple';
import { formatLongNumber } from '@/lib/format';

export function EventsMetricsBar({ websiteId }: { websiteId: string }) {
  const { isAllTime } = useDateRange();
  const { t, labels, getErrorMessage } = useMessages();
  const { simpleMode } = useSimpleMode();
  const { data, isLoading, isFetching, error } = useEventStatsQuery({
    websiteId,
  });

  const { events, visitors, visits, uniqueEvents, comparison } = data || {};

  const metrics = data
    ? [
        {
          value: visitors,
          label: t(labels.visitors),
          change: visitors - comparison.visitors,
          formatValue: formatLongNumber,
          tooltip: simpleMode ? EVENT_METRIC_HELP.visitors : undefined,
        },
        {
          value: visits,
          label: t(labels.visits),
          change: visits - comparison.visits,
          formatValue: formatLongNumber,
          tooltip: simpleMode ? EVENT_METRIC_HELP.visits : undefined,
        },
        {
          value: events,
          label: t(labels.events),
          change: events - comparison.events,
          formatValue: formatLongNumber,
          tooltip: simpleMode ? EVENT_METRIC_HELP.events : undefined,
        },
        {
          value: uniqueEvents,
          label: t(labels.uniqueEvents),
          change: uniqueEvents - comparison.uniqueEvents,
          formatValue: formatLongNumber,
          tooltip: simpleMode ? EVENT_METRIC_HELP.uniqueEvents : undefined,
        },
      ]
    : null;

  return (
    <LoadingPanel
      data={metrics}
      isLoading={isLoading}
      isFetching={isFetching}
      error={getErrorMessage(error)}
      minHeight="136px"
    >
      <MetricsBar>
        {metrics?.map(({ label, value, change, formatValue, tooltip }) => {
          return (
            <MetricCard
              key={label}
              value={value}
              label={label}
              change={change}
              formatValue={formatValue}
              showChange={!isAllTime}
              tooltip={tooltip}
            />
          );
        })}
      </MetricsBar>
    </LoadingPanel>
  );
}
