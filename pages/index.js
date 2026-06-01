import React from 'react';
import path from 'path';
import fs from 'fs';
import dynamic from 'next/dynamic';

const PublicHome = dynamic(() => import('../components/Public/Home/PublicHome'));
const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));

export default function Home(props) {

  return (
    <PublicLayout isNotContainer={true} marginTop={5}>
      <PublicHome {...props} />
    </PublicLayout>
  )
}

export async function getStaticProps() {
  let homeBrowseReportsFilePath = path.join(process.cwd(), `./Data/${process.env.NEXT_PUBLIC_ORG}/Home/HomeBrowseReports.json`);
  let homeFeatureCategoriesFilePath = path.join(process.cwd(), `./Data/${process.env.NEXT_PUBLIC_ORG}/Home/HomeFeatureCategories.json`);
  let homeTopSellingReportsFilePath = path.join(process.cwd(), `./Data/${process.env.NEXT_PUBLIC_ORG}/Home/HomeTopSellingReports.json`);

  const homeBrowseReportsFileContents = fs.readFileSync(homeBrowseReportsFilePath, 'utf8');
  const homeFeatureCategoriesFileContents = fs.readFileSync(homeFeatureCategoriesFilePath, 'utf8');
  const homeTopSellingReportsFileContents = fs.readFileSync(homeTopSellingReportsFilePath, 'utf8');

  const homeBrowseReports = JSON.parse(homeBrowseReportsFileContents);
  const homeFeatureCategories = JSON.parse(homeFeatureCategoriesFileContents);
  const homeTopSellingReports = JSON.parse(homeTopSellingReportsFileContents);

  return {
    props: {
      homeBrowseReports,
      homeFeatureCategories,
      homeTopSellingReports
    },
  };
}