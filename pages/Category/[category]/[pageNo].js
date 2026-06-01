import React from 'react';
import fetchResearchByCategory from '../../../components/SSR/Categories';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../../components/Public/Layout/PublicLayout'));
const ResearchList = dynamic(() => import('../../../components/Public/Research/ResearchList'));

export default function PageNo({ category, pageNo, response }) {

    return (
        <PublicLayout>
            <ResearchList categoryUrl={category} pageNo={pageNo} response={response} />
        </PublicLayout>
    )
}

export async function getServerSideProps({ params }) {
    return await fetchResearchByCategory(params);
}