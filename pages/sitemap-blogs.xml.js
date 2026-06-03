import { buildBlogSitemapEntries } from '../lib/sitemap/builders';
import { createUrlSetSitemapPage } from '../lib/sitemap/createXmlRoute';

const { default: SitemapBlogs, getServerSideProps } = createUrlSetSitemapPage(
  buildBlogSitemapEntries
);

export default SitemapBlogs;
export { getServerSideProps };
