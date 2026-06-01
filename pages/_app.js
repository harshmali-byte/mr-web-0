import '../styles/globals.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../components/Auth/AuthContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { enUS } from 'date-fns/locale'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import theme from '../styles/theme';
import { OrgInfo } from '../components/Common/Constants';
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from '../lib/gtag';
import { Analytics } from '@vercel/analytics/react';
import PageLoader from '../components/Common/PageLoader';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTM_CODE
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!gtag || !gtag.GA_TRACKING_ID) {
      return;
    }

    const handleRouteChangeComplete = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    setIsLoading(false);
  }, [])

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GTM_CODE) {
      TagManager.initialize(tagManagerArgs)
    }
  }, [])

  return (
    <>
      {
        gtag && gtag.GA_TRACKING_ID
          ? <>
            <Script
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
          </>
          : null
      }

      {isLoading && <PageLoader />}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme[process.env.NEXT_PUBLIC_ORG]}>
          <AuthProvider>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
              <Head>
                <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CODE} />
                <title>{Component.title || OrgInfo.FullName}</title>
                <link rel="apple-touch-icon" sizes="180x180" href={`/favicon/${process.env.NEXT_PUBLIC_ORG}/apple-touch-icon.png`} />
                <link rel="icon" type="image/png" sizes="32x32" href={`/favicon/${process.env.NEXT_PUBLIC_ORG}/favicon-32x32.png`} />
                <link rel="icon" type="image/png" sizes="16x16" href={`/favicon/${process.env.NEXT_PUBLIC_ORG}/favicon-16x16.png`} />
                <link rel="manifest" href={`/favicon/${process.env.NEXT_PUBLIC_ORG}/site.webmanifest`} />
                <link rel="mask-icon" href={`/favicon/${process.env.NEXT_PUBLIC_ORG}/safari-pinned-tab.svg`} color="#5bbad5" />
              </Head>
              <Component {...pageProps} />
            </LocalizationProvider>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
      {process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true' && <Analytics />}
    </>
  );
}

export default MyApp
