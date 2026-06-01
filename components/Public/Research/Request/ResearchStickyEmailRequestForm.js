import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, InputAdornment, Grid, FormControlLabel, Button, Checkbox, Typography, FormControl, TextField, Link } from '@mui/material';
import { Toast, Loader, LocalStorage } from '../../../Common/Commons';
import { ValidationMessages, RequestTypes, SessionStorageKeys, LocalStorageKeys } from '../../../Common/Constants';
import { SessionStorage } from '../../../Common/SessionStorage';
import GeoLocation from '../../../Services/GeoLocation';
import StickyEmailRequestValidationModel from '../../../Models/Request/Sticky/StickyEmail/StickyEmailRequestValidationModel';
import StickyEmailRequestModel from '../../../Models/Request/Sticky/StickyEmail/StickyEmailRequestModel';
import StickyEmailRequestQueryModel from '../../../Models/Request/Sticky/StickyEmail/StickyEmailRequestQueryModel';
import CaptchaModel from '../../../Models/Captcha/CaptchaModel';
import { ApiHandler } from '../../../Api/ApiHandler';
import { useRouter } from 'next/router';
import CaptchaValidationModel from '../../../Models/Captcha/CaptchaValidationModel';
import DownloadIcon from '@mui/icons-material/Download';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useTheme } from '@mui/material/styles';

