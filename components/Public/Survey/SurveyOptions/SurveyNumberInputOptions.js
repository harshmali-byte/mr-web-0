import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const SurveyOptionSubmit = dynamic(() => import('./SurveyOptionSubmit'));

export default function SurveyNumberInputOptions({ question, options, preSelectedOptions, preAnswerText, onOptionSelected, customSubmitFn, label }) {
    const [textValue, setTextValue] = useState(preAnswerText);
    const [errorText, setErrorText] = useState('');
    const [startValidation, setStartValidation] = useState(false);

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
        if (!textValue) {
            setErrorText('Please enter number')
            return false;
        }

        let maxStrLimit = question.FreeAnswerTextLimit;

        if (!maxStrLimit) {
            return true;
        }

        if (parseInt(textValue) > maxStrLimit) {
            setErrorText(`Your numbers are too high. Please verify again. Maximum value allowed is ${maxStrLimit}`)
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

        onOptionSelected(1, [textValue.toString()]);
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField variant="outlined" label={label || "Enter number"} value={textValue} onKeyPress={KeyPress}
                        type='number'
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