import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Grid, FormControlLabel, Switch, MenuItem } from '@mui/material';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages, ValidationMessages, RobotIndexes } from '../../Common/Constants';
import ResearchSEOModel from '../../Models/Research/ResearchSEOModel';
import ResearchSEOValidationModel from '../../Models/Research/ResearchSEOValidationModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';
import Loader from '../../Common/Loader';

export default function UpsertResearchSeo({ OnDoneUpsertAction, UpsertPressed, EditModel, setIsUpserted }) {
    const [IsLoading, setIsLoading] = useState(false);
    const [Model, setModel] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);

    const validation = new ResearchSEOValidationModel();
    let upsertAbortController = new AbortController();

    useEffect(() => {
        setModel(new ResearchSEOModel(EditModel));
        setIsUpserted(true);
    }, [EditModel])

    useEffect(() => {
        if (!UpsertPressed) {
            return;
        }

        upsertModel(upsertAbortController);

        return (() => {
            upsertAbortController.abort();
        })
    }, [UpsertPressed])


    const setFormTextValues = (prop, dataType) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormTextValues(prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    const setFormCheckValues = (prop) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormCheckValues(prop, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    const KeyPress = (e) => {
        FormHandler.KeyPress(e, () => {
            upsertAbortController = new AbortController();
            upsertModel(upsertAbortController);
        })
    }

    function setError(prop) {
        return FormHandler.SetError(prop, ValidationErrors);
    }

    function upsertModel(upsertAbortController) {
        setIsLoading(true);

        if (Model.Id <= 0) {
            OnDoneUpsertAction(EditModel, { Message: "Please Add Post Details first", Severity: 'error' }, true);
            return;
        }

        let saveModel = Model;
        if (!saveModel) {
            saveModel = new ResearchSEOModel();
        }

        if (!Model.MetaUrl) {
            saveModel.IsIndexed = false;
            setModel(saveModel);
        }

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
            OnDoneUpsertAction(EditModel, { Message: ValidationMessages.ValidationFailed, Severity: 'error' }, false);
            return;
        }

        ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.ResearchAdmin.UpsertSeo, upsertAbortController)
            .then(
                (result) => {
                    if (upsertAbortController.signal.aborted) {
                        setIsLoading(false);
                        OnDoneUpsertAction(EditModel, null, true);
                        return;
                    }

                    let successModel = null;
                    let message;

                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            successModel = result.Data;
                            message = { Message: result.Message || `Successfully ${Model && Model.Id > 0 ? 'updated' : 'added'} SEO for reasearch post`, Severity: 'success' };
                        }
                        else {
                            if (result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                                message = { Message: result.Data.Errors[0].ErrorMessage, Severity: 'error' };
                            }
                            else {
                                message = { Message: result.Message || `Fail to ${Model && Model.Id > 0 ? 'update' : 'add'} SEO for reasearch post`, Severity: 'error' };
                            }
                        }
                    }
                    else
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };

                    setIsLoading(false);
                    OnDoneUpsertAction(successModel || EditModel, message, successModel ? true : false);
                },
                (error) => {
                    setIsLoading(false);
                    console.log(JSON.stringify(error))
                    OnDoneUpsertAction(EditModel, { Message: JSON.stringify(error), Severity: 'error' });
                }
            )
    }

    if (IsLoading || !Model) {
        return <Loader />
    }

    return (
        <Card raised={true}>
            <CardContent>
                <Grid container spacing={1} rowSpacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('MetaUrl')} label="Meta URL" value={Model.MetaUrl} onKeyPress={KeyPress} onChange={setFormTextValues('MetaUrl')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('MetaTitle')} label="Meta Title" value={Model.MetaTitle} onKeyPress={KeyPress} onChange={setFormTextValues('MetaTitle')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('MetaDescription')} label="Meta Description" value={Model.MetaDescription} onKeyPress={KeyPress} onChange={setFormTextValues('MetaDescription')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('MetaTags')} label="Meta Tags" value={Model.MetaTags} onKeyPress={KeyPress} onChange={setFormTextValues('MetaTags')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('PostKey')} label="Post Key" value={Model.PostKey} onKeyPress={KeyPress} onChange={setFormTextValues('PostKey')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('CanonicalUrl')} label="Canonical Url" value={Model.CanonicalUrl} onKeyPress={KeyPress} onChange={setFormTextValues('CanonicalUrl')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                        <FormControl fullWidth >
                            <FormControlLabel control={<Switch checked={Model.MetaUrl && Model.IsIndexed} onChange={setFormCheckValues('IsIndexed')} />} label="Is Indexed" disabled={!Model.MetaUrl} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                        <FormControl fullWidth >
                            <FormTextField id="RobotIndex" select label="Robot Index" value={RobotIndexes ? Model.RobotIndex : 0} onChange={setFormTextValues('RobotIndex')} onKeyPress={KeyPress} fieldError={setError('RobotIndex')}>
                                {
                                    RobotIndexes
                                        ? RobotIndexes.map((ri) => (
                                            <MenuItem key={ri.id} value={ri.id}>
                                                {ri.title}
                                            </MenuItem>
                                        ))
                                        : <MenuItem key={0} value={0}>
                                            Loading...
                                        </MenuItem>
                                }
                            </FormTextField>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}