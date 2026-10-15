'use client';
import { StatusLight, Text } from '@umami/react-zen';
import { useActiveUsersQuery } from '@/components/hooks';
import { liveVisitorsText } from './copy';

export function SimpleLiveVisitors({ websiteId }: { websiteId: string }) {
  const { data } = useActiveUsersQuery(websiteId, { refetchInterval: 60000 });
  const count = data?.visitors || 0;

  if (count === 0) {
    return <Text color="muted">{liveVisitorsText(0)}</Text>;
  }

  return (
    <StatusLight variant="success">
      <Text weight="medium">{liveVisitorsText(count)}</Text>
    </StatusLight>
  );
}
