'use client';
import { Column, Icon, Row, Text } from '@umami/react-zen';
import { ExpandedViewModal } from '@/app/(main)/websites/[websiteId]/ExpandedViewModal';
import { WebsiteChart } from '@/app/(main)/websites/[websiteId]/WebsiteChart';
import { WebsiteControls } from '@/app/(main)/websites/[websiteId]/WebsiteControls';
import { WebsitePanels } from '@/app/(main)/websites/[websiteId]/WebsitePanels';
import { GridRow } from '@/components/common/GridRow';
import Link from '@/components/common/Link';
import { Panel } from '@/components/common/Panel';
import { useNavigation, useWebsite } from '@/components/hooks';
import { ArrowRight, Info } from '@/components/icons';
import { UnitFilter } from '@/components/input/UnitFilter';
import {
  ACTIONS_PANEL,
  CHART_CAPTION,
  SEE_ALL_ACTIONS,
  TIMES_METRIC,
  WHATS_HAPPENING_TITLE,
} from './copy';
import { SimpleCampaignsPanel } from './SimpleCampaignsPanel';
import { SimpleFrustrationPanel } from './SimpleFrustrationPanel';
import { SimpleInsights } from './SimpleInsights';
import { SimpleLiveVisitors } from './SimpleLiveVisitors';
import { SimpleMetricsBar } from './SimpleMetricsBar';
import { SimpleMetricsList } from './SimpleMetricsList';
import { getWebsiteNote } from './websiteNotes';

// The FULL upstream overview (same controls, same stats, same panels, same
// drill-downs — mirrors WebsitePage.tsx exactly), plus the plain-English
// layer: a takeaways panel, captions under the metrics, a chart caption, an
// explained "What people did" panel, and per-bucket notes. Nothing removed.
export function SimpleWebsitePage({ websiteId }: { websiteId: string }) {
  const website = useWebsite();
  const { renderUrl } = useNavigation();
  const note = getWebsiteNote(website?.name);

  return (
    <Column gap>
      <WebsiteControls websiteId={websiteId} allowBounceFilter={true} />
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
      <Panel title={WHATS_HAPPENING_TITLE}>
        <SimpleLiveVisitors websiteId={websiteId} />
        <SimpleInsights websiteId={websiteId} />
      </Panel>
      <SimpleMetricsBar websiteId={websiteId} />
      <Panel minHeight="520px" description={CHART_CAPTION}>
        <Row justifyContent="end">
          <UnitFilter />
        </Row>
        <WebsiteChart websiteId={websiteId} />
      </Panel>
      <WebsitePanels websiteId={websiteId} />
      <Panel title={ACTIONS_PANEL.title} description={ACTIONS_PANEL.caption}>
        <SimpleMetricsList websiteId={websiteId} type="event" metric={TIMES_METRIC} />
        <Row justifyContent="flex-end" alignItems="center">
          <Link href={renderUrl(`/websites/${websiteId}/events`)}>
            <Row alignItems="center" gap="2">
              <Text>{SEE_ALL_ACTIONS}</Text>
              <Icon size="sm">
                <ArrowRight />
              </Icon>
            </Row>
          </Link>
        </Row>
      </Panel>
      <GridRow layout="two">
        <SimpleCampaignsPanel websiteId={websiteId} />
        <SimpleFrustrationPanel websiteId={websiteId} />
      </GridRow>
      <ExpandedViewModal websiteId={websiteId} />
    </Column>
  );
}
