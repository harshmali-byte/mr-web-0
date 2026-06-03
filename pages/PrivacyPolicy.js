import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const PrivacyPolicyPage = dynamic(() => import('../components/Public/Assistances/PrivacyPolicy/PrivacyPolicyPage'));

export default function PrivacyPolicyRoute() {
  return (
    <PublicLayout>
      <PrivacyPolicyPage />
    </PublicLayout>
  );
}
