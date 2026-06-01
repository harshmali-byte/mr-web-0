import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, createFilterOptions, Typography, Button, FormControlLabel, Link, Paper, FormControl, Checkbox, TextField, InputAdornment, Grid } from '@mui/material';
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import { ApiHandler } from '../../Api/ApiHandler';
import GeoLocation from '../../Services/GeoLocation';
import { Toast, Loader, CountryFlag } from '../../Common/Commons';
import FormTextField from '../../Common/Inputs/FormTextField';
import { ValidationMessages, RequestTypes, SessionStorageKeys, Interests } from '../../Common/Constants';
import { CountryList } from '../../Services/CountryList';
import { JobTitleList } from '../../Services/JobTitleList';
import RfqModel from '../../Models/Service/RfqModel';
import RfqQueryModel from '../../Models/Service/RfqQueryModel';
import RfqValidationModel from '../../Models/Service/RfqValidationModel';
import CaptchaModel from '../../Models/Captcha/CaptchaModel';
import { SessionStorage } from '../../Common/SessionStorage';
import CaptchaValidationModel from '../../Models/Captcha/CaptchaValidationModel';
import { useTheme } from '@mui/material/styles';

export default function ServiceRequestForm({ requestType, queryPlaceholder }) {
    const router = useRouter();
    const theme = useTheme();
    const [ToastMessage, setToastMessage] = useState(null);
    const [Location, setLocation] = useState();
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);
    const [IsLoading, setLoading] = useState(false);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [RequestFormType, setRequestFormType] = useState(null);
    const [Model, setModel] = useState(new RfqQueryModel());
    const [TnCAccepted, setTnCAccepted] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    const [ContactCountry, setContactCountry] = useState(null);

    const [JobTitles, setJobTitles] = useState([]);
    const [IsJobTitlesLoading, setIsJobTitlesLoading] = useState(true);
    const [JobTitle, setJobTitle] = useState(null);

    const [RfqInterest, setRfqInterest] = useState(null);

    const [IsCaptchaLoading, setIsCaptchaLoading] = useState(true);

    const validation = new RfqValidationModel();
    const captchaValidation = CaptchaValidationModel();

    let countriesAbortController = new AbortController();
    let captchaAbortController = new AbortController();
    let jobTitleAbortController = new AbortController();

    useEffect(() => {
        let requestFormType = RequestTypes.find(f => f.name.toLowerCase() === requestType.toLowerCase());
        setRequestFormType(requestFormType);
        setLoadingIpAddress(true);
        GeoLocation(SetLocationModel);
        FetchCountries();
        FetchJobTitles();
        GetCaptcha();
        return (() => {
            countriesAbortController.abort();
            jobTitleAbortController.abort();
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
            saveModel = new RfqQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new RfqModel();
        }

        if (!saveModel.Captcha) {
            saveModel.Captcha = new CaptchaModel();
        }

        saveModel.Request.QueryRequestType = parseInt(RequestFormType.id);
        saveModel.Request.Domain = window.location.origin;
        saveModel.RequestSource = ['default', 'Form', 'Rfq'];
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

    const setFormJobTitleValues = (prop) => (event, jobTitle) => {
        ValidateForm(prop, jobTitle ? jobTitle.Id : 0);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: jobTitle ? jobTitle.Id : 0 } });
        setJobTitle(jobTitle ? jobTitle : null);
    };

    const setFormRfqInterestValues = (prop) => (event, interest) => {
        ValidateForm(prop, interest ? interest.id : 0);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: interest ? interest.id : 0 } });
        setRfqInterest(interest ? interest : null);
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

    function FetchJobTitles(isApiFetch) {
        setIsJobTitlesLoading(true);
        jobTitleAbortController = new AbortController();
        JobTitleList.Fetch(jobTitleAbortController, isApiFetch)
            .then(
                (data) => {
                    if (jobTitleAbortController.signal.aborted) {
                        setIsJobTitlesLoading(false);
                        return;
                    }

                    setJobTitles(data);
                    setIsJobTitlesLoading(false);
                },
                (error) => {
                    setJobTitles([]);
                    setIsJobTitlesLoading(false);
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

    function buildJobTitleComponent() {
        if (!IsJobTitlesLoading && (!JobTitles || JobTitles.length === 0)) {
            return <Button size="small" variant='outlined' color="warning" onClick={() => FetchJobTitles(true)}>Reload Job Titles</Button>
        }

        return (
            <Autocomplete
                fullWidth
                loading={IsJobTitlesLoading}
                options={JobTitles}
                autoHighlight
                value={JobTitle}
                onChange={setFormJobTitleValues('JobTitleId')}
                noOptionsText="Invalid Job Title"
                getOptionLabel={option => option && option.Name ? option.Name : ''}
                renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                        <Typography variant="body1" component="span">{option.Name}</Typography>
                    </Box>
                )}

                renderInput={(params) => (
                    <FormTextField
                        {...params}
                        label="Job Title*"
                        fieldError={setError('JobTitleId')}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        )
    }

    function buildInterestComponent() {
        return (
            <Autocomplete
                fullWidth
                options={Interests.Rfq}
                autoHighlight
                value={RfqInterest}
                onChange={setFormRfqInterestValues('InterestId')}
                noOptionsText="Invalid Interest"
                getOptionLabel={option => option && option.displayName ? option.displayName : ''}
                renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                        <Typography variant="body1" component="span">{option.displayName}</Typography>
                    </Box>
                )}

                renderInput={(params) => (
                    <FormTextField
                        {...params}
                        label="Interest*"
                        fieldError={setError('InterestId')}
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
        router.push(`/Thankyou/${requestType}`);
    }

    return (
        <Paper id="request-form" elevation={0}>
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
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <TextField variant="standard" label="Full Name*" value={Model.Request.FullName} onKeyPress={KeyPress} onChange={setRequestTextValues('FullName')}
                                error={setError('FullName').IsError} helperText={setError('FullName').ErrorMessage} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <TextField variant="standard" type='email' label="Business Email*" value={Model.Request.Email} onKeyPress={KeyPress} onChange={setRequestTextValues('Email')}
                                error={setError('Email').IsError} helperText={setError('Email').ErrorMessage} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>{buildJobTitleComponent()}</FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <FormTextField fieldError={setError('CompanyName')} label="Company Name*" value={Model.Request.CompanyName} onKeyPress={KeyPress} onChange={setRequestTextValues('CompanyName')}
                                error={setError('CompanyName').IsError} helperText={setError('CompanyName').ErrorMessage} />
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
                        <FormControl fullWidth>{buildInterestComponent()}</FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <TextField variant="outlined" type='text' multiline value={Model.Request.Description} onChange={setRequestTextValues('Description')}
                                error={setError('Description').IsError} helperText={setError('Description').ErrorMessage} rows={4}
                                sx={{ backgroundColor: '#ffffff' }}
                                placeholder={queryPlaceholder || "It would be helpful if you provided as much detail as you can so that we can direct you to the appropriate resource."}
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
                        <FormControl sx={{ mt: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={TnCAccepted} onChange={(e) => setTnCAccepted(e.target.checked)} />
                                }
                                label={
                                    <Grid container spacing={1} sx={{ display: 'flex' }}>
                                        <Grid item><Typography>Accept</Typography></Grid>
                                        <Grid item><Link href="/TnC" target="_blank" sx={{ color: theme.palette.themeColor.main, textDecorationColor: theme.palette.themeColor.main }}>{`Terms & Conditions`}</Link></Grid>
                                    </Grid>
                                } />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        {
                            LoadingIpAddress || !RequestFormType
                                ? <LoadingButton loading={LoadingIpAddress} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Loading</Typography></LoadingButton>
                                : IsLoading ?
                                    <LoadingButton loading={IsLoading} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >{RequestFormType.submitButtonName}</Typography></LoadingButton>
                                    : <Button size="large" variant='contained' color="success" onClick={SaveRequest}>{RequestFormType.submitButtonName}</Button>
                        }
                    </Grid>
                </Grid>
            </form >
        </Paper >
    )
}