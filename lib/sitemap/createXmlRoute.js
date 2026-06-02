import { SITEMAP_CACHE_CONTROL } from './config';
import { buildUrlSetXml, buildSitemapIndexXml } from './xml';

function sendXml(res, xml, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', SITEMAP_CACHE_CONTROL);
  res.write(xml);
  res.end();
}

/**
 * Next.js 12 page helper: streams a urlset sitemap from an async builder.
 * @param {() => Promise<Array<{ loc: string, lastmod?: string, changefreq?: string, priority?: string }>>} buildEntries
 */
export function createUrlSetSitemapPage(buildEntries) {
  async function getServerSideProps({ res }) {
    try {
      const entries = await buildEntries();
      sendXml(res, buildUrlSetXml(entries));
    } catch (error) {
      console.error('[sitemap]', error);
      sendXml(
        res,
        buildUrlSetXml([]),
        500
      );
    }

    return { props: {} };
  }

  function SitemapPage() {
    return null;
  }

  return { default: SitemapPage, getServerSideProps };
}

/**
 * @param {() => Promise<string[]>} buildSitemapLocs
 */
export function createSitemapIndexPage(buildSitemapLocs) {
  async function getServerSideProps({ res }) {
    try {
      const locs = await buildSitemapLocs();
      sendXml(res, buildSitemapIndexXml(locs));
    } catch (error) {
      console.error('[sitemap-index]', error);
      sendXml(res, buildSitemapIndexXml([]), 500);
    }

    return { props: {} };
  }

  function SitemapIndexPage() {
    return null;
  }

  return { default: SitemapIndexPage, getServerSideProps };
}
