import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const FaqPage = dynamic(() => import('../components/Public/Assistances/FAQ/FaqPage'));

export default function FAQPage() {
  return (
    <PublicLayout>
      <FaqPage />
    </PublicLayout>
  );
}
