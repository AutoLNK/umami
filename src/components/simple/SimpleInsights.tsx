'use client';
import { Column, Icon, Row, Text } from '@umami/react-zen';
import type { ReactNode } from 'react';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Compass,
  FileText,
  Info,
  MapPin,
  MousePointerClick,
  TrendingDown,
  TrendingUp,
} from '@/components/icons';
import { type SimpleInsight, useSimpleInsights } from './useSimpleInsights';

const ICONS: Record<SimpleInsight['id'], ReactNode> = {
  noTraffic: <Info />,
  summary: <BarChart3 />,
  trendUp: <TrendingUp />,
  trendDown: <TrendingDown />,
  trendFlat: <ArrowRight />,
  topSource: <Compass />,
  topPage: <FileText />,
  topAction: <MousePointerClick />,
  topCountry: <MapPin />,
  busiestDay: <CalendarDays />,
};

export function SimpleInsights({ websiteId }: { websiteId: string }) {
  const { insights, isLoading, error } = useSimpleInsights(websiteId);

  return (
    <LoadingPanel data={insights} isLoading={isLoading} error={error} minHeight="120px">
      <Column gap="3">
        {insights.map(({ id, text }, index) => (
          <Row key={`${id}${index}`} alignItems="center" gap="3">
            <Icon color="muted" size="sm">
              {ICONS[id]}
            </Icon>
            <Text>{text}</Text>
          </Row>
        ))}
      </Column>
    </LoadingPanel>
  );
}
