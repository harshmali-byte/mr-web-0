import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, createFilterOptions, Typography, Button, FormControlLabel, Link, FormControl, Checkbox, TextField, InputAdornment, Grid } from '@mui/material';
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import { ApiHandler } from '../../Api/ApiHandler';
import GeoLocation from '../../Services/GeoLocation';
import { Toast, Loader, CountryFlag, LocalStorage } from '../../Common/Commons';
import { ValidationMessages, RequestTypes, SessionStorageKeys, LocalStorageKeys } from '../../Common/Constants';
import { CountryList } from '../../Services/CountryList';
import QuickGuideModel from '../../Models/Service/Quick/QuickGuideModel';
import QuickGuideQueryModel from '../../Models/Service/Quick/QuickGuideQueryModel';
import QuickGuideValidationModel from '../../Models/Service/Quick/QuickGuideValidationModel';
import CaptchaModel from '../../Models/Captcha/CaptchaModel';
import { SessionStorage } from '../../Common/SessionStorage';
import CaptchaValidationModel from '../../Models/Captcha/CaptchaValidationModel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ServiceQuickRequestForm({ requestType, onCloseModal }) {
    const router = useRouter();
    const [ToastMessage, setToastMessage] = useState(null);
    const [Location, setLocation] = useState();
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);
    const [IsLoading, setLoading] = useState(false);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [RequestFormType, setRequestFormType] = useState(null);
    const [Model, setModel] = useState(new QuickGuideQueryModel());
    const [TnCAccepted, setTnCAccepted] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    const [ContactCountry, setContactCountry] = useState(null);

    const [IsCaptchaLoading, setIsCaptchaLoading] = useState(true);

    const validation = new QuickGuideValidationModel();
    const captchaValidation = CaptchaValidationModel();

    let countriesAbortController = new AbortController();
    let captchaAbortController = new AbortController();

    useEffect(() => {
        let requestFormType = RequestTypes.find(f => f.name.toLowerCase() === requestType.toLowerCase());
        setRequestFormType(requestFormType);
        setLoadingIpAddress(true);
        GeoLocation(SetLocationModel);
        FetchCountries();
        GetCaptcha();
        return (() => {
            countriesAbortController.abort();
        })
    }, [])

    useEffect(() => {
        if (!Location || !Location.CountryCode || !Countries || !Model || !Model.Request || Model.Request.CountryId) {
            return;
        }

        let country = Countries.find(c => c.Code === Location.CountryCode);
        if (!country) {
            return;
        }

        let model = Model;
        model.Request.CountryId = country.Id;

        setModel(model);
        setContactCountry(country);
    }, [Location])

    function SetLocationModel(locationModel) {
        setLocation(locationModel);
        setLoadingIpAddress(false);
    }

    function ValidateForm(prop, value) {
        if (!Model || !Model.Request) {
            return;
        }

        let validationRule = validation[prop];

        if (!validationRule) {
            return;
        }

        let validationError = validationRule.Validate(value, Model.Request);
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
            saveModel = new QuickGuideQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new QuickGuideModel();
        }

        if (!saveModel.Captcha) {
            saveModel.Captcha = new CaptchaModel();
        }

        saveModel.Request.QueryRequestType = parseInt(RequestFormType.popupId);
        saveModel.Request.Domain = window.location.origin;
        saveModel.RequestSource = ['default', 'Popup'];
        setLoading(true);

        let validateErrors = [];
        for (const item in validation) {
            let validateError = validation[item].Validate(saveModel.Request[item], saveModel.Request);
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
            let validateError = captchaValidation[item].Validate(saveModel.Captcha[item]);
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
            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.ContactUs.ContactUsRequest)
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

                            if (!localData) {
                                localData = [];
                            }

                            if (localData.findIndex(i => i.reportId === 'MA') === -1) {
                                localData.push({ reportId: 'MA', requestType: requestType });
                            }

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

    const setRequestCountryValues = (prop) => (event, country) => {
        ValidateForm(prop, country ? country.Id : 0);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: country ? country.Id : 0 } });
        setContactCountry(country ? country : null);
    };

    const countryFilterOptions = createFilterOptions({
        stringify: (option) => option.Name + option.ISDCode + option.Code,
    });

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

    function FetchCountries(isApiFetch) {
        setIsCountriesLoading(true);
        countriesAbortController = new AbortController();
        CountryList.Fetch(countriesAbortController, isApiFetch)
            .then(
                (data) => {
                    if (countriesAbortController.signal.aborted) {
                        setIsCountriesLoading(false);
                        return;
                    }

                    setCountries(data);
                    setIsCountriesLoading(false);
                },
                (error) => {
                    setCountries([]);
                    setIsCountriesLoading(false);
                });
    }

    function GetCaptcha() {
        setIsCaptchaLoading(true);
        setModel({ ...Model, Captcha: new CaptchaModel() });
        try {
            ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.Captcha.Get, null, captchaAbortController)
                .then(
                    (result) => {
                        if (captchaAbortController.signal.aborted) {
                            setIsCaptchaLoading(false);
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

    function buildCountriesComponent() {
        if (!IsCountriesLoading && (!Countries || Countries.length === 0)) {
            return <Button size="small" variant='outlined' color="warning" onClick={() => FetchCountries(true)}>Reload Countries</Button>
        }

        return (
            <Autocomplete
                fullWidth
                loading={IsCountriesLoading}
                options={Countries}
                autoHighlight
                value={ContactCountry}
                onChange={setRequestCountryValues('CountryId')}
                noOptionsText="Invalid Country"
                getOptionLabel={option => option && option.Name ? option.Name : ''}
                filterOptions={countryFilterOptions}
                renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                        <CountryFlag countryCode={option.Code} countryName={option.Name} />
                        <Typography variant="body1" component="span" sx={{ ml: 1 }}>{option.Name} ({option.Code}) {option.ISDCode}</Typography>
                    </Box>
                )}

                groupBy={option => option.firstLetter}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="body1" component="span" sx={{ mr: 1 }}>Country*</Typography>
                                {
                                    ContactCountry ? <CountryFlag countryCode={ContactCountry.Code} countryName={ContactCountry.Name} flagWidth={25} /> : null
                                }
                            </Box>
                        }

                        error={setError('CountryId').IsError} helperText={setError('CountryId').ErrorMessage}
                        variant="standard"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        )
    }

    if (showConfirmation) {
        router.push(`/Thankyou/${requestType}/popup`);
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

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField variant="standard" type='email' label="Business Email*" value={Model.Request.Email} onKeyPress={KeyPress} onChange={setRequestTextValues('Email')}
                            error={setError('Email').IsError} helperText={setError('Email').ErrorMessage} />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>{buildCountriesComponent()}</FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField variant="standard" type='number' label="Contact Number*" value={Model.Request.ContactNo} onKeyPress={KeyPress}
                            onChange={setRequestTextValues('ContactNo')}
                            error={setError('ContactNo').IsError} helperText={setError('ContactNo').ErrorMessage}
                            InputProps={{
                                startAdornment: (
                                    ContactCountry
                                        ? <InputAdornment position="start">
                                            {ContactCountry.ISDCode}
                                        </InputAdornment>
                                        : null
                                ),
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth >
                        <TextField variant="standard" label="Answer*" value={Model.Captcha.Answer}
                            type="number" onKeyPress={KeyPress} onChange={setCaptchaTextValues('Answer')}
                            error={setError('Captcha').IsError} helperText={setError('Captcha').ErrorMessage}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {
                                            IsCaptchaLoading
                                                ? <Loader rounded={true} roundedSize={20} />
                                                : Model.Captcha.Captcha
                                                    ? <><Image src={Model.Captcha.Captcha} alt='Solve Puzzle' loading="lazy" width={100} height={50} />=</>
                                                    : <Button size="small" variant='outlined' color="warning" onClick={() => GetCaptcha()}>Reload Puzzle</Button>
                                        }
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl sx={{ mt: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={TnCAccepted} onChange={(e) => setTnCAccepted(e.target.checked)} />
                            }
                            label={
                                <Grid container spacing={1} sx={{ display: 'flex' }}>
                                    <Grid item><Typography>Accept</Typography></Grid>
                                    <Grid item><Link href="/TnC" target="_blank">{`T&C`}</Link></Grid>
                                </Grid>
                            } />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, display: 'flex', alignItems: { xs: 'inherit', md: 'center' }, justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' } }}>
                    {
                        LoadingIpAddress || !RequestFormType
                            ? <LoadingButton loading={LoadingIpAddress} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Loading</Typography></LoadingButton>
                            : IsLoading ?
                                <LoadingButton loading={IsLoading} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >{RequestFormType.submitButtonName}</Typography></LoadingButton>
                                : <Button size="large" variant='contained' color="success" onClick={SaveRequest}>{RequestFormType.submitButtonName}</Button>

                    }
                    <Button onClick={() => onCloseModal(false)} variant="contained" color="secondary" size='large' startIcon={<HighlightOffIcon />} sx={{ m: { xs: 1, md: 0 } }}>{`I'm not interested`}</Button>
                </Grid>
            </Grid>
        </form>
    )
}