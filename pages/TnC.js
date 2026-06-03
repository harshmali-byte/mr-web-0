import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const TncPage = dynamic(() => import('../components/Public/Assistances/TnC/TncPage'));

export default function TnCPage() {
  return (
    <PublicLayout>
      <TncPage />
    </PublicLayout>
  );
}
