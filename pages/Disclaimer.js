import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const DisclaimerPage = dynamic(() => import('../components/Public/Assistances/Disclaimer/DisclaimerPage'));

export default function DisclaimerRoute() {
  return (
    <PublicLayout>
      <DisclaimerPage />
    </PublicLayout>
  );
}
