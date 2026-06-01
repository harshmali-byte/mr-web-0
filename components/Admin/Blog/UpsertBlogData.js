import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, Grid, Divider, Button, Paper, IconButton } from '@mui/material';
import Image from 'next/image';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages, ValidationMessages } from '../../Common/Constants';
import { Loader } from '../../Common/Commons';
import BlogInfoModel from '../../Models/Blog/BlogInfoModel';
import BlogInfoValidationModel from '../../Models/Blog/BlogInfoValidationModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import { FormHandler } from '../../Common/FormHandler';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function UpsertBlogData({ OnDoneUpsertAction, UpsertPressed, EditModel, setIsUpserted, setToast }) {
    const [IsLoading, setIsLoading] = useState(false);
    const [Model, setModel] = useState(null);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsValidForm, setIsValidForm] = useState(false);

    const [fetchingImages, setFetchingImages] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [infoImages, setInfoImages] = useState([]);
    const [imagesPaths, setImagePaths] = useState([]);
    const [enableImageUpload, setEnableImageUpload] = useState(false);

    const infoName = 'Summary';

    const validation = new BlogInfoValidationModel();
    let upsertAbortController = new AbortController();
    let imagesAbortController = new AbortController();
    let imageAbortController = new AbortController();

    useEffect(() => {
        setModel(new BlogInfoModel(EditModel));
        setIsUpserted(true);
        fetchImagesPaths();
    }, [EditModel])

    useEffect(() => {
        if (!UpsertPressed)
            return;

        upsertModel(upsertAbortController);

        return (() => {
            upsertAbortController.abort();
        })
    }, [UpsertPressed])

    useEffect(() => {
        if (!imagesPaths || imagesPaths.length === 0) {
            return;
        }

        for (var i = 0; i < imagesPaths.length; i++) {
            if (imagesPaths[i]) {
                fetchImage(imagesPaths[i]);
            }
        }

    }, [imagesPaths]);

    function fetchImagesPaths() {
        if (!EditModel || !EditModel.Id) {
            return;
        }

        setFetchingImages(true);

        let model = new Object();
        model.Id = EditModel.Id;
        model.InfoType = infoName;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.BlogAdmin.GetImagesPaths, imagesAbortController)
            .then(
                (result) => {
                    if (imagesAbortController.signal.aborted) {
                        return;
                    }

                    try {
                        if (result && result.IsSuccess && result.Data && result.Data.length > 0) {
                            imageAbortController = new AbortController();

                            let images = []
                            for (let i = 0; i < result.Data.length; i++) {
                                let path = result.Data[i];

                                if (path && !imagesPaths.find(f => f === path)) {
                                    images.push(path);
                                }
                            }

                            setImagePaths(images);
                        }
                        else {
                            setFetchingImages(false);
                            setImagePaths([]);
                        }
                    }
                    catch {
                        setImagePaths([]);
                        setFetchingImages(false);
                    }
                });
    }

    function fetchImage(path) {
        if (!path) {
            return;
        }

        let model = new Object();
        model.SearchText = path;

        ApiHandler.ApiService.PostDownloadCancellable(model, ApiHandler.ApiUrls.BlogAdmin.GetImage, imageAbortController)
            .then(
                (result) => {
                    if (imageAbortController.signal.aborted) {
                        return;
                    }

                    try {
                        setInfoImages(exImage => [...exImage, { image: null, imageObject: URL.createObjectURL(result), path: path }]);
                    }
                    catch {
                        setInfoImages(exImage => [...exImage, null]);
                    }
                });
    }

    const setFormTextValues = (prop, dataType) => (event) => {
        setIsUpserted(false);
        FormHandler.setFormTextValues(prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    }

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
            saveModel = new BlogInfoModel();
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

        ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.BlogAdmin.UpsertSummary, upsertAbortController)
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
                            message = { Message: result.Message || `Successfully ${EditModel && EditModel.Id > 0 ? 'updated' : 'added'} Summary for blog`, Severity: 'success' };
                        }
                        else {
                            message = { Message: result.Message || `Fail to ${EditModel && EditModel.Id > 0 ? 'update' : 'add'} Summary for blog`, Severity: 'error' };
                        }
                    }
                    else {
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };
                    }

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

    function uploadImages() {
        if (!infoImages || infoImages.length === 0) {
            return;
        }

        setUploadingImages(true);
        const formData = new FormData();

        for (var i = 0; i < infoImages.length; i++) {
            if (infoImages[i].image) {
                formData.append("formFiles", infoImages[i].image);
            }
        }

        formData.set('Id', EditModel.Id);
        formData.set('InfoType', infoName);

        ApiHandler.ApiService.Post(formData, ApiHandler.ApiUrls.BlogAdmin.UploadImages, null, true)
            .then(
                (result) => {
                    setUploadingImages(false);
                    if (result && result.IsSuccess) {
                        imageAbortController = new AbortController();
                        setToast({ Message: 'Successfully uploaded Images', Severity: 'success' });
                        setEnableImageUpload(false);
                        setInfoImages([]);
                        setImagePaths(result.Data);
                    }
                    else {
                        setToast({ Message: 'Failed to upload images', Severity: 'error' });
                    }
                },
                (error) => {
                    setUploadingImages(false);
                    console.log(JSON.stringify(error))
                    setToast({ Message: JSON.stringify(error), Severity: 'error' });
                }
            )
    }

    function onDeleteImage(img) {
        if (!img || !img.path) {
            let images = infoImages.filter(i => i.imageObject !== img.imageObject);
            setInfoImages(images);
            return;
        }

        setFetchingImages(true);

        let model = new Object();
        model.SearchText = img.path;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.BlogAdmin.DeleteImage)
            .then(
                (result) => {
                    try {
                        if (result && result.IsSuccess) {
                            let images = infoImages.filter(i => i.path !== img.path);
                            setInfoImages(images);
                        }
                        else {
                            setToast({ Message: 'Unable to delete image. Please refresh page and try deleting image again', Severity: 'error' });
                        }
                        setFetchingImages(false);
                    }
                    catch {
                        setToast({ Message: 'Error while deleting image. Please refresh page and try deleting image again', Severity: 'error' });
                        setFetchingImages(false);
                    }
                });
    }

    function selectFile(event) {
        setFetchingImages(true);
        let images = event && event.target && event.target.files ? event.target.files : null;

        if (!images || images.length === 0) {
            setFetchingImages(false);
            return;
        }

        let existingImages = infoImages || [];
        for (var i = 0; i < images.length; i++) {
            existingImages.push({ image: images[i], imageObject: URL.createObjectURL(images[i]), path: null });
        }

        setInfoImages(existingImages);
        setFetchingImages(false);
        setEnableImageUpload(true);
    }

    function showImages() {
        if (fetchingImages) {
            return <Loader />
        }

        if (!infoImages || infoImages.length === 0) {
            return null;
        }

        return (
            <Grid item container xs={12} spacing={1} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                {
                    infoImages.map((img, index) => {
                        return (
                            <Grid item key={index} xs={12} md={1.5} >
                                <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Image src={img.imageObject} alt='Invalid Image' loading="lazy" width={150} height={100} />
                                    <IconButton aria-label="Delete image" color="primary" onClick={() => onDeleteImage(img)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    function showImageLoader() {
        if (uploadingImages) {
            return <Loader />
        }
        if (fetchingImages && infoImages.length !== imagesPaths.length) {
            setFetchingImages(false);
            return <Loader />
        }

        return null;
    }

    if (IsLoading || !Model) {
        return <Loader />
    }

    return (
        <Card raised={true}>
            <CardContent>
                <Grid container spacing={1} rowSpacing={3}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <FormControl>
                                <label htmlFor="btn-upload">
                                    <input id="btn-upload" name="btn-upload" style={{ display: 'none' }}
                                        type="file" accept="image/png" onChange={selectFile} multiple
                                    />
                                    <Button variant="contained" component="span">Choose Files</Button>
                                </label>
                            </FormControl>

                            {
                                enableImageUpload &&
                                <FormControl><Button variant="contained" onClick={uploadImages} sx={{ ml: 1 }}>Upload</Button></FormControl>
                            }

                            {showImageLoader()}
                        </Grid>
                        {showImages()}
                        <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                            <Divider />
                        </Grid>
                        <FormControl fullWidth >
                            <FormTextField fieldError={setError(infoName)} label="Summary" value={Model.Summary} onChange={setFormTextValues(infoName)} multiline={true} />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}