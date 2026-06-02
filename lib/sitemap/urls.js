import { getSiteBaseUrl } from './config';

export function joinSiteUrl(pathSegment) {
  const base = getSiteBaseUrl();
  if (!pathSegment) {
    return `${base}/`;
  }
  const path = pathSegment.startsWith('/') ? pathSegment.slice(1) : pathSegment;
  return `${base}/${path}`;
}

export function formatLastmod(dateValue) {
  if (!dateValue) {
    return undefined;
  }
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return date.toISOString().split('T')[0];
}

export function resolveAbsoluteUrl(canonicalOrPath, fallbackPath) {
  if (canonicalOrPath && /^https?:\/\//i.test(canonicalOrPath)) {
    return canonicalOrPath;
  }
  if (canonicalOrPath) {
    const trimmed = canonicalOrPath.replace(/^\//, '');
    return joinSiteUrl(trimmed);
  }
  return joinSiteUrl(fallbackPath);
}

export function buildResearchPath(post) {
  const category = post.CategoryUrl;
  const slug = post.MetaUrl || post.PostKey;
  if (!category || !slug) {
    return null;
  }
  return `${category}/${encodeURIComponent(slug)}`;
}

export function buildBlogPath(post) {
  if (post.BlogUrl) {
    const blogUrl = post.BlogUrl.trim();
    if (/^https?:\/\//i.test(blogUrl)) {
      return blogUrl;
    }
    return blogUrl.replace(/^\//, '');
  }
  if (post.MetaUrl) {
    return `blog/${encodeURIComponent(post.MetaUrl)}`;
  }
  return null;
}
