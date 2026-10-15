'use client';
import { Column, Switch, Text } from '@umami/react-zen';
import { useMessages } from '@/components/hooks';
import { useSimpleMode } from './useSimpleMode';

export function SimpleModeSetting() {
  const { t, labels, messages } = useMessages();
  const { simpleMode, setSimpleMode } = useSimpleMode();

  return (
    <Column gap="2">
      <Switch isSelected={simpleMode} onChange={setSimpleMode}>
        {t(labels.simpleMode)}
      </Switch>
      <Text color="muted" size="sm">
        {t(messages.simpleModeDescription)}
      </Text>
    </Column>
  );
}
