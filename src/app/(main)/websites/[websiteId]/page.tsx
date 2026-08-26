import type { Metadata } from 'next';
import { SimpleWebsitePageSwitch } from '@/components/simple';

export default async function ({ params }: { params: Promise<{ websiteId: string }> }) {
  const { websiteId } = await params;

  return <SimpleWebsitePageSwitch websiteId={websiteId} />;
}

export const metadata: Metadata = {
  title: 'Websites',
};
