import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Grid } from '@mui/material';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages, ValidationMessages } from '../../Common/Constants';
import { Loader } from '../../Common/Commons';
import ResearchMarketPlayersModel from '../../Models/Research/ResearchMarketPlayersModel';
import ResearchMarketPlayersValidationModel from '../../Models/Research/ResearchMarketPlayersValidationModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';

export default function UpsertResearchMarketPlayers({ OnDoneUpsertAction, UpsertPressed, EditModel, setIsUpserted }) {
    const [IsLoading, setIsLoading] = useState(false);
    const [Model, setModel] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);

    const validation = new ResearchMarketPlayersValidationModel();
    let upsertAbortController = new AbortController();

    useEffect(() => {
        setModel(new ResearchMarketPlayersModel(EditModel));
        setIsUpserted(true);
    }, [EditModel])

    useEffect(() => {
        if (!UpsertPressed)
            return;

        upsertModel(upsertAbortController);

        return (() => {
            upsertAbortController.abort();
        })
    }, [UpsertPressed])

    const setFormTextValues = (prop, dataType) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormTextValues(prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    function setError(prop) {
        return FormHandler.SetError(prop, ValidationErrors);
    }

    function upsertModel(upsertAbortController) {
        setIsLoading(true);

        if (Model.Id <= 0) {
            OnDoneUpsertAction(EditModel, { Message: "Please Add Post Details first", Severity: 'error' });
            return;
        }

        let saveModel = Model;
        if (!saveModel) {
            saveModel = new ResearchSEOModel();
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

        ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.ResearchAdmin.UpsertMarketPlayers, upsertAbortController)
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
                            message = { Message: result.Message || `Successfully ${EditModel && EditModel.Id > 0 ? 'updated' : 'added'} Market Players for reasearch post`, Severity: 'success' };
                        }
                        else
                            message = { Message: result.Message || `Fail to ${EditModel && EditModel.Id > 0 ? 'update' : 'add'} Market Players for reasearch post`, Severity: 'error' };
                    }
                    else
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };

                    setIsLoading(false);
                    OnDoneUpsertAction(successModel || EditModel, message, successModel ? true : false);
                },
                (error) => {
                    setIsLoading(false);
                    console.log(JSON.stringify(error))
                    OnDoneUpsertAction(EditModel, { Message: APIMessages.APIExceptionMessage, Severity: 'error' });
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
                            <FormTextField fieldError={setError('MarketPlayers')} label="Market Players" value={Model.MarketPlayers} onChange={setFormTextValues('MarketPlayers')} multiline={true} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('Segments')} label="Segments" value={Model.Segments} onChange={setFormTextValues('Segments')} multiline={true} />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}