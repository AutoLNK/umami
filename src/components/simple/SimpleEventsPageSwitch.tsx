'use client';
import { EventsPage } from '@/app/(main)/websites/[websiteId]/events/EventsPage';
import { SimpleEventsPage } from './SimpleEventsPage';
import { useSimpleMode } from './useSimpleMode';

export function SimpleEventsPageSwitch({ websiteId }: { websiteId: string }) {
  const { simpleMode } = useSimpleMode();

  return simpleMode ? (
    <SimpleEventsPage websiteId={websiteId} />
  ) : (
    <EventsPage websiteId={websiteId} />
  );
}
