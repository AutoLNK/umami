'use client';
import { WebsitePage } from '@/app/(main)/websites/[websiteId]/WebsitePage';
import { SimpleWebsitePage } from './SimpleWebsitePage';
import { useSimpleMode } from './useSimpleMode';

export function SimpleWebsitePageSwitch({ websiteId }: { websiteId: string }) {
  const { simpleMode } = useSimpleMode();

  return simpleMode ? (
    <SimpleWebsitePage websiteId={websiteId} />
  ) : (
    <WebsitePage websiteId={websiteId} />
  );
}
