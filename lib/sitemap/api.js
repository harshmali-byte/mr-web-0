import { ApiHandler } from '../../components/Api/ApiHandler';
import { getCached } from './cache';
import { mapWithConcurrency } from './concurrency';
import {
  SITEMAP_API_CONCURRENCY,
  SITEMAP_CATEGORY_META_PAGE_SIZE,
  SITEMAP_FETCH_PAGE_SIZE,
  SITEMAP_MEMORY_CACHE_TTL_MS,
} from './config';

async function parseJsonResponse(response) {
  if (!response || !response.ok) {
    return null;
  }
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function fetchActiveCategories() {
  return getCached('sitemap:categories', SITEMAP_MEMORY_CACHE_TTL_MS, async () => {
    const response = await ApiHandler.ApiService.GetSSR(
      ApiHandler.ApiUrls.Category.GetAllActive
    );
    const data = await parseJsonResponse(response);
    if (!data || !data.IsSuccess || !Array.isArray(data.Data)) {
      return [];
    }
    return data.Data.filter((item) => item && item.CategoryUrl);
  });
}

async function postPagedSearch(model, url) {
  const response = await ApiHandler.ApiService.PostSSR(model, url, null);
  return parseJsonResponse(response);
}

export async function fetchResearchPostsByCategory(categoryUrl, pageNo, pageSize) {
  const searchModel = {
    CategoryUrl: categoryUrl,
    Paging: {
      CurrentPage: pageNo,
      PageSize: pageSize,
    },
  };

  return postPagedSearch(searchModel, ApiHandler.ApiUrls.Research.GetByCategory);
}

export async function fetchCategoryPagingMeta(categoryUrl) {
  const data = await fetchResearchPostsByCategory(
    categoryUrl,
    1,
    SITEMAP_CATEGORY_META_PAGE_SIZE
  );
  if (!data || !data.IsSuccess) {
    return { totalPages: 1 };
  }
  return {
    totalPages:
      data.Paging && data.Paging.TotalPages ? data.Paging.TotalPages : 1,
  };
}

export async function fetchAllResearchPostsForCategory(
  categoryUrl,
  pageSize = SITEMAP_FETCH_PAGE_SIZE
) {
  const cacheKey = `sitemap:reports:${categoryUrl}:${pageSize}`;

  return getCached(cacheKey, SITEMAP_MEMORY_CACHE_TTL_MS, async () => {
    const first = await fetchResearchPostsByCategory(categoryUrl, 1, pageSize);
    if (!first || !first.IsSuccess || !Array.isArray(first.Data)) {
      return [];
    }

    const posts = [...first.Data];
    const totalPages =
      first.Paging && first.Paging.TotalPages ? first.Paging.TotalPages : 1;

    if (totalPages <= 1) {
      return posts;
    }

    const remainingPages = [];
    for (let page = 2; page <= totalPages; page += 1) {
      remainingPages.push(page);
    }

    const pageResults = await mapWithConcurrency(
      remainingPages,
      SITEMAP_API_CONCURRENCY,
      (page) => fetchResearchPostsByCategory(categoryUrl, page, pageSize)
    );

    for (const data of pageResults) {
      if (data && data.IsSuccess && Array.isArray(data.Data)) {
        posts.push(...data.Data);
      }
    }

    return posts;
  });
}

export async function fetchBlogPostsPage(pageNo, pageSize = SITEMAP_FETCH_PAGE_SIZE) {
  const searchModel = {
    Paging: {
      CurrentPage: pageNo,
      PageSize: pageSize,
    },
  };

  return postPagedSearch(searchModel, ApiHandler.ApiUrls.Blog.GetAll);
}

export async function fetchAllBlogPosts(pageSize = SITEMAP_FETCH_PAGE_SIZE) {
  return getCached(`sitemap:blogs:${pageSize}`, SITEMAP_MEMORY_CACHE_TTL_MS, async () => {
    const first = await fetchBlogPostsPage(1, pageSize);
    if (!first || !first.IsSuccess || !Array.isArray(first.Data)) {
      return { posts: [], totalPages: 1 };
    }

    const posts = [...first.Data];
    const totalPages =
      first.Paging && first.Paging.TotalPages ? first.Paging.TotalPages : 1;

    if (totalPages > 1) {
      const remainingPages = [];
      for (let page = 2; page <= totalPages; page += 1) {
        remainingPages.push(page);
      }

      const pageResults = await mapWithConcurrency(
        remainingPages,
        SITEMAP_API_CONCURRENCY,
        (page) => fetchBlogPostsPage(page, pageSize)
      );

      for (const data of pageResults) {
        if (data && data.IsSuccess && Array.isArray(data.Data)) {
          posts.push(...data.Data);
        }
      }
    }

    return { posts, totalPages };
  });
}
