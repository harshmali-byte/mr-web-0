import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const SurveyOptionSubmit = dynamic(() => import('./SurveyOptionSubmit'));
const SurveySelectionOption = dynamic(() => import('./SurveySelectionOption'));
const SurveyTextInputOptions = dynamic(() => import('./SurveyTextInputOptions'));
const SurveyNumberInputOptions = dynamic(() => import('./SurveyNumberInputOptions'));

export default function SurveyMultiSelectOptions({ question, options, preSelectedOptions, preAnswerText, onOptionSelected, setToastMessage }) {
    const [mdItems, setMdItems] = useState(6);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allowFreeTextAnswer, setAllowFreeTextAnswer] = useState(false);
    const [preFreeAnswerText, setPreFreeAnswerText] = useState(null);

    useEffect(() => {
        if (!preAnswerText) {
            return;
        }

        setSelectedOptions([]);
        setPreFreeAnswerText(preAnswerText);
    }, [preAnswerText]);

    useEffect(() => {
        if (!preSelectedOptions || preSelectedOptions.length === 0) {
            return;
        }

        setSelectedOptions(preSelectedOptions);
        setPreFreeAnswerText('');
    }, [preSelectedOptions]);

    useEffect(() => {
        if (!question) {
            return;
        }

        setAllowFreeTextAnswer(question.AllowFreeTextAnswer);
    }, [question]);

    useEffect(() => {
        if (!options || options.length === 0) {
            return;
        }

        if (options.length < 4) {
            setMdItems(12 / options.length);
        }
    }, [options])

    function validate() {
        if (!selectedOptions || selectedOptions.length === 0) {
            setToastMessage({ Message: 'Please select answers', Severity: 'error' });
            return false;
        }

        let maxSelection = question.MaxAnswers;

        if (maxSelection && selectedOptions.length !== maxSelection) {
            setToastMessage({ Message: `You need to select ${maxSelection} answers`, Severity: 'error' });
            return false;
        }

        setToastMessage(null);
        return true;
    }

    function onSubmitTextOrSelection(fnValidateText, textValues) {
        if (textValues) {
            setSelectedOptions([]);
            let isValidated = fnValidateText();

            if (!isValidated) {
                return;
            }

            onOptionSelected(1, [textValues.toString()]);
            setPreFreeAnswerText('');
            setSelectedOptions([]);
            return;
        }

        onOptionSubmit();
    }

    function onOptionSubmit() {
        let isValidated = validate();

        if (!isValidated) {
            return;
        }

        onOptionSelected(1, selectedOptions);
        setPreFreeAnswerText('');
        setSelectedOptions([]);
    }

    function onSelectOption(selOpt) {
        setSelectedOptions(selOpt);
        setPreFreeAnswerText('');
    }

    if (!options || options.length === 0) {
        return null;
    }

    return (
        <Box>
            <Grid container spacing={2} sx={{ display: 'flex', flex: 1 }}>
                {
                    options.map(opt => {
                        return <SurveySelectionOption key={opt.Id} opt={opt} mdItems={mdItems}
                            selectedOptions={selectedOptions}
                            maxSelection={question.MaxAnswers}
                            setSelectedOptions={onSelectOption}
                        />
                    })
                }
            </Grid>
            {
                allowFreeTextAnswer
                    ? (
                        <Box sx={{ my: 2 }}>
                            {
                                question.FreeTextQuestionType && question.FreeTextQuestionType === 3
                                    ? <SurveyNumberInputOptions question={question} customSubmitFn={onSubmitTextOrSelection} preAnswerText={preAnswerText} label='Other - please specify here' />
                                    : <SurveyTextInputOptions question={question} customSubmitFn={onSubmitTextOrSelection} preAnswerText={preAnswerText} label='Other - please specify here' />
                            }
                        </Box>
                    )
                    : <SurveyOptionSubmit onOptionSubmit={onOptionSubmit} />
            }

        </Box>
    )
}