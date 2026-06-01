import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ApiHandler, fetchData } from '../../../Api/ApiHandler';
import Loader from '../../../Common/Loader';

const SurveyUpsert = dynamic(() => import('./SurveyUpsert'));

export default function SurveyEdit({ authorization, responseId, isAdminView }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const abortController = new AbortController();

    useEffect(() => {
        if (!responseId) {
            return;
        }

        fetchData(setIsLoading, abortController, ApiHandler.ApiUrls.SurveyAdmin[isAdminView ? 'GetResponse' : 'GetResponseClient'], setResponse, responseId);

        return (() => {
            abortController.abort();
        })
    }, [responseId])

    if (!authorization || isLoading) {
        return <Loader />
    }

    if (!authorization.CanEdit || !response) {
        router.push('/Admin/Unauthorized');
    }

    return (
        <SurveyUpsert response={response} isAdmin={true} isAdminView={isAdminView} />
    )
}