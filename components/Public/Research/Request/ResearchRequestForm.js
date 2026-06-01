import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Autocomplete, createFilterOptions, InputAdornment, Grid, FormControlLabel, Button, Checkbox, Typography, FormControl, TextField, Link } from '@mui/material';
import { Toast, Loader, CountryFlag, LocalStorage } from '../../../Common/Commons';
import { ValidationMessages, RequestTypes, SessionStorageKeys, LocalStorageKeys } from '../../../Common/Constants';
import { SessionStorage } from '../../../Common/SessionStorage';
import GeoLocation from '../../../Services/GeoLocation';
import QuickRequestValidationModel from '../../../Models/Request/Quick/QuickRequestValidationModel';
import QuickRequestModel from '../../../Models/Request/Quick/QuickRequestModel';
import QuickRequestQueryModel from '../../../Models/Request/Quick/QuickRequestQueryModel';
import CaptchaModel from '../../../Models/Captcha/CaptchaModel';
import { CountryList } from '../../../Services/CountryList';
import { ApiHandler } from '../../../Api/ApiHandler';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CaptchaValidationModel from '../../../Models/Captcha/CaptchaValidationModel';

export default function ResearchRequestForm({ research, requestType, onCloseModal, upsertUrl }) {
    const router = useRouter();

    const [IsLoading, setLoading] = useState(false);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ToastMessage, setToastMessage] = useState(null);
    const [Location, setLocation] = useState();
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);
    const [Model, setModel] = useState(new QuickRequestQueryModel());
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [IsCaptchaLoading, setIsCaptchaLoading] = useState(true);
    const [RequestFormType, setRequestFormType] = useState(null);
    const [TnCAccepted, setTnCAccepted] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    const [ContactCountry, setContactCountry] = useState(null);

    const validation = new QuickRequestValidationModel();
    const captchaValidation = new CaptchaValidationModel();

    const countriesAbortController = new AbortController();
    const captchaAbortController = new AbortController();

    useEffect(() => {
        FetchCountries();
        return (() => {
            countriesAbortController.abort();
        })
    }, [])

    useEffect(() => {
        GetCaptcha();
        return (() => {
            captchaAbortController.abort();
        })
    }, [])

    useEffect(() => {
        setLoadingIpAddress(true);
        GeoLocation(SetLocationModel);
    }, []);

    useEffect(() => {
        if (!requestType) {
            return;
        }

        let requestFormType = RequestTypes.find(f => f.name.toLowerCase() === requestType.toLowerCase());
        if (!requestFormType) {
            // navigate user to common error page
            return;
        }

        setRequestFormType(requestFormType);
    }, [requestType])

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

    function FetchCountries(isApiFetch) {
        setIsCountriesLoading(true);
        CountryList.Fetch(countriesAbortController, isApiFetch)
            .then(
                (data) => {
                    if (countriesAbortController.signal.aborted) {
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
    const setRequestCountryValues = (prop) => (event, country) => {
        ValidateForm(prop, country ? country.Id : 0);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: country ? country.Id : 0 } });
        setContactCountry(country ? country : null);
    };

    const countryFilterOptions = createFilterOptions({
        stringify: (option) => option.Name + option.ISDCode + option.Code,
    });

    function buildCountriesComponent() {
        if (!IsCountriesLoading && (!Countries || Countries.length === 0)) {
            return null;  //<Button size="small" variant='outlined' color="warning" onClick={() => FetchCountries(true)}>Reload Countries</Button>
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
                                <Typography variant="body1" component="span" sx={{ mr: 1 }}>Country</Typography>
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
            saveModel = new QuickRequestQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new QuickRequestModel();
        }

        if (!saveModel.Captcha) {
            saveModel.Captcha = new CaptchaModel();
        }

        saveModel.Request.ReportId = parseInt(research.Id);
        saveModel.Request.QueryRequestType = parseInt(RequestFormType.popupId);
        saveModel.Request.Domain = window.location.origin;
        saveModel.RequestSource = ['Popup'];
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
            ApiHandler.ApiService.Post(saveModel, upsertUrl || ApiHandler.ApiUrls.Request.ResearchRequest)
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField variant="standard" type='email' label="Business Email" value={Model.Request.Email} onKeyPress={KeyPress} onChange={setRequestTextValues('Email')}
                            error={setError('Email').IsError} helperText={setError('Email').ErrorMessage} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>{buildCountriesComponent()}</FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <TextField variant="standard" type='number' label="Contact Number" value={Model.Request.ContactNo} onKeyPress={KeyPress}
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
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth >
                        <TextField variant="standard" label="Answer" value={Model.Captcha.Answer}
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
                <Grid item xs={12} md={8}>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox checked={TnCAccepted} onChange={(e) => setTnCAccepted(e.target.checked)} />
                            }
                            label={
                                <Grid container spacing={1}>
                                    <Grid item><Typography>Accept</Typography></Grid>
                                    <Grid item><Link href="/TnC" target="_blank">{`Terms & Conditions`}</Link></Grid>
                                </Grid>
                            } />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, display: 'flex', alignItems: { xs: 'inherit', md: 'center' }, justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Button onClick={SaveRequest} variant="contained" color="themeColor" size='large' startIcon={<AttachEmailIcon />} sx={{ m: { xs: 1, md: 0 } }} >Inbox me</Button>
                    <Button onClick={() => onCloseModal(false)} variant="contained" color="secondary" size='large' startIcon={<HighlightOffIcon />} sx={{ m: { xs: 1, md: 0 } }}>{`Don't want sample`}</Button>
                </Grid>
            </Grid>
        </form>
    )
}