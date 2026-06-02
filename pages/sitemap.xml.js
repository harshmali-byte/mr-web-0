import { buildSitemapIndexLocations } from '../lib/sitemap/builders';
import { createSitemapIndexPage } from '../lib/sitemap/createXmlRoute';

const { default: SitemapIndex, getServerSideProps } = createSitemapIndexPage(
  buildSitemapIndexLocations
);

export default SitemapIndex;
export { getServerSideProps };
