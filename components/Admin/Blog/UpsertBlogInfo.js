import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Switch, Grid, FormControlLabel, Button, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import DatePicker from '@mui/lab/DatePicker';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages, ValidationMessages } from '../../Common/Constants';
import { Loader } from '../../Common/Commons';
import BlogDetailsValidationModel from '../../Models/Blog/BlogDetailsValidationModel';
import BlogDetailsModel from '../../Models/Blog/BlogDetailsModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';
import Image from 'next/image';

export default function UpsertBlogInfo({ OnDoneUpsertAction, UpsertPressed, EditModel, setIsUpserted }) {
    const router = useRouter();
    const [IsLoading, setIsLoading] = useState(false);
    const [Model, setModel] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [headerImage, setHeaderImage] = useState(null);
    const [fetchingImages, setFetchingImages] = useState(false);
    const [existingHeaderImage, setExistingHeaderImage] = useState('');

    const validation = new BlogDetailsValidationModel();
    let upsertAbortController = new AbortController();
    let imagesAbortController = new AbortController();

    useEffect(() => {
        setModel(EditModel || new BlogDetailsModel());
        getBlogImages();
        return (() => {
            imagesAbortController.abort();
        })
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

    const setFormCheckValues = (prop) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormCheckValues(prop, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    const setFormDateValues = (prop) => (newDate) => {
        setIsUpserted(false);
        FormHandler.setFormDateValues(prop, newDate, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    function selectFile(event) {
        setFetchingImages(true);
        let image = event && event.target && event.target.files ? event.target.files[0] : null;
        setHeaderImage(image);
        setExistingHeaderImage(image ? URL.createObjectURL(image) : '');
        setFetchingImages(false);
    }

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

        let saveModel = new BlogDetailsModel(Model);

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
        const formData = new FormData();
        formData.set("formFile", headerImage);

        for (var key of Object.keys(saveModel)) {
            formData.set(key, saveModel[key]);
        }

        ApiHandler.ApiService.Post(formData, ApiHandler.ApiUrls.BlogAdmin.UpsertDetails, upsertAbortController, true)
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
                                message = { Message: result.Message || `Successfully ${Model && Model.Id > 0 ? 'updated' : 'added'} blog`, Severity: 'success' };

                                if (!EditModel || !EditModel.Id || EditModel.Id === 0) {
                                    OnDoneUpsertAction(successModel, message, successModel ? true : false);
                                    setTimeout(() => {
                                        router.push(`/Admin/Blog/BlogUpsert/${successModel.Id}`);
                                    }, 2000);
                                    return;
                                }
                            }
                        }
                        else {
                            setIsUpserted(false);
                            if (result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                                setValidationErrors(result.Data.Errors);
                                message = { Message: result.Message || `Fail to ${Model && Model.Id > 0 ? 'update' : 'add'} blog`, Severity: 'error' };
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

    function getBlogImages() {
        if (!EditModel || !EditModel.Id) {
            return;
        }

        setFetchingImages(true);

        ApiHandler.ApiService.GetDownloadCancellable(ApiHandler.ApiUrls.BlogAdmin.GetImages, EditModel.Id, imagesAbortController)
            .then(
                (result) => {
                    if (imagesAbortController.signal.aborted) {
                        setFetchingImages(false);
                        return;
                    }

                    try {
                        setExistingHeaderImage(URL.createObjectURL(result));
                    }
                    catch {
                        setExistingHeaderImage('');
                    }

                    setFetchingImages(false);
                });
    }

    if (IsLoading || !Model) {
        return (
            <Loader />
        )
    }

    return (
        <Card raised={true}>
            <CardContent>
                <form>
                    <Grid container spacing={3} rowSpacing={3}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth >
                                <FormTextField fieldError={setError('Name')} label="Title" value={Model.Name} onKeyPress={KeyPress} onChange={setFormTextValues('Name')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth >
                                <FormTextField fieldError={setError('ResearchPostKey')} label='Research Post Key' value={Model.ResearchPostKey} onChange={setFormTextValues('ResearchPostKey')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
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

                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth >
                                <FormTextField fieldError={setError('Author')} label="Author" value={Model.Author} onKeyPress={KeyPress} onChange={setFormTextValues('Author')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth >
                                <FormTextField fieldError={setError('Biography')} label='Biography' value={Model.Biography} onChange={setFormTextValues('Biography')} multiline={true} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth >
                                <FormControlLabel control={<Switch checked={Model.IsActive ? Model.IsActive : false} onChange={setFormCheckValues('IsActive')} color="warning" />} label="Is Active" />
                            </FormControl>
                        </Grid>
                        <Grid item container xs={12} md={10}>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth >
                                    <label htmlFor="btn-upload">
                                        <input
                                            id="btn-upload"
                                            name="btn-upload"
                                            style={{ display: 'none' }}
                                            type="file"
                                            accept="image/png"
                                            onChange={selectFile} />
                                        <Button
                                            className="btn-choose"
                                            variant="contained"
                                            component="span" >
                                            Choose File
                                        </Button>
                                    </label>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        fetchingImages && <Loader />
                                    }
                                    {
                                        existingHeaderImage && <Image src={existingHeaderImage} alt='No header image found' loading="lazy" width={150} height={100} />
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}