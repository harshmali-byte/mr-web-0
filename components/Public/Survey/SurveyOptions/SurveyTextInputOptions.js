import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const SurveyOptionSubmit = dynamic(() => import('./SurveyOptionSubmit'));

export default function SurveyTextInputOptions({ question, onOptionSelected, preAnswerText, customSubmitFn, label }) {
    const [textValue, setTextValue] = useState('');
    const [errorText, setErrorText] = useState('');
    const [startValidation, setStartValidation] = useState(false);

    useEffect(() => {
        if (!preAnswerText) {
            setTextValue('');
            return;
        }

        setTextValue(preAnswerText);
    }, [preAnswerText])

    useEffect(() => {
        if (!startValidation) {
            return;
        }

        validate();
    }, [textValue])

    const KeyPress = (e) => {
        setStartValidation(true);
        if (e.key === 'Enter') {
            e.preventDefault();
            onOptionSubmit();
        }
    }

    function validate() {
        let maxStrLimit = question.FreeAnswerTextLimit;

        if (!maxStrLimit) {
            return true;
        }

        if (textValue && textValue.length > maxStrLimit) {
            setErrorText(`Your answer is too long. Please answer in short words. Maximum letters allowed are ${maxStrLimit}`)
            return false;
        }

        setErrorText('');
        return true;
    }

    function onOptionSubmit() {
        if (customSubmitFn) {
            customSubmitFn(validate, textValue);
            return;
        }

        let isValidated = validate();

        if (!isValidated) {
            return;
        }

        onOptionSelected(1, [textValue ? textValue.toString() : '']);
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField variant="outlined" label={label || "Enter your answer"} value={textValue} onKeyPress={KeyPress}
                        onChange={(event) => setTextValue(event.target.value)}
                        sx={{ display: 'flex', flex: 1 }}
                        error={errorText ? true : false}
                        helperText={errorText}
                    />
                </Grid>
            </Grid>

            <SurveyOptionSubmit onOptionSubmit={onOptionSubmit} />
        </Box>
    )
}