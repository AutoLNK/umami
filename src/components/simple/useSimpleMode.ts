'use client';
import { create } from 'zustand';
import { getItem, setItem } from '@/lib/storage';
import { SIMPLE_MODE_CONFIG } from './constants';

// Module-scope init mirrors src/store/app.ts (theme/locale/date-range): safe because
// the (main) app renders <Loading/> until client queries resolve, so nothing
// simple-mode-dependent is ever server-rendered.
const store = create<{ simpleMode: boolean }>(() => ({
  simpleMode: getItem(SIMPLE_MODE_CONFIG) !== 'off',
}));

export function useSimpleMode() {
  const simpleMode = store(state => state.simpleMode);

  const setSimpleMode = (value: boolean) => {
    setItem(SIMPLE_MODE_CONFIG, value ? 'on' : 'off');
    store.setState({ simpleMode: value });
  };

  const toggleSimpleMode = () => setSimpleMode(!store.getState().simpleMode);

  return { simpleMode, setSimpleMode, toggleSimpleMode };
}
