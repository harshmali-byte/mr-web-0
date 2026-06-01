import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import { ApiHandler } from '../../../Api/ApiHandler';

const Loader = dynamic(() => import('../../../Common/Loader'));
const SurveyQuestionItem = dynamic(() => import('./SurveyQuestionItem'));
const SurveyConfirmation = dynamic(() => import('../SurveyConfirmation'));

export default function SurveyQuestionsView({ survey, surveyResponse, setToastMessage, setEndOfSurvey, isAdmin, setQueHelpText, isAdminView }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [parentQuestion, setParentQuestion] = useState(null);
    const [currentOptions, setCurrentOptions] = useState(null);
    const [currentResponse, setCurrentResponse] = useState(null);
    const [isEndOfSurvey, setIsEndOfSurvey] = useState(null);

    const [hidePrev, setHidePrev] = useState(true);

    const [questions, setQuestions] = useState(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);

    const [responses, setResponses] = useState([]);
    const [responsesLoading, setResponsesLoading] = useState(true);

    const [questionOptions, setQuestionOptions] = useState(null);
    const [questionOptionsLoading, setQuestionOptionsLoading] = useState(true);

    const [questionDependencies, setQuestionDependencies] = useState(null);
    const [questionDependenciesLoading, setQuestionDependenciesLoading] = useState(true);

    const questionsAbortController = new AbortController();
    const questionOptionsAbortController = new AbortController();
    const questionDependenciesAbortController = new AbortController();
    const responsesAbortController = new AbortController();

    let answerAbortController = new AbortController();

    useEffect(() => {
        if (!survey || !surveyResponse) {
            return;
        }

        fetchData(setQuestionsLoading, questionsAbortController, 'GetQuestions', setQuestions);
        fetchData(setQuestionOptionsLoading, questionOptionsAbortController, 'GetQuestionOptions', setQuestionOptions);
        fetchData(setQuestionDependenciesLoading, questionDependenciesAbortController, 'GetQuestionDependencies', setQuestionDependencies);
        fetchData(setResponsesLoading, responsesAbortController, isAdminView ? 'GetQuestionResponses' : 'GetQuestionResponsesClient', fillResponses, `${survey.Id}/${surveyResponse.Id}`);

        return (() => {
            questionsAbortController.abort();
            questionOptionsAbortController.abort();
            questionDependenciesAbortController.abort();
            responsesAbortController.abort();
        })
    }, [survey, surveyResponse]);

    useEffect(() => {
        if (!questions || questions.length === 0) {
            return;
        }

        navigateQuestion(1);
    }, [questions])

    // Get options for question
    useEffect(() => {
        setQueHelpText(null);
        if (!currentQuestion || !questionOptions) {
            return;
        }

        setQueHelpText(currentQuestion ? currentQuestion.HelpText : null);

        let parentQue = getParentQuestion(currentQuestion);

        let queOptions;
        if (questionOptions && questionOptions.length > 0) {
            let queId = parentQue ? parentQue.Id : currentQuestion.Id;
            queOptions = questionOptions.filter(f => f.QuestionId === queId);
        }

        setCurrentOptions(queOptions)
    }, [questionOptions, currentQuestion])

    useEffect(() => {
        if (responsesLoading || !currentQuestion) {
            return;
        }

        // find already selected response for the question
        let curRes;
        if (responses && responses.length > 0) {
            curRes = responses.find(f => f.QuestionId === currentQuestion.Id);
        }

        setCurrentResponse(curRes);

    }, [responsesLoading])

    function fillResponses(savedResponses) {
        if (!savedResponses || savedResponses.length === 0) {
            return;
        }


        let questionIds = [];

        savedResponses.forEach(r => {
            if (questionIds.indexOf(r.QuestionId) === -1) {
                questionIds.push(r.QuestionId);
            }
        });

        if (!questionIds || questionIds.length === 0) {
            return;
        }

        let ress = [];

        questionIds.forEach(queId => {
            let res = {};
            let questionRes = savedResponses.filter(f => f.QuestionId === queId);

            res.QuestionId = queId;

            let resWithText = questionRes.find(f => f.AnswerText && f.AnswerText.length > 0);
            if (resWithText) {
                res.AnswerText = resWithText.AnswerText;
            }
            else {
                res.SurveyQuestionOptionsIds = [];
                questionRes.forEach(r => {
                    res.SurveyQuestionOptionsIds.push(r.SurveyQuestionOptionsId);
                });
            }

            ress.push(res);
        })

        setResponses(ress);
    }

    function fetchData(setLoading, abortController, apiName, setData, params) {
        setLoading(true);

        try {
            ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.Survey[apiName], params || survey.Id, abortController)
                .then(
                    (result) => {
                        if (abortController.signal.aborted) {
                            return;
                        }

                        if (result && result.IsSuccess && result.Data) {
                            setData(result.Data);
                        }
                        else {
                            setData(null);
                        }

                        setLoading(false);
                    },
                    (error) => {
                        setLoading(false);
                        console.error(error);
                    }
                )
        }
        catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

    // Get Parent Question
    function getParentQuestion(curQue) {
        let parentQue;
        if (curQue.ParentQuestionId) {
            parentQue = questions.find(f => f.Id === curQue.ParentQuestionId);
        }

        return parentQue;
    }

    function getExistingResponse(question) {
        let resps;

        let queExistingRes = responses && responses.find(f => f.QuestionId === question.Id);
        if (queExistingRes) {
            resps = responses.filter(f => f.QuestionId !== question.Id);
        }
        else {
            resps = responses;
        }

        if (!resps) {
            resps = [];
        }
        return resps;
    }

    function onOptionsSelect(incrBy, question, selOpts) {
        if (!selOpts) {
            return;
        }

        let saveModel = {};
        saveModel.SurveyId = survey.Id;
        saveModel.SurveyResponsesId = surveyResponse.Id;
        saveModel.QuestionId = question.Id;
        saveModel.SurveyQuestionOptionsIds = [];
        saveModel.AnswerText = null;
        saveModel.Id = 0;

        if (isAdmin) {
            saveModel.CreatedDate = surveyResponse.CreatedDate;
            saveModel.UpdatedDate = surveyResponse.UpdatedDate;
        }

        selOpts.forEach((selOpt) => {
            if (typeof selOpt === 'string') {
                saveModel.AnswerText = selOpt;
            }
            else {
                saveModel.SurveyQuestionOptionsIds.push(parseInt(selOpt));
            }
        });

        UpsertResponse(saveModel, question);
        navigateQuestion(incrBy);
    }

    function skipQuestion() {
        navigateQuestion(1);
    }

    function UpsertResponse(saveModel, question) {
        try {
            saveModel.IsAdminView = isAdminView;
            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.Survey.UpsertAnswer, answerAbortController)
                .then(
                    (result) => {
                        if (answerAbortController.signal.aborted) {
                            return;
                        }

                        if (!result || !result.IsSuccess) {
                            return;
                        }

                        let resps = getExistingResponse(question);

                        resps.push(saveModel);
                        setResponses(resps);
                    },
                    (error) => {
                        console.error(error);
                    }
                )
        }
        catch (err) {
            console.error(err);
        }
    }

    function navigateQuestion(incrBy) {
        let index = currentQuestionIndex;
        let nextQuestion;

        do {
            index = index + incrBy;
            setHidePrev(index <= 0);

            // if increament/decreament is out of array index then, show current question
            if (index < 0 || index >= questions.length) {
                index = currentQuestionIndex;
                break;
            }

            let question = questions[index];
            let queDeps;

            if (!question) {
                continue;
            }

            // if Question type is null then, it has child questions. Don't show this question
            if (!question.QuestionType || question.QuestionType <= 0) {
                continue;
            }

            if (questionDependencies && questionDependencies.length > 0) {
                queDeps = questionDependencies.filter(f => f.QuestionId === question.Id)
            }

            let hideQuestion = false;

            if (queDeps && queDeps.length > 0) {
                queDeps.every((dep) => {
                    let res = responses.find(f => f.QuestionId === dep.DependQuestionId);
                    if (res) {
                        hideQuestion = res.SurveyQuestionOptionsIds.indexOf(dep.AnswerId) === -1;
                    }

                    // break every loop if hideQuestion has true value
                    return !hideQuestion;
                })
            }

            if (hideQuestion) {
                continue;
            }

            nextQuestion = question;
        } while (!nextQuestion);

        if (!nextQuestion) {
            setIsEndOfSurvey(true);
            return;
        }

        // no need to set state if question shown is first or last
        if (index === currentQuestionIndex) {
            return;
        }

        // find already selected response for the question
        let curRes;
        if (responses && responses.length > 0) {
            curRes = responses.find(f => f.QuestionId === nextQuestion.Id);
        }

        let parentQue = getParentQuestion(nextQuestion);
        setCurrentResponse(curRes);
        setParentQuestion(parentQue);
        setCurrentQuestionIndex(index)
        setCurrentQuestion(nextQuestion);
    }

    if (questionsLoading || questionOptionsLoading || questionDependenciesLoading || !currentOptions || !currentQuestion) {
        return <Loader />
    }

    if (!questions || questions.length === 0) {
        return null;
    }

    return (
        <Box>
            <Paper elevation={5}>
                <SurveyConfirmation showModal={isEndOfSurvey} setShowModal={() => setIsEndOfSurvey(false)} onYes={() => setEndOfSurvey(true)}
                    onNo={() => { setIsEndOfSurvey(false); navigateQuestion(-1); }}
                />
                <SurveyQuestionItem
                    question={currentQuestion}
                    parentQuestion={parentQuestion}
                    options={currentOptions}
                    currentResponse={currentResponse}
                    onSelect={onOptionsSelect}
                    setToastMessage={setToastMessage}
                    skipQuestion={skipQuestion}
                    navigateQuestion={navigateQuestion}
                    hidePrev={hidePrev}
                    isAdmin={isAdmin}
                />
            </Paper>
        </Box>
    )
}