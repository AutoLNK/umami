'use client';
import { useMemo } from 'react';
import { Empty } from '@/components/common/Empty';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import { TypeIcon } from '@/components/common/TypeIcon';
import { useFormat, useMessages, useWebsiteMetricsQuery } from '@/components/hooks';
import { ListTable } from '@/components/metrics/ListTable';
import { percentFilter } from '@/lib/filters';
import { formatCount, NO_DATA_TEXT } from './copy';
import { getEventMeaning } from './eventDictionary';

export interface SimpleMetricsListProps {
  websiteId: string;
  type: 'path' | 'channel' | 'country' | 'event';
  title?: string;
  metric?: string;
  limit?: number;
}

// A deliberately inert version of MetricsTable: pretty labels (flags, channel
// names, event meanings) but NO row-click filtering — simple mode has no
// FilterBar, so a row click would apply an invisible filter with no way to
// see or clear it.
export function SimpleMetricsList({
  websiteId,
  type,
  title,
  metric,
  limit = 5,
}: SimpleMetricsListProps) {
  const { t, labels } = useMessages();
  const { formatValue } = useFormat();
  const { data, isLoading, isFetching, error } = useWebsiteMetricsQuery(websiteId, {
    type,
    limit,
  });

  const rows = useMemo(() => {
    return percentFilter((data as any[]) || []).map(({ x, y, z }) => ({
      label: x,
      count: y,
      percent: z,
    }));
  }, [data]);

  const renderLabel = ({ label }: { label: string }) => {
    switch (type) {
      case 'channel':
        return labels[label] ? t(labels[label]) : `(${t(labels.other)})`;
      case 'country':
        return (
          <TypeIcon type="country" value={label}>
            {formatValue(label, 'country')}
          </TypeIcon>
        );
      case 'event':
        return getEventMeaning(label).label;
      default:
        return label || `(${t(labels.none)})`;
    }
  };

  return (
    <LoadingPanel
      data={data}
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
      minHeight="240px"
      renderEmpty={() => <Empty message={NO_DATA_TEXT} />}
    >
      <ListTable
        data={rows}
        title={title}
        metric={metric}
        renderLabel={renderLabel}
        formatCount={formatCount}
      />
    </LoadingPanel>
  );
}
