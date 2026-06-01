import React, { useEffect } from 'react';
import { ApiHandler } from '../../components/Api/ApiHandler';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const ResearchView = dynamic(() => import('../../components/Public/Research/ResearchView/ResearchView'));

export default function PostKey({ metaUrl, response, status }) {
    const router = useRouter();

    useEffect(() => {
        if (status === 404) {
            router.push(`/Error/${status}`);
        }
    }, [status])

    return (
        <PublicLayout isNotContainer={true}>
            <ResearchView researchMetaUrl={metaUrl} research={response} />
        </PublicLayout>
    )
}

export async function getServerSideProps({ params }) {
    const { category, metaUrl } = params;

    let model = new Object();
    model.CategoryUrl = category;
    model.MetaUrl = metaUrl;
    model.IsSummaryRequired = true;
    let token = null; // take from cookie

    const resDetails = await ApiHandler.ApiService.PostSSR(model, ApiHandler.ApiUrls.Research.GetDetails, token);
    const dataDetails = await resDetails.json();

    return {
        props: {
            metaUrl: metaUrl,
            response: dataDetails.Data || '',
            status: dataDetails.Data ? 200 : 404
        }
    }
}