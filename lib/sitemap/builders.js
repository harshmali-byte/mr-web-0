import { getStaticRoutesForOrg } from './config';
import {
  fetchActiveCategories,
  fetchAllBlogPosts,
  fetchAllResearchPostsForCategory,
  fetchCategoryPagingMeta,
} from './api';
import { mapWithConcurrency } from './concurrency';
import { getCached } from './cache';
import { SITEMAP_API_CONCURRENCY, SITEMAP_MEMORY_CACHE_TTL_MS } from './config';
import { isIndexableRobotIndex } from './robotIndex';
import {
  buildBlogPath,
  buildResearchPath,
  formatLastmod,
  joinSiteUrl,
  resolveAbsoluteUrl,
} from './urls';
import { SITEMAP_FETCH_PAGE_SIZE } from './config';

/**
 * @returns {Promise<Array<{ loc: string, lastmod?: string, changefreq?: string, priority?: string }>>}
 */
export async function buildStaticSitemapEntries() {
  return getStaticRoutesForOrg().map((route) => ({
    loc: route.path ? joinSiteUrl(route.path) : joinSiteUrl(''),
    changefreq: route.changefreq,
    priority: route.priority,
  }));
}

/**
 * Category listing pages: /Category/{slug} and paginated /Category/{slug}/{page}
 */
export async function buildCategoryListingSitemapEntries() {
  return getCached(
    'sitemap:entries:categories',
    SITEMAP_MEMORY_CACHE_TTL_MS,
    async () => {
      const categories = await fetchActiveCategories();

      const perCategoryEntries = await mapWithConcurrency(
        categories,
        SITEMAP_API_CONCURRENCY,
        async (category) => {
          const categoryUrl = category.CategoryUrl;
          const { totalPages } = await fetchCategoryPagingMeta(categoryUrl);
          const entries = [
            {
              loc: joinSiteUrl(`Category/${categoryUrl}`),
              changefreq: 'daily',
              priority: '0.7',
            },
          ];

          for (let page = 2; page <= totalPages; page += 1) {
            entries.push({
              loc: joinSiteUrl(`Category/${categoryUrl}/${page}`),
              changefreq: 'daily',
              priority: '0.6',
            });
          }

          return entries;
        }
      );

      return perCategoryEntries.flat();
    }
  );
}

function researchPostToEntry(post) {
  if (!isIndexableRobotIndex(post.RobotIndex)) {
    return null;
  }

  const fallbackPath = buildResearchPath(post);
  if (!fallbackPath) {
    return null;
  }

  return {
    loc: resolveAbsoluteUrl(post.CanonicalUrl, fallbackPath),
    lastmod: formatLastmod(post.UpdatedDate || post.PublishDate || post.ModifiedDate),
    changefreq: 'weekly',
    priority: '0.8',
  };
}

export async function buildResearchSitemapEntriesForCategory(categoryUrl) {
  const posts = await fetchAllResearchPostsForCategory(categoryUrl);
  const entries = [];
  const seen = new Set();

  for (const post of posts) {
    const entry = researchPostToEntry(post);
    if (!entry || seen.has(entry.loc)) {
      continue;
    }
    seen.add(entry.loc);
    entries.push(entry);
  }

  return entries;
}

function blogPostToEntry(post) {
  if (!isIndexableRobotIndex(post.RobotIndex)) {
    return null;
  }

  const pathOrUrl = buildBlogPath(post);
  if (!pathOrUrl) {
    return null;
  }

  const loc = /^https?:\/\//i.test(pathOrUrl)
    ? pathOrUrl
    : resolveAbsoluteUrl(post.CanonicalUrl, pathOrUrl);

  return {
    loc,
    lastmod: formatLastmod(post.UpdatedDate || post.PublishDate || post.ModifiedDate),
    changefreq: 'weekly',
    priority: '0.7',
  };
}

export async function buildBlogSitemapEntries() {
  const { posts, totalPages } = await fetchAllBlogPosts();
  const entries = [];

  for (let page = 2; page <= totalPages; page += 1) {
    entries.push({
      loc: joinSiteUrl(`Blogs/${page}`),
      changefreq: 'daily',
      priority: '0.7',
    });
  }

  const seen = new Set(entries.map((e) => e.loc));

  for (const post of posts) {
    const entry = blogPostToEntry(post);
    if (!entry || seen.has(entry.loc)) {
      continue;
    }
    seen.add(entry.loc);
    entries.push(entry);
  }

  return entries;
}

export async function getReportSitemapPaths() {
  const categories = await fetchActiveCategories();
  return categories.map(
    (category) => `sitemap-reports/${encodeURIComponent(category.CategoryUrl)}.xml`
  );
}

export async function buildSitemapIndexLocations() {
  return getCached(
    'sitemap:entries:index',
    SITEMAP_MEMORY_CACHE_TTL_MS,
    async () => {
      const reportPaths = await getReportSitemapPaths();

      return [
        joinSiteUrl('sitemap-static.xml'),
        joinSiteUrl('sitemap-categories.xml'),
        joinSiteUrl('sitemap-blogs.xml'),
        ...reportPaths.map((path) => joinSiteUrl(path)),
      ];
    }
  );
}
