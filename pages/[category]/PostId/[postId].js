import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ApiHandler } from '../../../components/Api/ApiHandler';
import { RequestTypes } from '../../../components/Common/Constants';

const PublicLayout = dynamic(() => import('../../../components/Public/Layout/PublicLayout'));
const RequestQuery = dynamic(() => import('../../../components/Public/QueryForms/RequestQuery'), { ssr: true });

export default function RequestPost({ requestType, postId, response }) {
    const [RequestFormType, setRequestFormType] = useState(null);

    useEffect(() => {
        if (!requestType) {
            return;
        }

        let requestFormType = RequestTypes.find(f => f.name.toLowerCase() === requestType.toLowerCase());
        if (!requestFormType) {
            console.error('request Form Type is null');
            // navigate user to common error page
            return;
        }

        setRequestFormType(requestFormType);
    }, [requestType])

    function addHeaders() {
        if (!response) {
            return null;
        }

        return (
            <Head>
                {
                    response.PostKey
                        ? <title>{`${RequestFormType ? RequestFormType.requestText : 'Request'}_${response.PostKey}`}</title>
                        : <title>{`${RequestFormType ? RequestFormType.requestText : 'Request'}`}</title>
                }
                <meta name="robots" content="noindex, nofollow" />
            </Head>
        )
    }

    return (
        <PublicLayout isNotContainer={true} hideMenu={true}>
            {addHeaders()}
            <RequestQuery requestType={requestType} postId={postId} research={response} />
        </PublicLayout>
    )
}

export async function getServerSideProps({ params }) {
    const { category, postId } = params;
    let model = new Object();
    model.Id = postId;
    model.IsSummaryRequired = false;
    let token = null; // take from cookie

    const resDetails = await ApiHandler.ApiService.PostSSR(model, ApiHandler.ApiUrls.Research.GetDetails, token);
    const dataDetails = await resDetails.json();

    return {
        props: {
            requestType: category,
            postId: postId,
            response: dataDetails.Data || '',
            status: dataDetails.Data ? 200 : 500
        }
    }
}
