import type { Metadata } from 'next';
import { SimpleGlossaryPage } from '@/components/simple/SimpleGlossaryPage';

export default async function () {
  return <SimpleGlossaryPage />;
}

export const metadata: Metadata = {
  title: 'Glossary',
};
