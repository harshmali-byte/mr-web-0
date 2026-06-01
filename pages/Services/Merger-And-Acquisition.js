import React from 'react';
import MAGuideBookData from '../../components/Public/Service/Merger/MAGuideBookData.json';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const MergerView = dynamic(() => import('../../components/Public/Service/Merger/MergerView'));

export default function MergerAndAcquisition({ MAGuideBooData }) {
    return (
        <PublicLayout isNotContainer={true}>
            <MergerView MAGuideBooData={MAGuideBooData} />
        </PublicLayout>
    )
}


export async function getServerSideProps() {
    return {
        props: {
            MAGuideBooData: MAGuideBookData
        }
    }
}