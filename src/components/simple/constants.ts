// AutoLNK-only module. Everything for "Simple mode" lives under src/components/simple/
// so upstream Umami merges never touch it.

// localStorage key following the `umami.*` convention in src/lib/constants.ts.
// Values are the strings 'on' | 'off' (never booleans — setItem() in src/lib/storage.ts
// silently no-ops on falsy data). An absent key means ON: simple mode is the default.
export const SIMPLE_MODE_CONFIG = 'umami.simple-mode';
