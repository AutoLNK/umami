'use client';
import { useMemo } from 'react';
import { Empty } from '@/components/common/Empty';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import { Panel } from '@/components/common/Panel';
import { usePropertyValuesQuery } from '@/components/hooks';
import { ListTable } from '@/components/metrics/ListTable';
import { percentFilter } from '@/lib/filters';
import { FRUSTRATION_PANEL, formatCount } from './copy';

// The `rage-click` event carries the clicked element's visible text — ranking
// those values shows exactly which controls people hammered on in frustration.
const RAGE_CLICK_EVENT = 'rage-click';
const RAGE_CLICK_PROPERTY = 'text';

export function SimpleFrustrationPanel({ websiteId }: { websiteId: string }) {
  const { data, isLoading, isFetching, error } = usePropertyValuesQuery(
    'event',
    websiteId,
    RAGE_CLICK_PROPERTY,
    undefined,
    [],
    RAGE_CLICK_EVENT,
  );

  const rows = useMemo(() => {
    const values = (data as { value: string; total: number }[]) || [];
    return percentFilter(values.map(({ value, total }) => ({ x: value, y: Number(total) }))).map(
      ({ x, y, z }) => ({ label: x || '(no text)', count: y, percent: z }),
    );
  }, [data]);

  return (
    <Panel title={FRUSTRATION_PANEL.title} description={FRUSTRATION_PANEL.caption}>
      <LoadingPanel
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        minHeight="240px"
        renderEmpty={() => <Empty message={FRUSTRATION_PANEL.empty} />}
      >
        <ListTable data={rows} metric={FRUSTRATION_PANEL.metric} formatCount={formatCount} />
      </LoadingPanel>
    </Panel>
  );
}
