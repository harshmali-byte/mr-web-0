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
  experimental: {
    urlImports: ['https://checkout.razorpay.com/v1/checkout.js'],
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

  redirects: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_APIURL}/Redirect/Get`);
    const data = await response.json()
    if (data.IsSuccess && data.Data) {
      return data.Data.map(redirect => ({
        source: redirect.Source,
        destination: redirect.Destination,
        permanent: redirect.IsPermanent,
      }))
    }
    else {
      return [];
    }
  }
}

module.exports = nextConfig
