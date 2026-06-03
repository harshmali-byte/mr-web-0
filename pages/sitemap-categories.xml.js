import { buildCategoryListingSitemapEntries } from '../lib/sitemap/builders';
import { createUrlSetSitemapPage } from '../lib/sitemap/createXmlRoute';

const { default: SitemapCategories, getServerSideProps } = createUrlSetSitemapPage(
  buildCategoryListingSitemapEntries
);

export default SitemapCategories;
export { getServerSideProps };
