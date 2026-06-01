import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('../../Common/Loader'));
const HtmlViewer = dynamic(() => import('../../Common/HtmlViewer'));
const SurveyQuestionsView = dynamic(() => import('./SurveyQuestions/SurveyQuestionsView'));
const SurveyForm = dynamic(() => import('./SurveyForm/SurveyForm'));

export default function SurveyInfo({ survey, loadingIpAddress, surveyResponse, setToastMessage, setEndOfSurvey, isAdmin, isAdminView }) {
    const [data, setData] = useState(null);
    const [isSurveyResponseCreated, setIsSurveyResponseCreated] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const [surveyResponseInfo, setSurveyResponse] = useState(null);
    const [queHelpText, setQueHelpText] = useState('');

    useEffect(() => {
        if (!survey) {
            return;
        }

        setData(survey);
    }, [survey])

    useEffect(() => {
        if (!surveyResponse) {
            return;
        }

        if (!surveyResponse.Id) {
            setToastMessage({ Message: "Due to security reason, we are unable to proceed with survye. Could you please refresh the page or try switching to different network?", Severity: 'error' });
            return;
        }

        setSurveyResponse(surveyResponse);
        setIsSurveyResponseCreated(true);
    }, [surveyResponse])

    function startSurvey() {
        if (loadingIpAddress) {
            return;
        }
        setShowInfo(false);
    }

    if (!data) {
        return <Loader />;
    }

    return (
        <Container sx={{ pb: 3 }}>
            <Slide direction="down" in={showInfo} mountOnEnter unmountOnExit>
                <Box>
                    <Paper elevation={5} sx={{ p: 2, mb: 2 }}>
                        <HtmlViewer id="survey-description" htmlText={data.Description} />
                    </Paper>
                    <Box>
                        <SurveyForm survey={data} surveyResponse={surveyResponseInfo}
                            setToastMessage={setToastMessage} isAdmin={isAdmin} isAdminView={isAdminView}
                            isCreatingSurvey={loadingIpAddress || !isSurveyResponseCreated} startSurvey={startSurvey}
                        />
                    </Box>
                </Box>
            </Slide>
            <Slide direction="up" in={!showInfo} mountOnEnter unmountOnExit>
                <Box>
                    <Box>
                        <SurveyQuestionsView survey={data} surveyResponse={surveyResponseInfo} setToastMessage={setToastMessage} setEndOfSurvey={setEndOfSurvey} isAdmin={isAdmin} setQueHelpText={setQueHelpText} isAdminView={isAdminView} />
                    </Box>
                    {
                        queHelpText &&
                        <Box sx={{ mb: 2 }}>
                            <Divider />
                            <Box sx={{ my: 2, py: 1, backgroundColor: '#eee', borderRadius: 3 }}>
                                <Box>
                                    <Typography sx={{ textAlign: "center", fontSize: 18, fontWeight: '900' }}>Definition</Typography>
                                    <Divider />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                    <HtmlViewer id="question-description" htmlText={queHelpText} />
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    }

                    <Box>
                        <Button variant="outlined" onClick={() => window.location.reload()} >Cancel the survey</Button>
                    </Box>
                </Box>
            </Slide>
        </Container>
    )
}