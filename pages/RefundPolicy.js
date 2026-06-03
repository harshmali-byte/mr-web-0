import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const RefundPolicyPage = dynamic(() => import('../components/Public/Assistances/RefundPolicy/RefundPolicyPage'));

export default function RefundPolicyRoute() {
  return (
    <PublicLayout>
      <RefundPolicyPage />
    </PublicLayout>
  );
}
