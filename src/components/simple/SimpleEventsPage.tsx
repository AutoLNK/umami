'use client';
import { Column, Icon, Row, Tab, TabList, TabPanel, Tabs, Text } from '@umami/react-zen';
import { type Key, useState } from 'react';
import { EventProperties } from '@/app/(main)/websites/[websiteId]/events/EventProperties';
import { EventsDataTable } from '@/app/(main)/websites/[websiteId]/events/EventsDataTable';
import { EventsMetricsBar } from '@/app/(main)/websites/[websiteId]/events/EventsMetricsBar';
import { SessionModal } from '@/app/(main)/websites/[websiteId]/sessions/SessionModal';
import { WebsiteControls } from '@/app/(main)/websites/[websiteId]/WebsiteControls';
import { Panel } from '@/components/common/Panel';
import { useMessages, useWebsite } from '@/components/hooks';
import { Info } from '@/components/icons';
import { EventsChart } from '@/components/metrics/EventsChart';
import { MetricsTable } from '@/components/metrics/MetricsTable';
import { getItem, setItem } from '@/lib/storage';
import { EVENTS_EXPLAINER, PAGE_HELP } from './copy';
import { SimpleEventsExplainer } from './SimpleEventsExplainer';
import { getWebsiteNote } from './websiteNotes';

// Same localStorage key as the upstream EventsPage, so the selected tab is
// shared between simple and full view.
const KEY_NAME = 'umami.events.tab';

// The FULL upstream events page (same controls, metrics bar, chart/activity/
// properties tabs — mirrors EventsPage.tsx exactly), plus the plain-English
// layer appended: per-bucket notes and "What these events mean". Nothing removed.
export function SimpleEventsPage({ websiteId }: { websiteId: string }) {
  const [tab, setTab] = useState(getItem(KEY_NAME) || 'chart');
  const { t, labels } = useMessages();
  const website = useWebsite();
  const note = getWebsiteNote(website?.name);

  const handleSelect = (value: Key) => {
    setItem(KEY_NAME, value);
    setTab(value);
  };

  return (
    <Column gap="3">
      <WebsiteControls websiteId={websiteId} />
      {note && (
        <Panel paddingY="4">
          <Row alignItems="center" gap="3">
            <Icon color="muted">
              <Info />
            </Icon>
            <Text color="muted">{note}</Text>
          </Row>
        </Panel>
      )}
      <EventsMetricsBar websiteId={websiteId} />
      <Panel minWidth="0" width="100%" style={{ overflow: 'hidden' }}>
        <Text size="sm" color="muted">
          {PAGE_HELP.eventsTabs}
        </Text>
        <Tabs
          selectedKey={tab}
          onSelectionChange={key => handleSelect(key)}
          style={{ minWidth: 0, width: '100%' }}
        >
          <TabList>
            <Tab id="chart">{t(labels.chart)}</Tab>
            <Tab id="activity">{t(labels.activity)}</Tab>
            <Tab id="properties">{t(labels.properties)}</Tab>
          </TabList>
          <TabPanel id="activity" style={{ minWidth: 0, width: '100%' }}>
            <EventsDataTable websiteId={websiteId} />
          </TabPanel>
          <TabPanel id="chart" style={{ minWidth: 0, width: '100%' }}>
            <Column gap="6">
              <Column border="bottom" paddingBottom="6">
                <EventsChart websiteId={websiteId} limit={50} />
              </Column>
              <MetricsTable
                websiteId={websiteId}
                type="event"
                title={t(labels.event)}
                metric={t(labels.count)}
                limit={50}
              />
            </Column>
          </TabPanel>
          <TabPanel id="properties" style={{ minWidth: 0, width: '100%', overflow: 'hidden' }}>
            <EventProperties websiteId={websiteId} />
          </TabPanel>
        </Tabs>
      </Panel>
      <Panel title={EVENTS_EXPLAINER.title} description={EVENTS_EXPLAINER.caption}>
        <SimpleEventsExplainer websiteId={websiteId} />
      </Panel>
      <SessionModal websiteId={websiteId} />
    </Column>
  );
}
