import Script from 'next/script';
import { GA_TRACKING_ID } from '../../../lib/gtag';

/**
 * Loads Google Analytics 4 (gtag.js) and initializes the dataLayer / window.gtag.
 * Renders nothing when NEXT_PUBLIC_GA_ID is not set (e.g. AI/dev without GA).
 *
 * The initial config call sends the first page_view automatically. Subsequent
 * client-side route changes are tracked in _app.js via router events
 * (gtag.pageview), giving one page_view per navigation with no double counting.
 */
export default function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="ga-gtag-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="ga-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
