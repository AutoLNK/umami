import type { Metadata } from 'next';
import { SimpleEventsPageSwitch } from '@/components/simple';

export default async function ({ params }: { params: Promise<{ websiteId: string }> }) {
  const { websiteId } = await params;

  return <SimpleEventsPageSwitch websiteId={websiteId} />;
}

export const metadata: Metadata = {
  title: 'Events',
};
