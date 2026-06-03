import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const ResearchCategories = dynamic(() => import('../components/Public/Categories/ResearchCategories'));

export default function CategoriesPage() {
  return (
    <PublicLayout>
      <ResearchCategories />
    </PublicLayout>
  );
}
