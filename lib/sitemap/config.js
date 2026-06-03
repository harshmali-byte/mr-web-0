/** Server-side sitemap configuration (not exposed to the client bundle). */

/** Reports/blogs per API request when building report sitemaps. */
export const SITEMAP_FETCH_PAGE_SIZE = 500;

/** Only need Paging.TotalPages for category listing URLs — keep payload tiny. */
export const SITEMAP_CATEGORY_META_PAGE_SIZE = 1;

/** Parallel API calls (avoid hammering the backend). */
export const SITEMAP_API_CONCURRENCY = 8;

/** In-process cache TTL (ms) — repeat hits in dev/prod are fast. */
export const SITEMAP_MEMORY_CACHE_TTL_MS = 60 * 60 * 1000;

/** Max URLs per sitemap file (Google limit is 50,000). */
export const SITEMAP_MAX_URLS_PER_FILE = 45000;

export const SITEMAP_CACHE_CONTROL =
  'public, s-maxage=3600, stale-while-revalidate=86400';

export function getSiteBaseUrl() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
  if (!domain) {
    return '';
  }
  return domain.endsWith('/') ? domain.slice(0, -1) : domain;
}

/**
 * Static marketing routes that exist as Next.js pages.
 * `mrOnly`: include in sitemap only when NEXT_PUBLIC_ORG === 'MR'
 */
export const STATIC_SITEMAP_ROUTES = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: 'Services', changefreq: 'weekly', priority: '0.9' },
  { path: 'Services/Merger-And-Acquisition', changefreq: 'weekly', priority: '0.8' },
  { path: 'Services/B2B-Lead-Generation', changefreq: 'weekly', priority: '0.8' },
  { path: 'Pricing', changefreq: 'weekly', priority: '0.8' },
  { path: 'Blogs', changefreq: 'daily', priority: '0.8' },
  { path: 'Categories', changefreq: 'weekly', priority: '0.8', mrOnly: true },
  { path: 'AboutUs', changefreq: 'monthly', priority: '0.7', mrOnly: true },
  { path: 'ContactUs', changefreq: 'monthly', priority: '0.7' },
  { path: 'FAQ', changefreq: 'monthly', priority: '0.6' },
  { path: 'TnC', changefreq: 'yearly', priority: '0.4' },
  { path: 'PrivacyPolicy', changefreq: 'yearly', priority: '0.4' },
  { path: 'Disclaimer', changefreq: 'yearly', priority: '0.4' },
  { path: 'RefundPolicy', changefreq: 'yearly', priority: '0.4' },
];

export function getStaticRoutesForOrg() {
  const org = process.env.NEXT_PUBLIC_ORG;
  return STATIC_SITEMAP_ROUTES.filter((route) => !route.mrOnly || org === 'MR');
}
