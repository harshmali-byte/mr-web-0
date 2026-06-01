import { useEffect, useState } from 'react';
import { ApiHandler } from '../../Api/ApiHandler';
import { Toast, Loader } from '../../Common/Commons';
import { APIMessages } from '../../Common/Constants';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';

const SurveyLayout = dynamic(() => import('../Layout/Survey/SurveyLayout'));
const SurveyInfo = dynamic(() => import('./SurveyInfo'));
const SurveyCreate = dynamic(() => import('./SurveyCreate'));
const SurveyThankYou = dynamic(() => import('./SurveyThankYou'));

export default function SurveyView({ name }) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [surveyResponse, setSurveyResponse] = useState(null);
    const [creatingResponse, setCreatingResponse] = useState(true);
    const [isEndOfSurvey, setEndOfSurvey] = useState(false);

    const abortController = new AbortController();

    useEffect(() => {
        if (!name) {
            return;
        }

        fetchSurvey();

        return (() => {
            abortController.abort();
        })

    }, [name]);

    function fetchSurvey() {
        setIsLoading(true);

        let searchModel = new Object();
        searchModel.Url = name;

        ApiHandler.ApiService.Post(searchModel, ApiHandler.ApiUrls.Survey.Get, abortController)
            .then(
                (result) => {
                    if (abortController.signal.aborted) {
                        return;
                    }

                    let message;
                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            setData(result.Data);
                        }
                        else {
                            message = { Message: result.Message || 'Fail to fetch survey', Severity: 'error' };
                        }
                    }
                    else {
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };
                    }

                    setToastMessage(message);
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoading(false);
                    setToastMessage({ Message: APIMessages.APIExceptionMessage, Severity: 'error' });
                    console.error(error);
                }
            )
    }

    if (isLoading) {
        return <Loader />
    }

    if (!data) {
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
            <SurveyLayout survey={data}>
                <SurveyThankYou />
            </SurveyLayout>
        )
    }

    return (
        <SurveyLayout survey={data} message={toastMessage}>
            <SurveyCreate survey={data} setSurveyResponse={setSurveyResponse} setCreatingResponse={setCreatingResponse} />
            <SurveyInfo survey={data} loadingIpAddress={creatingResponse} surveyResponse={surveyResponse} setToastMessage={setToastMessage} setEndOfSurvey={setEndOfSurvey}
                isAdmin={false} isAdminView={true}
            />
            <Typography sx={{ my: 2, textAlign: 'center' }}>{`We prioritize your data and responses' security. Safeguarding your privacy is our core focus`}</Typography>
        </SurveyLayout>
    )
}