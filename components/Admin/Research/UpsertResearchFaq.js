import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Grid, Button, Box } from '@mui/material';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages, ValidationMessages } from '../../Common/Constants';
import ResearchFAQModel from '../../Models/Research/ResearchFAQModel';
import ResearchFAQValidationModel from '../../Models/Research/ResearchFAQValidationModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';
import Loader from '../../Common/Loader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';

export default function UpsertResearchFaq({ OnDoneUpsertAction, UpsertPressed, EditModel, setIsUpserted, setToast }) {
    const [IsLoading, setIsLoading] = useState(false);
    const [Model, setModel] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [editFaqIndex, setEditFaqIndex] = useState(-1);

    const infoName = "Faq, Ratings";

    const validation = new ResearchFAQValidationModel();
    let upsertAbortController = new AbortController();
    let fetchInfoAbortController = new AbortController();

    useEffect(() => {
        setModel(new ResearchFAQModel(EditModel));
        setIsUpserted(true);
        fetchInfo();

        return (() => {
            fetchInfoAbortController.abort();
        })
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

    function fetchInfo() {
        if (!EditModel || EditModel.Id === 0) {
            return;
        }

        setIsLoading(true);

        let model = new Object();
        model.Id = EditModel.Id;
        model.InfoType = infoName;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.ResearchInfo.GetInfoById, fetchInfoAbortController)
            .then(
                (result) => {
                    setIsLoading(false);

                    if (fetchInfoAbortController.signal.aborted) {
                        return;
                    }

                    let model = new ResearchFAQModel(EditModel);

                    if (result && result.IsSuccess && result.Data) {
                        model.Faqs = result.Data.Faq ? JSON.parse(result.Data.Faq) : [];
                        model.Ratings = result.Data.Ratings;
                    }

                    setModel(model);
                },
                (error) => {
                    console.log(error);
                    setMessage({ Message: "Error occurred to find research. Please contact IT team", Severity: 'error' });
                }
            )
    }

    const setFormTextValues = (prop, dataType) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormTextValues(prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
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
            saveModel = new ResearchFAQModel();
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

        saveModel.Faq = JSON.stringify(saveModel.Faqs);
        saveModel.Faqs = null;

        ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.ResearchAdmin.UpsertFaq, upsertAbortController)
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
                            message = { Message: result.Message || `Successfully ${Model && Model.Id > 0 ? 'updated' : 'added'} FAQ for reasearch post`, Severity: 'success' };
                        }
                        else {
                            if (result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                                message = { Message: result.Data.Errors[0].ErrorMessage, Severity: 'error' };
                            }
                            else {
                                message = { Message: result.Message || `Fail to ${Model && Model.Id > 0 ? 'update' : 'add'} FAQ for reasearch post`, Severity: 'error' };
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

    function AddFaq() {
        if (!Model.Question || !Model.Answer) {
            return;
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

        let modelFaq = Model.Faqs;

        if (modelFaq && editFaqIndex >= 0) {
            modelFaq[editFaqIndex].Question = Model.Question;
            modelFaq[editFaqIndex].Answer = Model.Answer;
        }
        else {
            let faq = {
                Index: 0,
                Question: Model.Question,
                Answer: Model.Answer
            }

            if (!modelFaq) {
                modelFaq = [];
            }

            modelFaq.push(faq);
        }

        modelFaq.forEach((f, index) => {
            f.Index = index
        });

        setEditFaqIndex(-1);
        setModel({ ...Model, ['Question']: '', ['Answer']: '', ['Faqs']: modelFaq });
    }

    function EditFaq(faq) {
        setEditFaqIndex(faq.Index);
        setModel({ ...Model, ['Question']: faq.Question, ['Answer']: faq.Answer });
    }

    function DeleteFaq(faq) {
        setEditFaqIndex(-1);
        let faqModels = Model.Faqs.filter(f => f.Index !== faq.Index);
        setModel({ ...Model, ['Question']: '', ['Answer']: '', ['Faqs']: faqModels });
    }

    function CancelFaq() {
        setEditFaqIndex(-1);
        setModel({ ...Model, ['Question']: '', ['Answer']: '' });
    }

    function showFaqs() {
        if (!Model || !Model.Faqs || Model.Faqs.length === 0)
            return null;

        return (
            <CardContent>
                {
                    Model.Faqs.map((f, index) => {
                        return (
                            <Box key={index} sx={{ p: 1, borderBottom: '2px solid #ccc', backgroundColor: editFaqIndex === f.Index ? 'yellow' : 'white' }} >
                                <Grid container spacing={1}>
                                    <Grid item xs={12} lg={5} sx={{ borderBottom: { xs: '1px solid #ccc', md: 'none' } }}>{f.Question}</Grid>
                                    <Grid item xs={12} lg={5}>{f.Answer}</Grid>

                                    {
                                        editFaqIndex === f.Index
                                            ? <Grid item xs={12} lg={1}><Button size="small" variant='contained' color="info" onClick={CancelFaq} startIcon={<CancelIcon />}>Cancel</Button></Grid>
                                            : <Grid item xs={12} lg={1}><Button size="small" variant='contained' color="info" onClick={() => EditFaq(f)} startIcon={<EditIcon />}>Edit</Button></Grid>
                                    }

                                    <Grid item xs={12} lg={1}><Button size="small" variant='contained' color="warning" onClick={() => DeleteFaq(f)} startIcon={<DeleteForeverIcon />}>Delete</Button></Grid>
                                </Grid>
                            </Box>
                        )
                    })
                }
            </CardContent>
        )
    }

    if (IsLoading || !Model) {
        return <Loader />
    }

    return (
        <Card raised={true}>
            <CardContent>
                <Grid container spacing={1} rowSpacing={3}>
                    <Grid item xs={3}>
                        <FormControl fullWidth >
                            <FormTextField type="number" fieldError={setError('Ratings')} label="Ratings" value={Model.Ratings ? parseFloat(Model.Ratings) : 0} onKeyPress={KeyPress} onChange={setFormTextValues('Ratings', 'float')} />
                        </FormControl>
                    </Grid>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={12} lg={4.5}>
                            <FormControl fullWidth >
                                <FormTextField autoComplete="off" fieldError={setError('Question')} label="Question" value={Model.Question} onKeyPress={KeyPress} onChange={setFormTextValues('Question')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth >
                                <FormTextField autoComplete="off" multiline fieldError={setError('Answer')} label="Answer" value={Model.Answer} onChange={setFormTextValues('Answer')} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={1.5}>
                            <FormControl fullWidth >
                                <Button size="large" variant='contained' color="success" onClick={AddFaq} startIcon={<AddCircleIcon />}>{editFaqIndex > -1 ? 'Update' : 'Add'}</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            {showFaqs()}
        </Card>
    )
}