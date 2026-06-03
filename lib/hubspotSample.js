// Shared trigger for the global HubSpot "Get Sample" modal.
// Any sample CTA can call openHubSpotSample() to open the popup
// instead of redirecting to the /requestSample/PostId/{id} page.

export const HUBSPOT_SAMPLE_EVENT = 'hubspot-sample:open';

export function openHubSpotSample() {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new CustomEvent(HUBSPOT_SAMPLE_EVENT));
}
