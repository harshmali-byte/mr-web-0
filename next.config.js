/** @type {import('next').NextConfig} */
const path = require('path');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  //   {
  //     key: 'Content-Security-Policy',
  //     value: `
  //   default-src 'self' wss;
  //   img-src 'self' https: data:;
  //   script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com;
  //   child-src brandessenceresearch.com 'unsafe-eval' 'unsafe-inline';
  //   style-src 'self' brandessenceresearch.com 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com;
  //   style-src-elem 'self' brandessenceresearch.com 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com;
  //   font-src 'self';
  // `.replace(/\s{2,}/g, ' ').trim()
  //   }
];

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['flagcdn.com', 'api.mr.com', 'geolocation-db.com', 'api.brandessenceresearch.in', 'aiapi.brandessenceresearch.in']
  },
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ]
  // },

  async rewrites() {
    return [
      {
        source: '/sitemap-reports/:category.xml',
        destination: '/api/sitemap/reports/:category',
      },
    ];
  },

  redirects: async () => {
    // Local dev: avoid blocking startup/first request on remote Redirect API.
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_APIURL}/Redirect/Get`
      );
      const data = await response.json();
      if (data.IsSuccess && data.Data) {
        return data.Data.map((redirect) => ({
          source: redirect.Source,
          destination: redirect.Destination,
          permanent: redirect.IsPermanent,
        }));
      }
    } catch (error) {
      console.warn('[redirects] Failed to load redirects:', error.message);
    }
    return [];
  },
}

module.exports = nextConfig
