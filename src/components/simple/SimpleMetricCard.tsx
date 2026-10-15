'use client';
import { Column, Row, Text } from '@umami/react-zen';
import { ChangeLabel } from '@/components/metrics/ChangeLabel';
import { formatCount } from './copy';

export interface SimpleMetricCardProps {
  label: string;
  caption: string;
  value: number;
  previousValue?: number;
  vsText?: string;
  showChange?: boolean;
  reverseColors?: boolean;
  formatValue?: (n: number) => string;
}

// Same stat as the upstream MetricCard, plus an always-visible plain-English
// caption and a spelled-out comparison ("vs. the 30 days before").
export function SimpleMetricCard({
  label,
  caption,
  value = 0,
  previousValue = 0,
  vsText,
  showChange = true,
  reverseColors = false,
  formatValue = formatCount,
}: SimpleMetricCardProps) {
  const change = value - previousValue;
  const pct = previousValue !== 0 ? (change / previousValue) * 100 : value !== 0 ? 100 : 0;

  return (
    <Column
      justifyContent="flex-start"
      paddingX="6"
      paddingY="4"
      borderRadius
      backgroundColor="surface-base"
      border
      gap="3"
    >
      <Text weight="bold">{label}</Text>
      <Text size="4xl" weight="bold" wrap="nowrap">
        <span title={value?.toString()}>{formatValue(value)}</span>
      </Text>
      <Text color="muted" size="sm">
        {caption}
      </Text>
      {showChange && (
        <Row alignItems="center" gap="3" wrap="wrap">
          <ChangeLabel
            value={change}
            title={formatValue(Math.abs(change))}
            reverseColors={reverseColors}
            borderRadius
          >
            {`${Math.abs(Math.round(pct))}%`}
          </ChangeLabel>
          {vsText && (
            <Text color="muted" size="sm">
              {vsText}
            </Text>
          )}
        </Row>
      )}
    </Column>
  );
}
