import React, { useEffect, useState } from 'react';
import { ApiHandler, fetchData } from '../../../Api/ApiHandler';
import { Loader, Toast } from '../../../Common/Commons';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const SurveyInfo = dynamic(() => import('../../../Public/Survey/SurveyInfo'));
const SurveyThankYou = dynamic(() => import('../../../Public/Survey/SurveyThankYou'));

export default function SurveyUpsert({ response, isAdmin, isAdminView }) {
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [survey, setSurvey] = useState(null);
    const [isEndOfSurvey, setEndOfSurvey] = useState(false);

    const abortController = new AbortController();

    useEffect(() => {
        if (!response) {
            return;
        }

        fetchData(setIsLoading, abortController, ApiHandler.ApiUrls.SurveyAdmin.Get, setSurvey, response.SurveyId);

        return (() => {
            abortController.abort();
        })
    }, [response])

    if (isLoading) {
        return <Loader />
    }

    if (!survey) {
        if (toastMessage) {
            return (
                <Toast open={toastMessage.Message ? true : false}
                    severity={toastMessage.Severity}
                    message={toastMessage.Message}
                    onHide={() => setToastMessage(undefined)}
                />
            )
        }

        return null;
    }

    if (isEndOfSurvey) {
        return (
            <SurveyThankYou />
        )
    }

    return (
        <Box>
            <SurveyInfo survey={survey} loadingIpAddress={false} surveyResponse={response} setToastMessage={setToastMessage} setEndOfSurvey={setEndOfSurvey} isAdmin={isAdmin} isAdminView={isAdminView} />
        </Box>
    )
}