'use client';
import { Column, Grid, Heading, Text } from '@umami/react-zen';
import { Panel } from '@/components/common/Panel';
import { GLOSSARY, GLOSSARY_INTRO, GLOSSARY_TITLE } from './glossary';

export function SimpleGlossaryPage() {
  return (
    <Column gap="3">
      <Panel title={GLOSSARY_TITLE} description={GLOSSARY_INTRO}>
        <Column gap="6">
          {GLOSSARY.map(({ group, terms }) => (
            <Column key={group} gap="4">
              <Heading size="lg">{group}</Heading>
              <Column gap="4">
                {terms.map(({ term, meaning }) => (
                  <Grid key={term} columns={{ base: '1fr', md: '220px 1fr' }} gap="3">
                    <Text weight="bold">{term}</Text>
                    <Text color="muted">{meaning}</Text>
                  </Grid>
                ))}
              </Column>
            </Column>
          ))}
        </Column>
      </Panel>
    </Column>
  );
}
