// Barrel for the isolated "Simple mode" module — the only entry point upstream
// files import from, keeping their diffs to one-line imports. Deliberately NOT
// exported from src/index.ts (the published component package).
export * from './constants';
export * from './copy';
export * from './eventDictionary';
export * from './SimpleEventsPageSwitch';
export * from './SimpleModeSetting';
export * from './SimpleWebsitePageSwitch';
export * from './useSimpleMode';
