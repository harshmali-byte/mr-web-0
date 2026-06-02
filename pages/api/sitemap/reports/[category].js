import { buildResearchSitemapEntriesForCategory } from '../../../../lib/sitemap/builders';
import { SITEMAP_CACHE_CONTROL } from '../../../../lib/sitemap/config';
import { buildUrlSetXml } from '../../../../lib/sitemap/xml';

function normalizeCategoryParam(categoryParam) {
  if (!categoryParam) {
    return '';
  }
  return decodeURIComponent(String(categoryParam).replace(/\.xml$/i, ''));
}

export default async function handler(req, res) {
  const categoryUrl = normalizeCategoryParam(req.query.category);

  try {
    const entries = categoryUrl
      ? await buildResearchSitemapEntriesForCategory(categoryUrl)
      : [];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', SITEMAP_CACHE_CONTROL);
    res.send(buildUrlSetXml(entries));
  } catch (error) {
    console.error('[sitemap-reports]', categoryUrl, error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', SITEMAP_CACHE_CONTROL);
    res.send(buildUrlSetXml([]));
  }
}
