import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Box, Divider } from '@mui/material';
import { OrgInfo } from '../../Common/Constants';

const HomeBrowseReports = dynamic(() => import('./HomeBrowseReports'));
const HomeFeaturedCategories = dynamic(() => import('./HomeFeaturedCategories'));
const HomeClients = dynamic(() => import('./HomeClients'));
const HomeTopSellings = dynamic(() => import('./HomeTopSellings'));
const HomeWhatWeDo = dynamic(() => import('./HomeWhatWeDo'));
const HomeOurStory = dynamic(() => import('./HomeOurStory'));
const HomeWeAreAnalyst = dynamic(() => import('./HomeWeAreAnalyst'));
const CustomerReview = dynamic(() => import('../../Common/CustomerReviews/CustomerReview'));
const HomeFocusedLibrary = dynamic(() => import('./HomeFocusedLibrary'));
const HomeBlog = dynamic(() => import('./HomeBlog'));
const HomeNewsAppearance = dynamic(() => import('./HomeNewsAppearance'));
const HomeTrusted = dynamic(() => import('./HomeTrusted'));
const OrgInformation = dynamic(() => import('../Layout/Scripts/OrgInformation'));
const SiteNavigation = dynamic(() => import('../Layout/Scripts/SiteNavigation'));

export default function PublicHome({ homeBrowseReports, homeFeatureCategories, homeTopSellingReports }) {
  function addHeaders() {
    return (
      <>
        {
          process.env.NEXT_PUBLIC_ISPRODUCTION && process.env.NEXT_PUBLIC_ISPRODUCTION === 'true' &&
          <>
            <OrgInformation />
            <SiteNavigation />
          </>
        }
        <Head>
          <title>{`${OrgInfo.FullName} | Syndicated Research Reports | Consulting & Advisory Services`}</title>
          <meta name="description" content={`Experience the most up-to-date market research studies and insights by ${OrgInfo.FullName}. Analyze industry dynamics to make informed decisions faster and more effectively.`} />
          <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />
        </Head>
      </>
    )
  }
  return (
    <Box sx={{ mb: 5 }}>
      {addHeaders()}

      <HomeBrowseReports homeBrowseReports={homeBrowseReports} />
      <HomeFeaturedCategories homeFeatureCategories={homeFeatureCategories} />
      <HomeClients />
      <HomeTopSellings homeTopSellingReports={homeTopSellingReports} />
      <HomeWhatWeDo />
      <HomeOurStory />
      <HomeWeAreAnalyst />
      <CustomerReview />
      <HomeFocusedLibrary />
      <HomeBlog />
      <Divider />
      <HomeNewsAppearance />
      <HomeTrusted />
    </Box>
  )
}