export default function ResearchStickyEmailRequestForm({ research, requestType }) {
    const theme = useTheme();
    const router = useRouter();

    const [IsLoading, setLoading] = useState(false);
    const [Model, setModel] = useState(new StickyEmailRequestQueryModel());
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ToastMessage, setToastMessage] = useState(null);
    const [Location, setLocation] = useState();
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsCaptchaLoading, setIsCaptchaLoading] = useState(true);
    const [TnCAccepted, setTnCAccepted] = useState(true);
    const [RequestFormType, setRequestFormType] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const validation = new StickyEmailRequestValidationModel();
    const captchaValidation = new CaptchaValidationModel();

    let captchaAbortController = new AbortController();

    useEffect(() => {
        GetCaptcha();
        setLoadingIpAddress(true);
        GeoLocation(SetLocationModel);
    }, [])

    useEffect(() => {
        if (!requestType) {
            return;
        }

        let requestFormType = RequestTypes.find(f => f.name.toLowerCase() === requestType.toLowerCase());
        if (!requestFormType) {
            console.error('request Form Type is null');
            // navigate user to common error page
            return;
        }

        setRequestFormType(requestFormType);
    }, [requestType])

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

    const KeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            SaveRequest();
        }
    }

    function SetLocationModel(locationModel) {
        setLocation(locationModel);
        setLoadingIpAddress(false);
    }

    function GetCaptcha() {
        setIsCaptchaLoading(true);
        setModel({ ...Model, Captcha: new CaptchaModel() });
        try {
            ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.Captcha.Get, null, captchaAbortController)
                .then(
                    (result) => {
                        if (captchaAbortController.signal.aborted) {
                            return;
                        }

                        if (result && result.IsSuccess && result.Data) {
                            setModel({ ...Model, Captcha: new CaptchaModel(result.Data) });
                        }
                        else {
                            setModel({ ...Model, Captcha: new CaptchaModel() });
                        }

                        setIsCaptchaLoading(false);
                    },
                    (error) => {
                        setIsCaptchaLoading(false);
                        console.error(error);
                    }
                )
        }
        catch (err) {
            setIsCaptchaLoading(false);
            console.error(err);
        }
    }

    const setRequestTextValues = (prop) => (event) => {
        ValidateForm(prop, event.target.value);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: event.target.value } });
    };

    const setCaptchaTextValues = (prop) => (event) => {
        ValidateForm(prop, event.target.value);
        setModel({ ...Model, Captcha: { ...Model.Captcha, [prop]: event.target.value } });
    };

    function ValidateForm(prop, value) {
        if (!Model || !Model.Request) {
            return;
        }

        let validationRule = validation[prop];

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

    function SaveRequest() {
        if (!TnCAccepted) {
            setToastMessage({ Message: ValidationMessages.TnCNotAccepted, Severity: 'error' });
            return;
        }

        let saveModel = Model;
        if (!saveModel) {
            saveModel = new StickyEmailRequestQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new StickyEmailRequestModel();
        }

        if (!saveModel.Captcha) {
            saveModel.Captcha = new CaptchaModel();
        }

        saveModel.Request.ReportId = parseInt(research.Id);
        saveModel.Request.QueryRequestType = parseInt(RequestFormType.stickyEmailId);
        saveModel.Request.Domain = window.location.origin;
        saveModel.RequestSource = ['StickyEmail'];
        setLoading(true);

        let validateErrors = [];
        for (const item in validation) {
            let validateError = validation[item].Validate(saveModel.Request[item]);
            if (validateError && !validateError.IsValid) {
                validateErrors.push(validateError);
            }
        }
        setValidationErrors(validateErrors);

        if (validateErrors && validateErrors.length > 0) {
            setToastMessage({ Message: ValidationMessages.ValidationFailed, Severity: 'error' });
            setLoading(false);
            return;
        }

        for (const item in captchaValidation) {
            let validationItem = captchaValidation[item];
            let validateError = validationItem.Validate(saveModel.Captcha[item]);
            if (validateError) {
                validateErrors.push(validateError);
            }
        }

        setValidationErrors(validateErrors);

        if (validateErrors && validateErrors.length > 0) {
            setToastMessage({ Message: ValidationMessages.ValidationCaptchaFailed, Severity: 'error' });
            setLoading(false);
            return;
        }

        setValidationErrors([]);
        setIsCaptchaLoading(true);
        setModel({ ...Model, Captcha: new CaptchaModel() });

        try {
            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.Request.ResearchRequest)
                .then(
                    (result) => {
                        if (!result) {
                            setToastMessage({ Message: "Request failed. Please try again", Severity: 'error' });
                            setLoading(false);
                            setIsCaptchaLoading(false);
                            return;
                        }

                        if (result.IsSuccess) {
                            let localDataJson = LocalStorage.GetData(LocalStorageKeys.RequestFormFilled);
                            let localData = [];
                            if (localDataJson) {
                                localData = JSON.parse(localDataJson);
                            }

                            localData.push({ reportId: parseInt(research.Id), requestType: requestType });
                            LocalStorage.SetData(LocalStorageKeys.RequestFormFilled, JSON.stringify(localData));
                            SessionStorage.SetData(SessionStorageKeys.Request, JSON.stringify(result.Data.Request));
                            setShowConfirmation(true);
                            setToastMessage({ Message: result.Message ? result.Message : "Request Successful", Severity: 'success' });
                            setLoading(false);
                            setIsCaptchaLoading(false);
                            return;
                        }

                        if (result.ValidationErrors) {
                            setValidationErrors(result.ValidationErrors);
                        }

                        if (result.Data && result.Data.Captcha) {
                            setModel({ ...Model, Captcha: new CaptchaModel(result.Data.Captcha) });
                        }

                        setToastMessage({ Message: result && result.Message ? result.Message : "Request failed", Severity: 'error' });
                        setLoading(false);
                        setIsCaptchaLoading(false);
                        return;

                    },
                    (error) => {
                        setLoading(false);
                        GetCaptcha();
                        console.error(error);
                    }
                )
        }
        catch (err) {
            setLoading(false);
            GetCaptcha();
            console.error(err);
        }
    }

    if (showConfirmation) {
        router.push(`/Thankyou/${requestType}/StickyEmail`);
    }

    if (!research) {
        return null;
    }

    return (
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
            <Grid container sx={{}}>
                <Grid container item spacing={1} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12} lg={5}>
                        <FormControl fullWidth>
                            <TextField variant="outlined" type='email' color="secondary" label="Business Email" value={Model.Request.Email} onKeyPress={KeyPress}
                                onChange={setRequestTextValues('Email')} error={setError('Email').IsError} helperText={setError('Email').ErrorMessage}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.secondary.main },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.contrastText },
                                    '& .MuiInputLabel-root, .MuiFormLabel-root, .Mui-focused': { color: theme.palette.primary.contrastText }
                                }}
                                size="small"
                                inputProps={{ style: { color: theme.palette.primary.contrastText } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon sx={{ color: theme.palette.primary.contrastText }} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <FormControl fullWidth >
                            <TextField variant="standard" label="Answer" value={Model.Captcha.Answer}
                                type="number" onKeyPress={KeyPress} onChange={setCaptchaTextValues('Answer')}
                                error={setError('Captcha').IsError} helperText={setError('Captcha').ErrorMessage}
                                color="secondary" sx={{
                                    '& .MuiInput-underline::before, .MuiInputBase-root.MuiInput-root:hover::before': {
                                        borderColor: theme.palette.secondary.main
                                    },
                                    '& .MuiInputLabel-root, .MuiFormLabel-root, .Mui-focused': {
                                        color: theme.palette.primary.contrastText
                                    },
                                }}
                                size="small"
                                inputProps={{ style: { color: theme.palette.primary.contrastText } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {
                                                IsCaptchaLoading
                                                    ? <Loader rounded={true} roundedSize={20} />
                                                    : Model.Captcha.Captcha
                                                        ? <Box sx={{
                                                            backgroundColor: theme.palette.primary.contrastText,
                                                            color: theme.palette.primary.contrastText,
                                                            m: { xs: 1, sm: 0 },
                                                            display: 'flex', justifyContent: 'flex-start', alignItems: 'center'
                                                        }}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                                                                    position: 'relative',
                                                                    width: { xs: 60, sm: 80, md: 60 }, height: { xs: 25, sm: 25 }
                                                                }}
                                                            >
                                                                <Image src={Model.Captcha.Captcha} alt='Solve Puzzle' loading="lazy" layout='fill' />
                                                            </Box>
                                                            <Typography sx={{ color: theme.palette.primary.main }}>=</Typography>
                                                        </Box>
                                                        : <Button size="small" variant='outlined' color="warning" onClick={() => GetCaptcha()}>Reload Puzzle</Button>
                                            }
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{}}>
                        <Button onClick={SaveRequest} variant="contained" size='small' startIcon={<DownloadIcon sx={{ color: theme.palette.info.main }} />}
                            sx={{
                                m: { xs: 1, md: 0 },
                                bgcolor: theme.palette.primary.contrastText,
                                color: theme.custom.textColor,
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: theme.palette.primary.contrastText,
                                }
                            }}
                        >Get Methodology</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox checked={TnCAccepted} onChange={(e) => setTnCAccepted(e.target.checked)}
                                    sx={{
                                        color: theme.palette.primary.contrastText,
                                        '&.Mui-checked': { color: theme.palette.primary.contrastText }
                                    }}
                                />
                            }
                            label={
                                <Grid container spacing={1}>
                                    <Grid item><Typography>Accept</Typography></Grid>
                                    <Grid item><Link href="/TnC" target="_blank" underline='always' sx={{ color: theme.palette.info.main }}>{`Terms & Conditions`}</Link></Grid>
                                </Grid>
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    )
}