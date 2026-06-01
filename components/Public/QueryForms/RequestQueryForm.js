import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, createFilterOptions, Typography, Button, Divider, FormControlLabel, Link, Paper, FormControl, Checkbox, TextField, InputAdornment, Grid, Stepper, Step, StepLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import { ApiHandler } from '../../Api/ApiHandler';
import GeoLocation from '../../Services/GeoLocation';
import { Toast, Loader, CountryFlag } from '../../Common/Commons';
import { ValidationMessages, RequestTypes, SessionStorageKeys } from '../../Common/Constants';
import { CountryList } from '../../Services/CountryList';
import RequestQueryModel from '../../Models/Request/RequestQueryModel';
import RequestValidationModel from '../../Models/Request/RequestValidationModel';
import CaptchaModel from '../../Models/Captcha/CaptchaModel';
import RequestModel from '../../Models/Request/RequestModel';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { SessionStorage } from '../../Common/SessionStorage';
import CaptchaValidationModel from '../../Models/Captcha/CaptchaValidationModel';

const stepperSteps = [
    'Fill Details',
    'Verify Email',
    'Check your inbox for Sample + Methodology'
];

export default function RequestQueryForm({ requestType, postId }) {
    const theme = useTheme();
    const router = useRouter();
    const [ToastMessage, setToastMessage] = useState(null);
    const [Location, setLocation] = useState();
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);
    const [IsLoading, setLoading] = useState(false);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [RequestFormType, setRequestFormType] = useState(null);
    const [Model, setModel] = useState(new RequestQueryModel());
    const [TnCAccepted, setTnCAccepted] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    const [ContactCountry, setContactCountry] = useState(null);

    const [IsCaptchaLoading, setIsCaptchaLoading] = useState(true);

    const validation = new RequestValidationModel();
    const captchaValidation = CaptchaValidationModel();

    let countriesAbortController = new AbortController();
    let captchaAbortController = new AbortController();

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

    useEffect(() => {
        setLoadingIpAddress(true);
        GeoLocation(SetLocationModel);
    }, []);

    useEffect(() => {
        if (!postId || isNaN(postId)) {
            // navigate user to common error page
        }

        FetchCountries();
        GetCaptcha();
        return (() => {
            countriesAbortController.abort();
        })
    }, [postId])

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
            saveModel = new RequestQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new RequestModel();
        }

        if (!saveModel.Captcha) {
            saveModel.Captcha = new CaptchaModel();
        }

        saveModel.Request.ReportId = parseInt(postId);
        saveModel.Request.QueryRequestType = parseInt(RequestFormType.id);
        saveModel.Request.Domain = window.location.origin;
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

    function SetPageTitle() {
        if (!RequestFormType) {
            return null;
        }

        let formTitle = ''
        if (RequestFormType.displayName === 'Sample') {
            formTitle = 'Get Sample Report Now'
        }
        else {
            formTitle = RequestFormType.displayName;
        }

        return (
            <Box sx={{ pt: 1, pb: 1 }} >
                <Typography id="Login-title" variant="h6" component="h2" textAlign='center' sx={{ fontWeight: '600' }}>
                    {formTitle}
                </Typography>
            </Box>
        )
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

    const StepIcon = ({ label, isSelected }) => (
        <span className='step-icon' style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                isSelected
                    ? <CircleIcon color="success" />
                    : <CircleOutlinedIcon color="primary" />
            }
            <div style={{ position: 'absolute', fontSize: 10, color: isSelected ? '#ffffff' : theme.palette.primary.main, fontWeight: 500 }}>{label}</div>
        </span>
    );

    if (showConfirmation) {
        router.push(`/Thankyou/${requestType}`);
    }

    return (
        <Paper id="request-form" sx={{ p: 4, bgcolor: theme.palette.secondary.main }} elevation={1}>
            <Box>
                <Stepper activeStep={1} alternativeLabel>
                    {stepperSteps.map((label, index) => (
                        <Step key={label} >
                            <StepLabel
                                icon={<StepIcon label={index + 1} isSelected={index === 0} />}
                            >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {SetPageTitle()}

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
                        <FormControl fullWidth >
                            <TextField variant="standard" label="Full Name*" value={Model.Request.FullName} onKeyPress={KeyPress} onChange={setRequestTextValues('FullName')}
                                error={setError('FullName').IsError} helperText={setError('FullName').ErrorMessage} />
                        </FormControl>
                    </Grid>
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
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <TextField variant="outlined" type='text' multiline value={Model.Request.Description} onChange={setRequestTextValues('Description')}
                                error={setError('Description').IsError} helperText={setError('Description').ErrorMessage} rows={4}
                                sx={{ backgroundColor: '#ffffff' }}
                                placeholder="Are you interested in deep-dive studies or incorporating additional countries/segments into existing Market research Reports? We would be happy to customize the Global Market Research Report for you."
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            LoadingIpAddress || !RequestFormType
                                ? <LoadingButton loading={LoadingIpAddress} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Loading</Typography></LoadingButton>
                                : IsLoading ?
                                    <LoadingButton loading={IsLoading} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >{RequestFormType.submitButtonName}</Typography></LoadingButton>
                                    : <Button size="large" variant='contained' color="success" onClick={SaveRequest}>{RequestFormType.submitButtonName}</Button>
                        }
                    </Grid>
                </Grid>
            </form>

            <Box xs={12} sx={{ textAlign: 'center' }}>
                <Divider sx={{ mb: 1, mt: 1 }} />
                <Typography variant='caption' component='span' color="grey.500" sx={{ display: 'flex' }}>
                    Note: For delivery of sample pages you must have a Domain Specific EmailID, normally your business email address complies. Generic Email IDs such as AOL, Hotmail, Yahoo, Gmail, MSNetc are not accepted
                </Typography>
            </Box>
        </Paper>
    )
}