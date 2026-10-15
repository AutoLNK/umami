'use client';
import { Column, Row, Text } from '@umami/react-zen';
import { useMemo } from 'react';
import { Empty } from '@/components/common/Empty';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import { Panel } from '@/components/common/Panel';
import { useDateRange, useWebsiteMetricsQuery } from '@/components/hooks';
import { EVENTS_EXPLAINER, getPeriodPhrases, NO_DATA_TEXT } from './copy';
import { EVENT_CATEGORIES, getEventMeaning } from './eventDictionary';

const EVENT_LIMIT = 500;

interface EventRow {
  name: string;
  label: string;
  description: string;
  count: number;
}

// Plain-English translation of every tracked event in the current period,
// grouped by category. Purely additive — the raw events chart/table stays.
export function SimpleEventsExplainer({ websiteId }: { websiteId: string }) {
  const { dateRange } = useDateRange();
  const { data, isLoading, isFetching, error } = useWebsiteMetricsQuery(websiteId, {
    type: 'event',
    limit: EVENT_LIMIT,
  });

  const { groups, total } = useMemo(() => {
    const rows = (data as { x: string; y: number }[]) || [];
    const total = rows.reduce((sum, { y }) => sum + y, 0);
    const byCategory = new Map<string, EventRow[]>();

    for (const { x, y } of rows) {
      const meaning = getEventMeaning(x ?? '');
      const list = byCategory.get(meaning.category) ?? [];
      list.push({ name: x, label: meaning.label, description: meaning.description, count: y });
      byCategory.set(meaning.category, list);
    }

    const groups = EVENT_CATEGORIES.filter(category => byCategory.has(category)).map(category => ({
      category,
      events: byCategory.get(category),
    }));

    return { groups, total };
  }, [data]);

  const { period } = getPeriodPhrases(dateRange?.value);

  return (
    <LoadingPanel
      data={data}
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
      minHeight="200px"
      renderEmpty={() => <Empty message={NO_DATA_TEXT} />}
    >
      <Column gap="3">
        {total > 0 && (
          <Text size="lg" weight="bold">
            {EVENTS_EXPLAINER.summary(total, period)}
          </Text>
        )}
        {groups.map(({ category, events }) => {
          const isAutomatic = category === 'Automatic tracking';

          return (
            <Panel
              key={category}
              title={category}
              description={isAutomatic ? EVENTS_EXPLAINER.automaticNote : undefined}
            >
              <Column gap="5">
                {events.map(({ name, label, description, count }) => (
                  <Row key={name} justifyContent="space-between" alignItems="flex-start" gap="6">
                    <Column gap="1" style={{ minWidth: 0 }}>
                      <Row alignItems="center" gap="3" wrap="wrap">
                        <Text weight="bold" color={isAutomatic ? 'muted' : undefined}>
                          {label}
                        </Text>
                        <Text color="muted" size="xs" style={{ fontFamily: 'monospace' }}>
                          {name}
                        </Text>
                      </Row>
                      <Text color="muted" size="sm">
                        {description}
                      </Text>
                    </Column>
                    <Text weight="bold" wrap="nowrap" color={isAutomatic ? 'muted' : undefined}>
                      {EVENTS_EXPLAINER.countSuffix(count)}
                    </Text>
                  </Row>
                ))}
              </Column>
            </Panel>
          );
        })}
      </Column>
    </LoadingPanel>
  );
}
