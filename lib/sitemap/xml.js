function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * @param {{ loc: string, lastmod?: string, changefreq?: string, priority?: string }} entry
 */
export function urlEntryToXml(entry) {
  const parts = [`  <url>`, `    <loc>${escapeXml(entry.loc)}</loc>`];

  if (entry.lastmod) {
    parts.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
  }
  if (entry.changefreq) {
    parts.push(`    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`);
  }
  if (entry.priority) {
    parts.push(`    <priority>${escapeXml(entry.priority)}</priority>`);
  }

  parts.push(`  </url>`);
  return parts.join('\n');
}

export function buildUrlSetXml(entries) {
  const body = entries.map(urlEntryToXml).join('\n');
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>`
  );
}

export function buildSitemapIndexXml(sitemapLocs) {
  const body = sitemapLocs
    .map(
      (loc) =>
        `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`
    )
    .join('\n');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</sitemapindex>`
  );
}
