import React, { useEffect } from 'react';
import { ApiHandler } from '../../components/Api/ApiHandler';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const BlogView = dynamic(() => import('../../components/Public/Blog/BlogView/BlogView'));

export default function BlogTitle({ response, status }) {
    const router = useRouter();

    useEffect(() => {
        if (status === 404) {
            router.push(`/Error/${status}`);
        }
    }, [status])

    return (
        <PublicLayout isNotContainer={true}>
            <BlogView blog={response} />
        </PublicLayout>
    )
}

export async function getServerSideProps({ params }) {
    const { title } = params;
    let model = new Object();
    model.MetaUrl = title;
    model.IsSummaryRequired = true;

    const resDetails = await ApiHandler.ApiService.PostSSR(model, ApiHandler.ApiUrls.Blog.GetDetails, null);
    const dataDetails = await resDetails.json();

    return {
        props: {
            response: dataDetails.Data || '',
            status: dataDetails.Data ? 200 : 404
        }
    }
}