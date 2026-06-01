import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { Toast } from '../Commons';
import SubscribeModel from '../../Models/Subscribe/SubscribeModel';
import SubscribeModelValidation from '../../Models/Subscribe/SubscribeValidationModel';
import { ValidationMessages } from '../Constants';

export default function NewsletterSubscribe() {
    const [Model, setModel] = useState(new Object());
    const [ToastMessage, setToastMessage] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);

    const validation = new SubscribeModelValidation();

    const KeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            Subscribe();
        }
    }

    function setError(prop) {
        if (!ValidationErrors || ValidationErrors.length === 0) {
            return { IsError: false, ErrorMessage: '' }
        }

        let validError = ValidationErrors.filter(f => f.PropertyName === prop);
        if (!validError || validError.length === 0) {
            return { IsError: false, ErrorMessage: '' }
        }

        return { IsError: true, ...validError.pop() };
    }

    const setFormTextValues = (prop) => (event) => {
        ValidateForm(prop, event.target.value);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: event.target.value } });
    };

    function ValidateForm(prop, value) {
        if (!Model) {
            return;
        }

        let validationRule = Model.ValidationRule ? Model.ValidationRule[prop] : null;

        if (!validationRule) {
            return;
        }

        let validationError = validationRule.Validate(value);
        if (validationError) {
            setValidationErrors(err => [...err, validationError]);
            setIsValidForm(false);
        }
        else {
            setValidationErrors(err => err.filter(f => f.PropertyName !== prop));
            if (!ValidationErrors || ValidationErrors.length === 0) {
                setIsValidForm(true);
            }
        }
    }

    function Subscribe() {
        let saveModel = Model;
        if (!saveModel) {
            saveModel = new SubscribeModel();
        }

        setIsLoading(true);

        let validateErrors = [];
        for (const item in validation) {
            let validationItem = validation[item];
            let validateError = validationItem.Validate(saveModel.Request[item]);
            if (validateError) {
                validateErrors.push(validateError);
            }
        }

        setValidationErrors(validateErrors);

        if (validateErrors && validateErrors.length > 0) {
            setToastMessage({ Message: ValidationMessages.ValidationFailed, Severity: 'error' });
            setIsLoading(false);
            return;
        }

        setValidationErrors([]);

    }

    return (
        <Box>
            <form noValidate autoComplete="off">
                {
                    ToastMessage ?
                        <Toast open={ToastMessage.Message ? true : false}
                            severity={ToastMessage.Severity}
                            message={ToastMessage.Message}
                            onHide={() => setToastMessage(undefined)}
                        />
                        : null
                }

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                    <FormControl fullWidth>
                        <TextField variant="filled" size="small" label="Email Id" value={Model.EmailId} onKeyPress={KeyPress} onChange={setFormTextValues('EmailId')}
                            error={setError('EmailId').IsError} helperText={setError('EmailId').ErrorMessage}
                            InputProps={{
                                type: 'email',
                                disableUnderline: true
                            }}
                            sx={{
                                backgroundColor: '#fff',
                                pr: 0,
                                '& .MuiFilledInput-input': {
                                    backgroundColor: '#fff'
                                },
                                '& .MuiFilledInput-input:hover': {
                                    backgroundColor: '#fff'
                                }
                            }}
                        />
                    </FormControl>
                    <Button size="large" variant='contained' color="success" onClick={Subscribe} disableElevation sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                    }}>Subscribe</Button>
                </Box>
            </form>
        </Box>
    )
}