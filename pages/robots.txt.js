import { getSiteBaseUrl, SITEMAP_CACHE_CONTROL } from '../lib/sitemap/config';

export default function RobotsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  const base = getSiteBaseUrl();

  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /Admin/',
    'Disallow: /Thankyou/',
    'Disallow: /Error/',
    'Disallow: /*/PostId/',
    'Disallow: /survey/',
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ];

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', SITEMAP_CACHE_CONTROL);
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
}
