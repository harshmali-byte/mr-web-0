import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const SurveyTextInputOptions = dynamic(() => import('./SurveyTextInputOptions'));
const SurveyNumberInputOptions = dynamic(() => import('./SurveyNumberInputOptions'));

export default function SurveySingleSelectOptions({ question, options, preSelectedOptions, preAnswerText, onOptionSelected }) {
    const [mdItems, setMdItems] = useState(6);
    const [allowFreeTextAnswer, setAllowFreeTextAnswer] = useState(false);

    useEffect(() => {
        if (!question) {
            return;
        }

        setAllowFreeTextAnswer(question.AllowFreeTextAnswer);
    }, [question]);

    useEffect(() => {
        if (!options || options.length === 0) {
            return null;
        }

        if (options.length < 4) {
            setMdItems(12 / options.length);
        }
    }, [options])

    function onTextInputSubmit(incrBy, textValues) {
        onOptionSelected(incrBy, textValues);
    }

    if (!options || options.length === 0) {
        return null;
    }

    return (
        <Box>
            <Grid container spacing={2} sx={{ display: 'flex', flex: 1 }}>
                {
                    options.map(opt => {
                        return (
                            <Grid item key={opt.Id} xs={12} md={mdItems} sx={{ display: 'flex', flex: '0 1 auto' }}>
                                <Button variant='contained' color={preSelectedOptions && preSelectedOptions.indexOf(opt.Id) > -1 ? 'warning' : 'primary'} onClick={() => onOptionSelected(1, [opt.Id])} sx={{ display: 'flex', flex: 1 }}>{opt.Name}</Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
            {
                allowFreeTextAnswer &&
                <Box sx={{ my: 2 }}>
                    {
                        question.FreeTextQuestionType && question.FreeTextQuestionType === 3
                            ? <SurveyNumberInputOptions question={question} onOptionSelected={onTextInputSubmit} preAnswerText={preAnswerText} label='Other - please specify here' />
                            : <SurveyTextInputOptions question={question} onOptionSelected={onTextInputSubmit} preAnswerText={preAnswerText} label='Other - please specify here' />
                    }
                </Box>
            }
        </Box>
    )
}