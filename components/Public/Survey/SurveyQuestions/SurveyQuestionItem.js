import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

const HtmlViewer = dynamic(() => import('../../../Common/HtmlViewer'));
const SurveyOptions = dynamic(() => import('../SurveyOptions/SurveyOptions'));

export default function SurveyQuestionItem({ question, parentQuestion, options, currentResponse, onSelect, setToastMessage, skipQuestion, navigateQuestion, hidePrev, isAdmin }) {
    const theme = useTheme();
    const [que, setQue] = useState(null);
    const [slide, setSlide] = useState(false);
    const [slideDirection, setSlideDirection] = useState("left");
    const [showNext, setShowNext] = useState(false);
    const [showPrev, setShowPrev] = useState(true);
    const [parQue, setParQue] = useState(true);
    const [isParQueChanged, setIsParQueChanged] = useState(false);

    useEffect(() => {
        // Show next button only for admin
        if (!currentResponse || !isAdmin) {
            return;
        }

        if (currentResponse.AnswerText && currentResponse.AnswerText && currentResponse.AnswerText.trim().length > 0) {
            setShowNext(true);
            return;
        }

        if (currentResponse.SurveyQuestionOptionsIds && currentResponse.SurveyQuestionOptionsIds.length > 0) {
            setShowNext(true);
        }
    }, [currentResponse])

    useEffect(() => {
        let queChanged = false;
        if (!parentQuestion || !parQue || !parentQuestion.Name || !parQue.Name) {
            queChanged = true;
        }

        if (parentQuestion && parQue && parentQuestion.Name !== parQue.Name) {
            queChanged = true;
        }

        if (queChanged) {
            setIsParQueChanged(!isParQueChanged);
        }
        setParQue(parentQuestion);
    }, [parentQuestion])

    useEffect(() => {
        if (!question) {
            return;
        }

        setQue(question);
        setSlide(true);
    }, [question])

    useEffect(() => {
        setShowPrev(!hidePrev);
    }, [hidePrev])

    function upsertAnswer(incrBy, selectedOptions) {
        setSlideDirection('left');
        setSlide(false);
        onSelect(incrBy, question, selectedOptions);
    }

    function skipAnswer() {
        setSlideDirection('left');
        setSlide(false);
        skipQuestion();
    }

    if (!que) {
        return null;
    }

    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, mt: 1 }}>
            {
                (showPrev || showNext) &&
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {
                        showPrev && (
                            <Box sx={{ mb: 2, display: "flex", justifyContent: 'flex-end', mr: 1 }}>
                                <Button variant="outlined" color="primary" onClick={() => {
                                    setSlideDirection('right'); setSlide(false); navigateQuestion(-1)
                                }}>{`< Previous`}</Button>
                            </Box>
                        )
                    }
                    {
                        showNext && (
                            <Box sx={{ mb: 2, display: "flex", justifyContent: 'flex-end' }}>
                                <Button variant="outlined" color="primary" onClick={skipAnswer}>{`Next >`}</Button>
                            </Box>
                        )
                    }
                </Box>
            }

            {
                parQue && (
                    <Box sx={{
                        display: 'flex', justifyContent: 'center',
                        backgroundColor: isParQueChanged ? theme.palette.primary.main : theme.palette.primary.dark, p: 1,
                        color: theme.palette.primary.contrastText,
                        textAlign: 'center'
                    }}>
                        <HtmlViewer id={`parent-question-${parQue.Id}`} htmlText={parQue.Name} />
                        <Divider sx={{ py: 2 }} />
                    </Box>
                )
            }
            {
                slide &&
                <Slide direction={slideDirection || 'left'} timeout={300} in={slide} mountOnEnter unmountOnExit>
                    <Box>
                        <Box sx={{
                            my: 2,
                            backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText,
                            textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 1
                        }}>
                            <HtmlViewer id={`question-${que.Id}`} htmlText={que.Name} />
                            <Divider sx={{ py: 1 }} />
                        </Box>
                        <Box>
                            <SurveyOptions question={que} options={options} currentResponse={currentResponse}
                                onOptionSelected={upsertAnswer} setToastMessage={setToastMessage} />
                        </Box>
                    </Box>
                </Slide>
            }
        </Paper>
    )
}