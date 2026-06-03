import { buildStaticSitemapEntries } from '../lib/sitemap/builders';
import { createUrlSetSitemapPage } from '../lib/sitemap/createXmlRoute';

const { default: SitemapStatic, getServerSideProps } = createUrlSetSitemapPage(
  buildStaticSitemapEntries
);

export default SitemapStatic;
export { getServerSideProps };
