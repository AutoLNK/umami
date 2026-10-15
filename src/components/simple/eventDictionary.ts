// Plain-English meanings for AutoLNK's tracked events, transcribed from the
// "AutoLNK Tracking Atlas" (https://claude.ai/code/artifact/cd1e9343-1f7c-4e01-bfa2-116d5d59ffd1).
// Covers the storefront, organizer dashboard, and mobile app streams. Names the
// teams add later fall back to a prettified name — update this file (a copy
// edit, no upstream impact) to give them a proper meaning.

export interface EventMeaning {
  label: string;
  description: string;
  category: string;
}

export const EVENT_CATEGORIES = [
  'Buying tickets',
  'Browsing events',
  'Cart',
  'Discount codes',
  'Their order page',
  'Getting the app',
  'Accounts',
  'Search & profiles',
  'Creating events',
  'Managing events',
  'Venue maps',
  'Order management (staff)',
  'Marketing & settings',
  'App usage',
  'Other actions',
  'Automatic tracking',
];

// Events fired by automatic instrumentation rather than a deliberate action.
// They dominate raw counts, so the UI demotes them and skips them in insights.
export const AUTOMATIC_EVENTS = ['ui-click', 'rage-click', 'nav-clicked', 'screen-time'];

export const EVENT_DICTIONARY: Record<string, EventMeaning> = {
  // ── Automatic layer (all streams) ────────────────────────────────────────
  'ui-click': {
    label: 'Clicked something on the page',
    description:
      'Automatic tracking of any click on a button, link, or marked element. Fires constantly everywhere — background detail, not a deliberate action.',
    category: 'Automatic tracking',
  },
  'rage-click': {
    label: 'Clicked repeatedly in frustration',
    description:
      'Three or more rapid clicks on the same element within a second — usually a sign of a broken or unresponsive control.',
    category: 'Automatic tracking',
  },
  'nav-clicked': {
    label: 'Clicked a menu item (dashboard)',
    description: 'An organizer clicked an item in the dashboard sidebar menu.',
    category: 'Automatic tracking',
  },
  'screen-time': {
    label: 'Time spent on an app screen',
    description:
      'The app reports which screen was open, which came before it, and how many seconds were spent. The most-fired app event.',
    category: 'Automatic tracking',
  },

  // ── Storefront: browsing an event page ───────────────────────────────────
  'event-ticket-drawer-opened': {
    label: 'Opened the ticket panel',
    description:
      'Someone opened the ticket-selection panel on an event page — the clearest buying-intent signal on the page.',
    category: 'Browsing events',
  },
  'event-ticket-drawer-closed': {
    label: 'Closed the ticket panel',
    description:
      'The ticket panel was dismissed. Compared against opens, this shows how many people looked at prices and backed out.',
    category: 'Browsing events',
  },
  'event-qty-changed': {
    label: 'Changed a ticket quantity',
    description: 'A ticket quantity stepper was tapped up or down.',
    category: 'Browsing events',
  },
  'event-description-expanded': {
    label: 'Expanded the event description',
    description: 'A "read more" toggle on an event description was opened or closed.',
    category: 'Browsing events',
  },
  'event-gallery-opened': {
    label: 'Opened event photos',
    description: 'A photo lightbox was opened on an event page.',
    category: 'Browsing events',
  },
  'event-map-clicked': {
    label: 'Tapped the location map',
    description: 'The location map on an event page was tapped.',
    category: 'Browsing events',
  },
  'event-organizer-clicked': {
    label: "Viewed the organizer's profile",
    description: "Someone tapped through to the event organizer's profile.",
    category: 'Browsing events',
  },
  'event-card-clicked': {
    label: 'Tapped an event card',
    description:
      'An event card was tapped in a list or carousel, recording which list and which position.',
    category: 'Browsing events',
  },
  'event-reel-opened': {
    label: 'Opened a video reel',
    description: 'A video reel on an event page was opened.',
    category: 'Browsing events',
  },
  'event-video-played': {
    label: 'Played an event video',
    description: 'An embedded video on an event page started playing.',
    category: 'Browsing events',
  },
  'event-guidelines-viewed': {
    label: 'Read an event policy',
    description: 'A policy was opened from the event guidelines dialog.',
    category: 'Browsing events',
  },
  'event-product-viewed': {
    label: 'Looked at merch',
    description: 'A merch tile was opened into its detail dialog.',
    category: 'Browsing events',
  },
  'event-product-added': {
    label: 'Added merch to the cart',
    description: 'Merch was added to the cart from its detail dialog.',
    category: 'Browsing events',
  },
  'event-rsvp-submitted': {
    label: "RSVP'd to a free event",
    description: "A free event's RSVP was submitted.",
    category: 'Browsing events',
  },
  'event-help-resend-tickets': {
    label: 'Asked to resend tickets',
    description: 'Someone used the help panel to recover their tickets.',
    category: 'Browsing events',
  },
  'event-help-message-sent': {
    label: 'Messaged the organizer for help',
    description: 'Someone used the help panel to contact the organizer.',
    category: 'Browsing events',
  },

  // ── Storefront: purchase funnel ──────────────────────────────────────────
  'ticket-selected': {
    label: 'Put a ticket in the cart',
    description:
      'A ticket landed in the cart — counted only after the server confirmed it, so failed adds never count.',
    category: 'Buying tickets',
  },
  'checkout-started': {
    label: 'Started checkout',
    description: 'Checkout began, in either the standard or the branded flow.',
    category: 'Buying tickets',
  },
  'checkout-contact-viewed': {
    label: 'Reached the contact details step',
    description: 'Branded checkout: the contact-details page was reached.',
    category: 'Buying tickets',
  },
  'checkout-contact-submitted': {
    label: 'Filled in contact details',
    description: 'Branded checkout: contact details passed validation and the buyer moved on.',
    category: 'Buying tickets',
  },
  'checkout-payment-viewed': {
    label: 'Reached the payment step',
    description: 'The payment screen was reached, in either checkout flow.',
    category: 'Buying tickets',
  },
  'checkout-contact-completed': {
    label: 'Entered their email at checkout',
    description: 'Standard checkout: the email was accepted and the cart claimed to it.',
    category: 'Buying tickets',
  },
  'checkout-billing-completed': {
    label: 'Entered their billing address',
    description: 'Standard checkout: a billing address was saved. Fires once per checkout.',
    category: 'Buying tickets',
  },
  purchase: {
    label: 'Completed a purchase',
    description: 'Payment succeeded and an order was created — on the website or in the app.',
    category: 'Buying tickets',
  },
  'purchase-failed': {
    label: 'Payment failed',
    description:
      'A payment was attempted and rejected (for example a declined card), with the reason recorded.',
    category: 'Buying tickets',
  },

  // ── Storefront: cart ─────────────────────────────────────────────────────
  'cart-viewed': {
    label: 'Opened their cart',
    description: 'The cart page was opened. Counted once per cart, not on every refresh.',
    category: 'Cart',
  },
  'cart-qty-changed': {
    label: 'Changed a quantity in the cart',
    description: 'A quantity was changed on the cart page.',
    category: 'Cart',
  },
  'cart-item-removed': {
    label: 'Removed something from the cart',
    description: 'A line was removed from the cart.',
    category: 'Cart',
  },

  // ── Discount codes (storefront use + dashboard management) ───────────────
  'discount-applied': {
    label: 'Used a discount code',
    description: 'A discount code was typed in and accepted.',
    category: 'Discount codes',
  },
  'discount-failed': {
    label: 'Tried a discount code that failed',
    description:
      'A discount code was rejected, with the reason — shows which promos circulate but don’t work (expired or mistyped codes).',
    category: 'Discount codes',
  },
  'discount-removed': {
    label: 'Removed a discount code',
    description: 'An applied discount code was taken back off.',
    category: 'Discount codes',
  },
  'discount-created': {
    label: 'Created a discount code (staff)',
    description: 'An organizer created a new promotion code in the dashboard.',
    category: 'Discount codes',
  },
  'discount-updated': {
    label: 'Edited a discount code (staff)',
    description: 'An organizer changed a promotion code in the dashboard.',
    category: 'Discount codes',
  },
  'discount-deleted': {
    label: 'Deleted a discount code (staff)',
    description: 'An organizer removed a promotion code in the dashboard.',
    category: 'Discount codes',
  },

  // ── Storefront: the order hub (page buyers reach from their ticket email) ─
  'order-hub-opened': {
    label: 'Opened their order page',
    description:
      'A buyer opened the order hub — the page reached from their ticket email. Fires once per order.',
    category: 'Their order page',
  },
  'order-view-tickets': {
    label: 'Viewed their tickets',
    description: 'A buyer opened the tickets themselves from their order page.',
    category: 'Their order page',
  },
  'order-ticket-pdf': {
    label: 'Downloaded a ticket PDF',
    description: 'A single ticket was downloaded as a PDF.',
    category: 'Their order page',
  },
  'order-download-all': {
    label: 'Downloaded all their tickets',
    description: 'Every ticket in the order was downloaded at once.',
    category: 'Their order page',
  },
  'order-wallet-apple': {
    label: 'Added a ticket to Apple Wallet',
    description: 'A ticket was added to Apple Wallet.',
    category: 'Their order page',
  },
  'order-venue-map': {
    label: 'Opened the venue map',
    description: 'The venue map was opened from the order page.',
    category: 'Their order page',
  },
  'order-chatroom': {
    label: 'Opened the event chatroom',
    description: 'The event chatroom was opened from the order page.',
    category: 'Their order page',
  },
  'order-chatroom-app-open': {
    label: 'Opened the chatroom in the app',
    description: 'The buyer chose to open the chatroom in the app instead of the browser.',
    category: 'Their order page',
  },
  'order-flyer': {
    label: 'Opened the event flyer',
    description: 'The event flyer was opened from the order page.',
    category: 'Their order page',
  },
  'order-merch-qr': {
    label: 'Opened a merch QR code',
    description: 'A merch collection QR code was opened.',
    category: 'Their order page',
  },
  'order-app-banner': {
    label: 'Tapped the "get the app" banner',
    description: 'The "get the app" banner on the order page was tapped.',
    category: 'Their order page',
  },
  'order-waiver-viewed': {
    label: 'Viewed a waiver',
    description: 'A waiver was opened from the order page.',
    category: 'Their order page',
  },
  'order-share-open': {
    label: 'Opened the share menu',
    description: 'The share sheet was opened on the order page.',
    category: 'Their order page',
  },
  'order-share-sent': {
    label: 'Shared their order',
    description:
      'The share sheet was actually used. The gap vs. opens shows how often sharing is abandoned.',
    category: 'Their order page',
  },
  'order-tab-changed': {
    label: 'Switched tabs on their order page',
    description: 'Tabs were switched within the order hub.',
    category: 'Their order page',
  },

  // ── Getting the app (web ↔ app hand-off + install attribution) ───────────
  'app-handoff': {
    label: 'Was sent to the app',
    description:
      'Any attempt to send someone from the website into the mobile app, recording which button or banner did it.',
    category: 'Getting the app',
  },
  'app-handoff-outcome': {
    label: 'App opened (or fell to the store)',
    description:
      'Whether that hand-off actually opened the installed app or fell through to the app store. Only detectable on iPhone.',
    category: 'Getting the app',
  },
  'app-open-web-source': {
    label: 'Opened the app from a website link',
    description: 'The app was opened by a link from the website, tagged with which page sent it.',
    category: 'Getting the app',
  },
  'first-open-attributed': {
    label: 'First app launch, source known',
    description:
      'The app launched for the very first time and worked out where the install came from.',
    category: 'Getting the app',
  },

  // ── Accounts ─────────────────────────────────────────────────────────────
  'signup-started': {
    label: 'Started signing up',
    description: 'Registration began — the verification code was sent.',
    category: 'Accounts',
  },
  'signup-completed': {
    label: 'Created an account',
    description:
      'The account now exists — on the website or in the app. Carries where that person originally came from.',
    category: 'Accounts',
  },
  signin: {
    label: 'Signed in',
    description: 'A returning user signed in.',
    category: 'Accounts',
  },
  'auth-failed': {
    label: 'Sign-in or sign-up failed',
    description: 'A sign-in or sign-up attempt hit an error.',
    category: 'Accounts',
  },
  'signup-instagram-entered': {
    label: 'Typed their Instagram during signup',
    description:
      'Someone typed an Instagram handle during app signup so their profile could be pre-filled from it.',
    category: 'Accounts',
  },
  'signup-prefill-name-changed': {
    label: 'Changed the suggested name',
    description: 'The name pre-filled from Instagram was overridden during signup.',
    category: 'Accounts',
  },
  'signup-prefill-username-changed': {
    label: 'Changed the suggested username',
    description:
      'The username pre-filled from Instagram was overridden, recording why (taken, or just preferred another).',
    category: 'Accounts',
  },
  'signup-prefill-photo-changed': {
    label: 'Changed the suggested photo',
    description: 'The profile photo imported from Instagram was replaced during signup.',
    category: 'Accounts',
  },

  // ── Search & profiles ────────────────────────────────────────────────────
  'search-opened': {
    label: 'Opened search',
    description: 'The search panel was opened.',
    category: 'Search & profiles',
  },
  'search-query': {
    label: 'Searched for something',
    description:
      'A search ran, recording the query and how many results came back — zero-result queries show what people want but can’t find.',
    category: 'Search & profiles',
  },
  'search-result-clicked': {
    label: 'Clicked a search result',
    description: 'A search result was clicked, with its kind and position.',
    category: 'Search & profiles',
  },
  'search-type-changed': {
    label: 'Switched the search category',
    description: 'The searcher switched between events, organizers, and so on.',
    category: 'Search & profiles',
  },
  'profile-tab-changed': {
    label: 'Switched tabs on a profile',
    description: 'Tabs were switched on a public profile.',
    category: 'Search & profiles',
  },
  'profile-follow': {
    label: 'Followed someone',
    description: 'Someone followed a profile.',
    category: 'Search & profiles',
  },
  'profile-unfollow': {
    label: 'Unfollowed someone',
    description: 'Someone unfollowed a profile.',
    category: 'Search & profiles',
  },
  'profile-gallery-opened': {
    label: 'Opened a profile gallery',
    description: 'A photo gallery on a profile was opened.',
    category: 'Search & profiles',
  },
  'profile-merch-clicked': {
    label: 'Tapped merch on a profile',
    description: 'Merch was tapped from a profile page.',
    category: 'Search & profiles',
  },

  // ── Dashboard: creating an event ─────────────────────────────────────────
  'event-wizard-opened': {
    label: 'Started creating an event',
    description: 'An organizer opened the event-creation wizard.',
    category: 'Creating events',
  },
  'event-wizard-step-completed': {
    label: 'Finished a creation step',
    description:
      'One step of the event wizard was completed. Against opens, this shows exactly where creation stalls.',
    category: 'Creating events',
  },
  'event-draft-saved': {
    label: 'Saved an event as a draft',
    description: 'An event was saved as a draft rather than published.',
    category: 'Creating events',
  },
  'event-wizard-abandoned': {
    label: 'Abandoned event creation',
    description: 'The wizard was left without completing.',
    category: 'Creating events',
  },
  'event-published': {
    label: 'Published an event',
    description: 'An event went live — the organizer activation moment.',
    category: 'Creating events',
  },
  'event-publish-failed': {
    label: 'Publishing failed',
    description: 'Publishing an event was attempted and rejected.',
    category: 'Creating events',
  },

  // ── Dashboard: managing an event ─────────────────────────────────────────
  'event-manage-tab-viewed': {
    label: 'Opened an event-manager tab',
    description: 'A tab of the event manager was opened.',
    category: 'Managing events',
  },
  'event-manage-saved': {
    label: 'Saved event changes',
    description: 'Changes to an event were saved.',
    category: 'Managing events',
  },
  'event-manage-save-blocked-stripe': {
    label: 'Save blocked — payouts not set up',
    description:
      'A save was refused because payouts (Stripe) aren’t connected — a friction point worth watching.',
    category: 'Managing events',
  },
  'event-manage-section-opened': {
    label: 'Opened a page-builder section',
    description: 'A section of the event page builder was opened.',
    category: 'Managing events',
  },
  'event-manage-section-saved': {
    label: 'Saved a page-builder section',
    description: 'A section of the event page builder was saved.',
    category: 'Managing events',
  },
  'event-manage-status-changed': {
    label: 'Changed event status',
    description: 'The event moved between draft, live, and ended.',
    category: 'Managing events',
  },
  'event-manage-status-change-failed': {
    label: 'Event status change failed',
    description: 'Moving the event between draft, live, and ended failed.',
    category: 'Managing events',
  },
  'event-manage-submission-actioned': {
    label: 'Handled a registration submission',
    description: 'A registration submission was accepted, declined, or sent a fresh payment link.',
    category: 'Managing events',
  },
  'event-manage-ticket-type-created': {
    label: 'Created a ticket type',
    description: 'A new ticket type was created for an event.',
    category: 'Managing events',
  },
  'event-manage-ticket-deleted': {
    label: 'Deleted a ticket type',
    description: 'A ticket type was deleted from an event.',
    category: 'Managing events',
  },
  'event-manage-tickets-added': {
    label: 'Added ticket inventory',
    description: 'More tickets were added to an event.',
    category: 'Managing events',
  },
  'event-manage-tickets-reordered': {
    label: 'Reordered tickets',
    description: 'Ticket types were reordered on the event page.',
    category: 'Managing events',
  },
  'event-manage-ticket-visibility': {
    label: 'Showed or hid a ticket',
    description: 'A ticket was shown or hidden on the public event page.',
    category: 'Managing events',
  },
  'event-manage-group-visibility': {
    label: 'Showed or hid a ticket group',
    description: 'A whole ticket group was shown or hidden on the public event page.',
    category: 'Managing events',
  },
  'event-manage-ticket-badge-set': {
    label: 'Set a ticket badge',
    description: 'A badge was set on a ticket type.',
    category: 'Managing events',
  },
  'event-manage-ticket-image-set': {
    label: 'Set a ticket image',
    description: 'An image was set on a ticket type.',
    category: 'Managing events',
  },
  'event-manage-ticket-flyer-uploaded': {
    label: 'Uploaded a ticket flyer',
    description: 'A flyer was uploaded onto a ticket type.',
    category: 'Managing events',
  },
  'event-manage-ticket-attachment-set': {
    label: 'Attached a file to a ticket',
    description: 'An attachment was set on a ticket type.',
    category: 'Managing events',
  },
  'event-manage-group-created': {
    label: 'Created a ticket group',
    description: 'A ticket group was created.',
    category: 'Managing events',
  },
  'event-manage-group-deleted': {
    label: 'Deleted a ticket group',
    description: 'A ticket group was removed.',
    category: 'Managing events',
  },
  'event-manage-affiliate-created': {
    label: 'Created an affiliate link',
    description: 'An affiliate tracking link was created.',
    category: 'Managing events',
  },
  'event-manage-affiliate-copied': {
    label: 'Copied an affiliate link',
    description:
      'An affiliate link was copied to the clipboard — the action that indicates real use.',
    category: 'Managing events',
  },
  'event-manage-affiliate-deleted': {
    label: 'Deleted an affiliate link',
    description: 'An affiliate tracking link was removed.',
    category: 'Managing events',
  },
  'event-manage-send-tickets-opened': {
    label: 'Opened "send tickets manually"',
    description: 'The staff dialog for sending tickets manually was opened.',
    category: 'Managing events',
  },
  'event-manage-email-sent': {
    label: 'Emailed attendees',
    description: 'An organizer emailed their attendees from the contact tab.',
    category: 'Managing events',
  },
  'event-manage-setting-toggled': {
    label: 'Flipped an event setting',
    description: 'A switch in the event’s more-options was flipped.',
    category: 'Managing events',
  },
  'event-manage-image-uploaded': {
    label: 'Uploaded an event image',
    description: 'An event image was uploaded.',
    category: 'Managing events',
  },
  'event-manage-waiver-updated': {
    label: 'Updated the event waiver',
    description: 'The event’s waiver was changed.',
    category: 'Managing events',
  },
  'event-manage-upsell-saved': {
    label: 'Saved an upsell',
    description: 'An upsell on the event was saved.',
    category: 'Managing events',
  },
  'event-manage-vip-updated': {
    label: 'Updated VIP options',
    description: 'The event’s VIP options were changed.',
    category: 'Managing events',
  },
  'event-manage-awards-attached': {
    label: 'Attached awards to an event',
    description: 'Awards were attached to an event.',
    category: 'Managing events',
  },
  'event-manage-award-removed': {
    label: 'Removed an award',
    description: 'An award was removed from an event.',
    category: 'Managing events',
  },
  'event-manage-customers-exported': {
    label: 'Exported the attendee list',
    description: 'The attendee list was exported.',
    category: 'Managing events',
  },
  'event-manage-duplicated': {
    label: 'Duplicated an event',
    description: 'An event was copied.',
    category: 'Managing events',
  },
  'event-manage-deleted': {
    label: 'Deleted an event',
    description: 'An event was destroyed.',
    category: 'Managing events',
  },

  // ── Dashboard: venue map editor ──────────────────────────────────────────
  'venue-map-editor-opened': {
    label: 'Opened the venue map editor',
    description: 'The venue map editor was opened.',
    category: 'Venue maps',
  },
  'venue-map-tool-selected': {
    label: 'Picked a drawing tool',
    description: 'A drawing tool was selected in the map editor.',
    category: 'Venue maps',
  },
  'venue-map-element-created': {
    label: 'Placed something on the map',
    description: 'An element (area, wall, object, label…) was placed on the venue map.',
    category: 'Venue maps',
  },
  'venue-map-element-deleted': {
    label: 'Removed something from the map',
    description: 'An element was removed from the venue map.',
    category: 'Venue maps',
  },
  'venue-map-element-edited': {
    label: 'Edited a map element',
    description: 'A property or position was changed on a placed element.',
    category: 'Venue maps',
  },
  'venue-map-saved': {
    label: 'Saved the venue map',
    description: 'The map was saved, with counts of what’s on it and time spent editing.',
    category: 'Venue maps',
  },
  'venue-map-save-failed': {
    label: 'Venue map save failed',
    description: 'Saving the venue map failed.',
    category: 'Venue maps',
  },
  'venue-map-exited': {
    label: 'Left the map editor',
    description:
      'The editor was closed, recording whether work was unsaved and how long was spent — the abandonment signal.',
    category: 'Venue maps',
  },
  'venue-map-map-cleared': {
    label: 'Cleared the whole map',
    description: 'The bulk "clear map" action ran.',
    category: 'Venue maps',
  },
  'venue-map-undo': {
    label: 'Undid a map change',
    description: 'A change in the map editor was reversed.',
    category: 'Venue maps',
  },
  'venue-map-redo': {
    label: 'Redid a map change',
    description: 'A reversed change in the map editor was reapplied.',
    category: 'Venue maps',
  },
  'venue-map-elements-copied': {
    label: 'Copied map elements',
    description: 'A selection of map elements was copied.',
    category: 'Venue maps',
  },
  'venue-map-elements-pasted': {
    label: 'Pasted map elements',
    description: 'Copied map elements were pasted.',
    category: 'Venue maps',
  },
  'venue-map-layer-added': {
    label: 'Added a map layer',
    description: 'A layer was added to the venue map.',
    category: 'Venue maps',
  },
  'venue-map-layer-switched': {
    label: 'Switched map layers',
    description: 'The active layer was switched.',
    category: 'Venue maps',
  },
  'venue-map-layer-renamed': {
    label: 'Renamed a map layer',
    description: 'A layer was renamed.',
    category: 'Venue maps',
  },
  'venue-map-layer-duplicated': {
    label: 'Duplicated a map layer',
    description: 'A layer was duplicated.',
    category: 'Venue maps',
  },
  'venue-map-layer-deleted': {
    label: 'Deleted a map layer',
    description: 'A layer was deleted.',
    category: 'Venue maps',
  },
  'venue-map-layer-merged': {
    label: 'Merged map layers',
    description: 'Layers were merged together.',
    category: 'Venue maps',
  },
  'venue-map-layer-reordered': {
    label: 'Reordered map layers',
    description: 'The layer stack was reordered.',
    category: 'Venue maps',
  },
  'venue-map-layer-default-set': {
    label: 'Set the default map layer',
    description: 'A layer was set as the default.',
    category: 'Venue maps',
  },
  'venue-map-floor-added': {
    label: 'Added an indoor floor',
    description: 'An indoor floor was added to the venue map.',
    category: 'Venue maps',
  },
  'venue-map-floor-deleted': {
    label: 'Deleted an indoor floor',
    description: 'An indoor floor was deleted.',
    category: 'Venue maps',
  },
  'venue-map-floor-plan-uploaded': {
    label: 'Uploaded a floor plan',
    description: 'A floor plan image was uploaded.',
    category: 'Venue maps',
  },
  'venue-map-floor-plan-replaced': {
    label: 'Replaced a floor plan',
    description: 'A floor plan image was replaced.',
    category: 'Venue maps',
  },
  'venue-map-floor-plan-removed': {
    label: 'Removed a floor plan',
    description: 'A floor plan image was removed.',
    category: 'Venue maps',
  },
  'venue-map-room-traced': {
    label: 'Drew an indoor room',
    description: 'An indoor room was traced by hand.',
    category: 'Venue maps',
  },
  'venue-map-rooms-inflated': {
    label: 'Generated indoor rooms',
    description: 'Indoor rooms were generated automatically.',
    category: 'Venue maps',
  },
  'venue-map-building-hidden': {
    label: 'Hid a building',
    description: 'A real-world building was hidden on the map.',
    category: 'Venue maps',
  },
  'venue-map-building-transparent': {
    label: 'Made a building see-through',
    description: 'A building was made transparent on the map.',
    category: 'Venue maps',
  },
  'venue-map-building-indoor': {
    label: 'Marked a building as indoor',
    description: 'A building was marked as an indoor space.',
    category: 'Venue maps',
  },
  'venue-map-building-parking': {
    label: 'Marked a building as parking',
    description: 'A building was marked as parking.',
    category: 'Venue maps',
  },
  'venue-map-trees-cleared': {
    label: 'Cleared tree cover',
    description: 'Tree cover was cleared from the map.',
    category: 'Venue maps',
  },
  'venue-map-basemap-changed': {
    label: 'Changed the base map',
    description: 'The underlying base map was changed.',
    category: 'Venue maps',
  },
  'venue-map-style-selected': {
    label: 'Changed the map style',
    description: 'A different map style was selected.',
    category: 'Venue maps',
  },
  'venue-map-3d-toggled': {
    label: 'Toggled 3D view',
    description: 'The map’s 3D view was turned on or off.',
    category: 'Venue maps',
  },
  'venue-map-variant-selected': {
    label: 'Picked a 3D object variant',
    description: 'A 3D object’s skin or logo variant was chosen.',
    category: 'Venue maps',
  },
  'venue-map-variant-created': {
    label: 'Created a 3D object variant',
    description: 'A new 3D object variant was made.',
    category: 'Venue maps',
  },
  'venue-map-drift-changed': {
    label: 'Edited a drift route',
    description: 'A drift route on the map was edited.',
    category: 'Venue maps',
  },
  'venue-map-drift-play-toggled': {
    label: 'Previewed a drift route',
    description: 'A drift route preview was played or paused.',
    category: 'Venue maps',
  },
  'venue-map-template-applied': {
    label: 'Applied a map template',
    description: 'A template was applied to the venue map.',
    category: 'Venue maps',
  },
  'venue-map-center-saved': {
    label: 'Pinned the default map view',
    description: 'The map’s default view was saved.',
    category: 'Venue maps',
  },
  'venue-map-url-copied': {
    label: 'Copied the map link',
    description: 'The public map link was copied.',
    category: 'Venue maps',
  },
  'venue-map-qr-downloaded': {
    label: 'Downloaded the map QR code',
    description: 'The map’s QR code was downloaded.',
    category: 'Venue maps',
  },
  'venue-map-public-viewed': {
    label: 'Viewed a public venue map',
    description: 'A finished venue map was viewed by the public.',
    category: 'Venue maps',
  },
  'venue-map-deleted': {
    label: 'Deleted a venue map',
    description: 'A venue map was destroyed.',
    category: 'Venue maps',
  },

  // ── Dashboard: order management (staff) ──────────────────────────────────
  'order-filters-applied': {
    label: 'Filtered the order list (staff)',
    description: 'The order list was filtered by status.',
    category: 'Order management (staff)',
  },
  'order-filters-cleared': {
    label: 'Cleared order filters (staff)',
    description: 'Order list filters were cleared.',
    category: 'Order management (staff)',
  },
  'order-refunded': {
    label: 'Refunded an order',
    description: 'Money was returned on an order.',
    category: 'Order management (staff)',
  },
  'order-cancelled': {
    label: 'Cancelled an order',
    description: 'An order was voided.',
    category: 'Order management (staff)',
  },
  'order-edited': {
    label: 'Edited an order',
    description: 'An existing order was modified by staff.',
    category: 'Order management (staff)',
  },
  'order-ticket-swapped': {
    label: 'Swapped a ticket on an order',
    description: 'A ticket on an existing order was swapped.',
    category: 'Order management (staff)',
  },
  'order-customer-info-edited': {
    label: 'Edited customer info on an order',
    description: 'Customer details on an order were changed.',
    category: 'Order management (staff)',
  },
  'order-created': {
    label: 'Created an order manually (staff)',
    description: 'Staff created an order by hand.',
    category: 'Order management (staff)',
  },
  'order-payment-link-sent': {
    label: 'Sent a payment link',
    description: 'Staff sent a link to pay for an order.',
    category: 'Order management (staff)',
  },
  'order-staff-tickets-sent': {
    label: 'Sent complimentary tickets',
    description: 'Staff issued complimentary tickets directly.',
    category: 'Order management (staff)',
  },
  'order-staff-tickets-resent': {
    label: 'Resent complimentary tickets',
    description: 'Staff-issued tickets were resent.',
    category: 'Order management (staff)',
  },
  'order-staff-tickets-cancelled': {
    label: 'Cancelled complimentary tickets',
    description: 'Staff-issued tickets were cancelled.',
    category: 'Order management (staff)',
  },
  'order-ticket-email-resent': {
    label: 'Resent tickets by email',
    description: 'Tickets were re-delivered by email to a buyer who lost them.',
    category: 'Order management (staff)',
  },
  'order-ticket-sms-resent': {
    label: 'Resent tickets by text',
    description: 'Tickets were re-delivered by SMS to a buyer who lost them.',
    category: 'Order management (staff)',
  },
  'order-discount-added': {
    label: 'Added a one-off discount to an order',
    description:
      'Staff applied an ad-hoc discount inside an order (kept separate from promotion codes).',
    category: 'Order management (staff)',
  },
  'order-discount-removed': {
    label: 'Removed a one-off discount',
    description: 'A staff-applied discount inside an order was removed.',
    category: 'Order management (staff)',
  },
  'order-tags-updated': {
    label: 'Updated order tags',
    description: 'Tags on an order were updated.',
    category: 'Order management (staff)',
  },
  'order-note-saved': {
    label: 'Saved a note on an order',
    description: 'A note was saved on an order.',
    category: 'Order management (staff)',
  },
  'order-award-class-assigned': {
    label: 'Assigned an award class',
    description: 'An award class was assigned to an order.',
    category: 'Order management (staff)',
  },

  // ── Dashboard: analytics, marketing, settings, customers ─────────────────
  'analytics-range-changed': {
    label: 'Changed the analytics date range',
    description: 'An organizer changed the date range on their own analytics screens.',
    category: 'Marketing & settings',
  },
  'analytics-event-filter-changed': {
    label: 'Filtered analytics by event',
    description: 'An organizer filtered their analytics to specific events.',
    category: 'Marketing & settings',
  },
  'analytics-compare-view-changed': {
    label: 'Changed the analytics compare view',
    description: 'The compare view on organizer analytics was changed.',
    category: 'Marketing & settings',
  },
  'analytics-compare-drilldown-opened': {
    label: 'Drilled into analytics',
    description:
      'A drill-down was opened — a sign someone is genuinely investigating rather than glancing.',
    category: 'Marketing & settings',
  },
  'marketing-campaign-create-started': {
    label: 'Started building a campaign',
    description: 'A marketing campaign draft was started.',
    category: 'Marketing & settings',
  },
  'marketing-sms-submitted': {
    label: 'Submitted an SMS campaign',
    description: 'An SMS marketing campaign was submitted.',
    category: 'Marketing & settings',
  },
  'marketing-sms-payment-redirected': {
    label: 'Went to pay for an SMS campaign',
    description: 'The organizer was redirected to pay for an SMS campaign.',
    category: 'Marketing & settings',
  },
  'settings-stripe-connect-started': {
    label: 'Started payout setup',
    description: 'Stripe payout onboarding began — the gate everything else depends on.',
    category: 'Marketing & settings',
  },
  'settings-staff-invited': {
    label: 'Invited a staff member',
    description: 'A staff member was invited to the organization.',
    category: 'Marketing & settings',
  },
  'settings-profile-field-saved': {
    label: 'Saved a profile setting',
    description: 'An organization profile field was saved.',
    category: 'Marketing & settings',
  },
  'settings-social-links-saved': {
    label: 'Saved social links',
    description: 'The organization’s social links were saved.',
    category: 'Marketing & settings',
  },
  'settings-abandoned-cart-saved': {
    label: 'Saved abandoned-cart settings',
    description: 'Abandoned-cart settings were saved.',
    category: 'Marketing & settings',
  },
  'customer-list-filtered': {
    label: 'Filtered the customer list',
    description: 'The customer list was filtered.',
    category: 'Marketing & settings',
  },

  // ── Mobile app usage ─────────────────────────────────────────────────────
  'instagram-invite-tapped': {
    label: 'Invited an Instagram friend',
    description: 'A user invited an Instagram friend to the app.',
    category: 'App usage',
  },
  'tapped-btm-home': {
    label: 'Tapped Home (app)',
    description: 'The Home tab in the app’s bottom bar was tapped.',
    category: 'App usage',
  },
  'tapped-btm-search': {
    label: 'Tapped Search (app)',
    description: 'The Search tab in the app’s bottom bar was tapped.',
    category: 'App usage',
  },
  'tapped-btm-events': {
    label: 'Tapped Events (app)',
    description: 'The Events tab in the app’s bottom bar was tapped.',
    category: 'App usage',
  },
  'tapped-btm-activity': {
    label: 'Tapped Activity (app)',
    description: 'The Activity tab in the app’s bottom bar was tapped.',
    category: 'App usage',
  },
  'tapped-btm-drive-share': {
    label: 'Tapped Drive Share (app)',
    description: 'The Drive Share tab in the app’s bottom bar was tapped.',
    category: 'App usage',
  },
  'tapped-btm-my-profile': {
    label: 'Tapped My Profile (app)',
    description: 'The My Profile tab in the app’s bottom bar was tapped.',
    category: 'App usage',
  },
  'client-booking-open': {
    label: 'Opened photographer booking',
    description: 'A client opened the photographer booking flow in the app.',
    category: 'App usage',
  },
  'client-booking-pick-package': {
    label: 'Picked a photo package',
    description: 'A client picked a photographer’s package.',
    category: 'App usage',
  },
  'client-booking-pick-date': {
    label: 'Picked a booking date',
    description: 'A client picked a date for a photographer booking.',
    category: 'App usage',
  },
  'client-booking-checkout': {
    label: 'Checked out a photo booking',
    description: 'A client reached checkout for a photographer booking.',
    category: 'App usage',
  },
  'dark-mode-status': {
    label: 'Reported their app theme',
    description: 'The app reported which theme (light or dark) is in use.',
    category: 'App usage',
  },
};

// Small word fixes for names that fall through to the prettifier.
const WORD_FIXES: Record<string, string> = {
  btm: 'bottom-bar',
  qty: 'quantity',
  ig: 'Instagram',
  qr: 'QR',
  pdf: 'PDF',
  sms: 'SMS',
  utm: 'UTM',
  vip: 'VIP',
  '3d': '3D',
};

export function prettifyEventName(name: string): string {
  const words = name
    .split(/[-_]+/)
    .filter(Boolean)
    .map(word => WORD_FIXES[word] ?? word);
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function getEventMeaning(name: string): EventMeaning {
  return (
    EVENT_DICTIONARY[name] ?? {
      label: prettifyEventName(name),
      description:
        'A custom action tracked by the team — the name describes what was tapped or done.',
      category: 'Other actions',
    }
  );
}
