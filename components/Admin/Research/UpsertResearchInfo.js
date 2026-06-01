import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Switch, Grid, FormControlLabel, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import DatePicker from '@mui/lab/DatePicker';
import CurrencyInput from '../../Common/Inputs/CurrencyInput';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages, ValidationMessages } from '../../Common/Constants';
import { Loader } from '../../Common/Commons';
import { CategoryService } from '../../Services/CategoryService';
import ResearchDetailsValidationModel from '../../Models/Research/ResearchDetailsValidationModel';
import ResearchDetailsModel from '../../Models/Research/ResearchDetailsModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';

export default function UpsertResearchInfo({ OnDoneUpsertAction, UpsertPressed, EditModel, setIsUpserted }) {
    const router = useRouter();
    const [IsLoading, setIsLoading] = useState(false);
    const [Categories, setCategories] = useState(null);
    const [Model, setModel] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);

    const validation = new ResearchDetailsValidationModel();
    let upsertAbortController = new AbortController();

    useEffect(() => {
        setIsUpserted(true);
        let catetoryAbortController = new AbortController();
        fetchRelatedData(catetoryAbortController);

        return (() => {
            catetoryAbortController.abort();
        })
    }, [])

    useEffect(() => {
        setModel(EditModel || new ResearchDetailsModel());
    }, [EditModel])

    useEffect(() => {
        if (!UpsertPressed)
            return;

        upsertModel(upsertAbortController);

        return (() => {
            upsertAbortController.abort();
        })
    }, [UpsertPressed])

    function fetchRelatedData(catetoryAbortController) {
        fetchCategories(catetoryAbortController);
    }

    function fetchCategories(abortController) {
        CategoryService.FetchCategories(abortController)
            .then(
                (data) => {
                    if (abortController.signal.aborted) {
                        return;
                    }
                    setCategories(data);
                },
                (error) => {
                    setCategories(null);
                })
    }

    const setFormTextValues = (prop, dataType) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormTextValues(prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    const setFormCheckValues = (prop) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormCheckValues(prop, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    const setFormDateValues = (prop) => (newDate) => {
        setIsUpserted(false);
        FormHandler.setFormDateValues(prop, newDate, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
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

        let saveModel = new ResearchDetailsModel(Model);

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

        ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.ResearchAdmin.UpsertDetails, upsertAbortController)
            .then(
                (result) => {
                    if (upsertAbortController.signal.aborted) {
                        setIsLoading(false);
                        setIsUpserted(false);
                        OnDoneUpsertAction(EditModel, null, true);
                        return;
                    }

                    let successModel = null;
                    let message;

                    if (result) {
                        if (result.IsSuccess) {
                            if (result.Data) {
                                setIsUpserted(true);
                                successModel = result.Data;
                                message = { Message: result.Message || `Successfully ${Model && Model.Id > 0 ? 'updated' : 'added'} reasearch post`, Severity: 'success' };

                                if (!EditModel || !EditModel.Id || EditModel.Id === 0) {
                                    OnDoneUpsertAction(successModel, message, successModel ? true : false);
                                    setTimeout(() => {
                                        router.push(`/Admin/Research/ResearchUpsert/${successModel.Id}`);
                                    }, 2000);
                                    return;
                                }
                            }
                        }
                        else {
                            setIsUpserted(false);
                            if (result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                                setValidationErrors(result.Data.Errors);
                                message = { Message: result.Message || `Fail to ${Model && Model.Id > 0 ? 'update' : 'add'} reasearch post`, Severity: 'error' };
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
                    OnDoneUpsertAction(successModel || EditModel, message, successModel ? true : false);
                },
                (error) => {
                    setIsUpserted(false);
                    setIsLoading(false);
                    console.log(JSON.stringify(error))
                    OnDoneUpsertAction(null, { Message: JSON.stringify(error), Severity: 'error' });
                }
            )
    }

    if (IsLoading || !Model) {
        return (
            <Loader />
        )
    }

    return (
        <Card raised={true}>
            <CardContent>
                <Grid container spacing={1} rowSpacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('Name')} label="Title" value={Model.Name} onKeyPress={KeyPress} onChange={setFormTextValues('Name')} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError('Code')} label="Code" value={Model.Code} onKeyPress={KeyPress} onChange={setFormTextValues('Code')} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <FormControl fullWidth >
                            <FormTextField id="Categories" select label="Category" value={Categories ? Model.CategoryId : ''} onChange={setFormTextValues('CategoryId')} onKeyPress={KeyPress} fieldError={setError('CategoryId')}>
                                {
                                    Categories
                                        ? Categories.map((cat) => (
                                            <MenuItem key={cat.Id} value={cat.Id}>
                                                {cat.Name}
                                            </MenuItem>
                                        ))
                                        : <MenuItem key={0} value={0}>
                                            Loading...
                                        </MenuItem>
                                }
                            </FormTextField>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <FormControl fullWidth >
                            <DatePicker showTodayButton={true} clearable={true} disableMaskedInput={true}
                                openTo="day" views={['year', 'month', 'day']} inputFormat="dd-MMM-yyyy"
                                label="Publish Date" value={Model.PostPublishDate} onChange={setFormDateValues('PostPublishDate')}
                                showDaysOutsideCurrentMonth={true} showToolbar={true}
                                renderInput={(params) =>
                                    <FormTextField {...params} fieldError={setError('PostPublishDate')} />
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <FormControl fullWidth >
                            <FormTextField type="number" fieldError={setError('NumberOfPages')} label="Number of Pages" value={Model.NumberOfPages ? parseInt(Model.NumberOfPages) : 0} onKeyPress={KeyPress} onChange={setFormTextValues('NumberOfPages', 'int')} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                            <FormTextField name="PriceSingleUser" fieldError={setError('PriceSingleUser')} label="Single User Price" value={Model.PriceSingleUser} onKeyPress={KeyPress} onChange={setFormTextValues('PriceSingleUser')}
                                InputProps={{ inputComponent: CurrencyInput }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                            <FormTextField name="PriceMultiUser" fieldError={setError('PriceMultiUser')} label="Multi User Price" value={Model.PriceMultiUser} onKeyPress={KeyPress} onChange={setFormTextValues('PriceMultiUser')}
                                InputProps={{ inputComponent: CurrencyInput }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                            <FormTextField name="PriceEnterprise" fieldError={setError('PriceEnterprise')} label="Price enterprise license" value={Model.PriceEnterprise} onKeyPress={KeyPress} onChange={setFormTextValues('PriceEnterprise')}
                                InputProps={{ inputComponent: CurrencyInput }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                        <FormControl fullWidth >
                            <FormControlLabel control={<Switch checked={Model.IsActive ? Model.IsActive : false} onChange={setFormCheckValues('IsActive')} color="warning" />} label="Is Active" />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}