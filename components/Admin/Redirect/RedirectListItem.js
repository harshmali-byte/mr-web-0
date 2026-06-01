import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Switch, Grid, Button, IconButton } from '@mui/material';
import { APIMessages, ValidationMessages } from '../../Common/Constants';
import { Loader } from '../../Common/Commons';
import RedirectDetailsModel from '../../Models/Redirects/RedirectDetailsModel';
import RedirectDetailsValidationModel from '../../Models/Redirects/RedirectDetailsValidationModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';
import { ApiHandler } from '../../Api/ApiHandler';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function RedirectListItem({ redirection, OnDoneUpsertAction, OnDelete }) {
    const [IsLoading, setIsLoading] = useState(false);
    const [Model, setModel] = useState(new RedirectDetailsModel());
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);

    const validation = new RedirectDetailsValidationModel();
    let upsertAbortController = new AbortController();

    useEffect(() => {
        setModel(redirection || new RedirectDetailsModel());
    }, [redirection])


    function setError(prop) {
        return FormHandler.SetError(prop, ValidationErrors);
    }

    const setFormTextValues = (prop, dataType) => (event) => {
        FormHandler.setFormTextValues(prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    const setFormCheckValues = (prop) => (event) => {
        FormHandler.setFormCheckValues(prop, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    function upsertModel() {
        setIsLoading(true);

        let validateErrors = [];
        for (const item in validation) {
            let validationItem = validation[item];
            let validateError = validationItem.Validate(Model[item]);
            if (validateError) {
                validateErrors.push(validateError);
            }
        }

        setValidationErrors(validateErrors);

        if (validateErrors && validateErrors.length > 0) {
            setIsLoading(false);
            OnDoneUpsertAction({ Message: ValidationMessages.ValidationFailed, Severity: 'error' });
            return;
        }

        ApiHandler.ApiService.Post(Model, ApiHandler.ApiUrls.RedirectAdmin.UpsertRedirect)
            .then(
                (result) => {
                    let message;

                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            message = { Message: result.Message || `Redirection ${Model && Model.Id > 0 ? 'Updated' : 'Added'} Successfully`, Severity: 'success' };
                            if (!Model.Id) {
                                setModel(new RedirectDetailsModel());
                            }
                            else {
                                setModel(result.Data);
                            }
                        }
                        else {
                            if (result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                                setValidationErrors(result.Data.Errors);
                                message = { Message: result.Message || `Fail to ${Model && Model.Id > 0 ? 'update' : 'add'} redirection`, Severity: 'error' };
                            }
                            else {
                                message = { Message: result.Message, Severity: 'error' };
                            }
                        }
                    }
                    else {
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };
                    }

                    setIsLoading(false);
                    OnDoneUpsertAction(message);
                },
                (error) => {
                    setIsLoading(false);
                    console.log(JSON.stringify(error))
                    OnDoneUpsertAction({ Message: JSON.stringify(error), Severity: 'error' });
                }
            )
    }

    function deleteModel() {
        setIsLoading(true);
        let modelId = Model.Id;

        ApiHandler.ApiService.Post(Model, ApiHandler.ApiUrls.RedirectAdmin.DeleteRedirect)
            .then(
                (result) => {
                    let message;

                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            message = { Message: result.Message || `Redirection Deleted Successfully`, Severity: 'success' };
                            setModel(new RedirectDetailsModel());
                        }
                        else {
                            if (result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                                setValidationErrors(result.Data.Errors);
                                message = { Message: result.Message || `Fail to delete redirection`, Severity: 'error' };
                            }
                            else {
                                message = { Message: result.Message, Severity: 'error' };
                            }
                        }
                    }
                    else {
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };
                    }

                    setIsLoading(false);
                    OnDelete(message, modelId);
                },
                (error) => {
                    setIsLoading(false);
                    console.log(JSON.stringify(error))
                    OnDoneUpsertAction({ Message: JSON.stringify(error), Severity: 'error' });
                }
            )
    }

    function ShowAction() {
        if (IsLoading) {
            return <Loader rounded={true} />
        }

        if (redirection && redirection.Id) {
            return (
                <>
                    <Button variant="contained" onClick={upsertModel}>Save</Button>
                    <IconButton variant="standard" onClick={deleteModel}><DeleteForeverIcon /></IconButton>
                </>
            )
        }

        return <Button variant="contained" onClick={upsertModel}>Add</Button>
    }

    return (
        <form>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={4.25}>
                    <FormControl fullWidth >
                        <FormTextField fieldError={setError('Source')} label='Source' value={Model.Source} onChange={setFormTextValues('Source')} />
                    </FormControl>
                </Grid>
                <Grid item xs={4.25}>
                    <FormControl fullWidth >
                        <FormTextField fieldError={setError('Destination')} label='Destination' value={Model.Destination} onChange={setFormTextValues('Destination')} />
                    </FormControl>
                </Grid>
                <Grid item xs={1.25}>
                    <FormControl fullWidth >
                        <FormControlLabel control={<Switch checked={Model.IsPermanent ? Model.IsPermanent : false} onChange={setFormCheckValues('IsPermanent')} color="warning" />} label="Permanent" />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl fullWidth >
                        <FormControlLabel control={<Switch checked={Model.IsActive ? Model.IsActive : false} onChange={setFormCheckValues('IsActive')} color="info" />} label="Active" />
                    </FormControl>
                </Grid>
                <Grid item xs={1.25}>
                    {ShowAction()}
                </Grid>
            </Grid>
        </form>
    )
}