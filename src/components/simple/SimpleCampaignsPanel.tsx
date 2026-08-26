'use client';
import { Tab, TabList, TabPanel, Tabs } from '@umami/react-zen';
import { Panel } from '@/components/common/Panel';
import { useMessages } from '@/components/hooks';
import { MetricsTable } from '@/components/metrics/MetricsTable';
import { CAMPAIGNS_PANEL } from './copy';

// Surfaces the UTM data (normally tucked away on the UTM report page) as an
// overview table, in the same style as the upstream panels.
export function SimpleCampaignsPanel({ websiteId }: { websiteId: string }) {
  const { t, labels } = useMessages();
  const tableProps = {
    websiteId,
    limit: 10,
    allowDownload: false,
    showMore: true,
    metric: t(labels.visitors),
  };

  return (
    <Panel title={CAMPAIGNS_PANEL.title} description={CAMPAIGNS_PANEL.caption}>
      <Tabs>
        <TabList>
          <Tab id="utmSource">{CAMPAIGNS_PANEL.tabs.source}</Tab>
          <Tab id="utmMedium">{CAMPAIGNS_PANEL.tabs.medium}</Tab>
          <Tab id="utmCampaign">{CAMPAIGNS_PANEL.tabs.campaign}</Tab>
        </TabList>
        <TabPanel id="utmSource">
          <MetricsTable type="utmSource" title={CAMPAIGNS_PANEL.tabs.source} {...tableProps} />
        </TabPanel>
        <TabPanel id="utmMedium">
          <MetricsTable type="utmMedium" title={CAMPAIGNS_PANEL.tabs.medium} {...tableProps} />
        </TabPanel>
        <TabPanel id="utmCampaign">
          <MetricsTable type="utmCampaign" title={CAMPAIGNS_PANEL.tabs.campaign} {...tableProps} />
        </TabPanel>
      </Tabs>
    </Panel>
  );
}
