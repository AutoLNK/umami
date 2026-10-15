// Per-bucket caveats, distilled from the Tracking Atlas "Looks broken, isn't"
// section. Matched on the website's name so a rename to something unrelated
// simply drops the note.

const NOTES: { match: RegExp; note: string }[] = [
  {
    match: /dev/i,
    note: 'This is a test bucket. It only collects developer test traffic, so it is supposed to look almost empty.',
  },
  {
    match: /dashboard/i,
    note: 'This bucket tracks the organizer admin. Only staff and organizers use it, so small numbers are normal — what matters here is which features get used.',
  },
  {
    match: /app/i,
    note: 'This bucket tracks the mobile app. Trust the action counts — "People" and visit counts are only approximate for apps.',
  },
];

export function getWebsiteNote(websiteName?: string): string | null {
  if (!websiteName) {
    return null;
  }
  return NOTES.find(({ match }) => match.test(websiteName))?.note ?? null;
}
