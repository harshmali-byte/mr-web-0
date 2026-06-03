import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const About = dynamic(() => import('../components/Public/AboutUs/About'));

export default function AboutUsPage() {
  return (
    <PublicLayout isNotContainer={true}>
      <About />
    </PublicLayout>
  );
}
