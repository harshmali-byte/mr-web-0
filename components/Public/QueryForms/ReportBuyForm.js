import React, { useState, useEffect } from 'react';
import {
    MenuItem, Autocomplete, Box, createFilterOptions, Typography, Button, Divider, FormControlLabel, Link,
    Paper, FormControl, Checkbox, TextField, InputAdornment, Grid, RadioGroup, Radio, Tooltip,
    ClickAwayListener, Modal, Card, CardContent, CardActions, CardHeader
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import { ApiHandler } from '../../Api/ApiHandler';
import GeoLocation from '../../Services/GeoLocation';
import { Toast, Loader, CountryFlag } from '../../Common/Commons';
import { Prices, ValidationMessages, PaymentTypes, SessionStorageKeys } from '../../Common/Constants';
import { CountryList } from '../../Services/CountryList';
import { JobTitleList } from '../../Services/JobTitleList';
import BuyQueryModel from '../../Models/Buy/BuyQueryModel';
import CaptchaModel from '../../Models/Captcha/CaptchaModel';
import RequestModel from '../../Models/Request/RequestModel';
import FormTextField from '../../Common/Inputs/FormTextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BuyValidationModel from '../../Models/Buy/BuyValidationModel';
import CaptchaValidationModel from '../../Models/Captcha/CaptchaValidationModel';
import ValidationErrorModel from '../../Models/Validation/ValidationErrorModel';
import { useRouter } from 'next/router';
import BuyPayment from '../Payments/BuyPayment';
import BuyHeader from './BuyHeader';
import { SessionStorage } from '../../Common/SessionStorage';

export default function ReportBuyForm({ postId, research, purchasePlan }) {
    const theme = useTheme();
    const router = useRouter();
    const [ToastMessage, setToastMessage] = useState(null);
    const [Location, setLocation] = useState();
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);
    const [IsLoading, setLoading] = useState(false);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [Model, setModel] = useState(new BuyQueryModel({ 'PurchasePlan': purchasePlan }));
    const [ConfirmationModel, setConfirmationModel] = useState(null);
    const [TnCAccepted, setTnCAccepted] = useState(true);
    const [purchasePlanTooltip, setPurchasePlanTooltip] = useState('');
    const [postPriceOriginal, setPostPriceOriginal] = useState(parseInt(Model.Request.ReportPrice || research.PriceSingleUser || Prices.SingleUser || 0));

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    const [ContactCountry, setContactCountry] = useState(null);

    const [JobTitles, setJobTitles] = useState([]);
    const [IsJobTitlesLoading, setIsJobTitlesLoading] = useState(true);
    const [JobTitle, setJobTitle] = useState(null);

    const [couponApplied, setCouponApplied] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponModel, setCouponModel] = useState(null);
    const [couponTnCAccept, setCouponTnCAccept] = useState(false);
    const [showCouponTnC, setShowCouponTnC] = useState(false);

    const [IsCaptchaLoading, setIsCaptchaLoading] = useState(true);

    const [showPayment, setShowPayment] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const validation = new BuyValidationModel();
    const captchaValidation = new CaptchaValidationModel();

    let countriesAbortController = new AbortController();
    let captchaAbortController = new AbortController();
    let jobTitleAbortController = new AbortController();

    useEffect(() => {
        setLoadingIpAddress(true);
        GeoLocation(SetLocationModel);
    }, []);

    useEffect(() => {
        if (!postId || isNaN(postId)) {
            // navigate user to common error page
        }

        setModel({ ...Model, Request: { ...Model.Request, ['ReportId']: parseInt(postId) } });

        FetchCountries();
        FetchJobTitles();
        GetCaptcha();
        setFormPurchasePlanPrice(purchasePlan ? parseInt(purchasePlan) : 1);
        return (() => {
            countriesAbortController.abort();
            jobTitleAbortController.abort();
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

    function ValidateFormItem(prop, value) {
        let isValid = true;

        let toValidateProp = validation[prop];
        let validateError = toValidateProp.Validate(value);
        let errors = ValidationErrors.filter(f => f.PropertyName !== prop)
        if (validateError) {
            isValid = false;
            errors.push(validateError);
        }

        setValidationErrors(errors);
        setIsValidForm(isValid);
        return isValid;
    }

    function ValidateForm(prop, value) {
        let isValid = true;
        let isPropValid = true;

        for (const item in validation) {
            let validationItem = validation[item];
            let validateError = validationItem.Validate(item === prop ? value : Model.Request[item]);
            if (validateError) {
                isValid = false;
                if (item === prop) {
                    setValidationErrors(err => [...err, validateError]);
                    isPropValid = false;
                }
                else {
                    let errors = ValidationErrors.filter(f => f.PropertyName !== prop)
                    setValidationErrors(errors);
                }
            }
            else {
                setValidationErrors([]);
            }
        }

        setIsValidForm(isValid);
        return isPropValid;
    }

    function ValidateCaptchaForm(prop, value) {
        let isValid = true;
        let isPropValid = true;

        for (const item in captchaValidation) {
            let validationItem = captchaValidation[item];
            let validateError = validationItem.Validate(item === prop ? value : Model.Captcha[item]);
            if (validateError) {
                isValid = false;
                if (item === prop) {
                    setValidationErrors(err => [...err, validateError]);
                    isPropValid = false;
                }
                else {
                    let errors = ValidationErrors.filter(f => f.PropertyName !== prop)
                    setValidationErrors(errors);
                }
            }
            else {
                setValidationErrors([]);
            }
        }

        setIsValidForm(isValid);
        return isPropValid;
    }

    function setError(prop) {
        if (!ValidationErrors || ValidationErrors.length === 0) {
            return { IsError: false, ErrorMessage: '' }
        }

        let validError = ValidationErrors.filter(f => f.PropertyName === prop);
        if (!validError || validError.length === 0) {
            return { IsError: false, ErrorMessage: '' }
        }

        let error = { IsError: true, ...validError.pop() }
        return error;
    }

    function SaveRequest() {
        if (IsLoading) {
            return;
        }

        if (!TnCAccepted) {
            setToastMessage({ Message: ValidationMessages.TnCNotAccepted, Severity: 'error' });
            return;
        }

        let saveModel = Model;
        if (!saveModel) {
            saveModel = new BuyQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new RequestModel();
        }

        if (!saveModel.Captcha) {
            saveModel.Captcha = new CaptchaModel();
        }

        saveModel.Request.ReportId = parseInt(postId);
        saveModel.Request.Domain = window.location.origin;
        setLoading(true);

        let validateErrors = [];
        for (const item in validation) {
            let validateError = validation[item].Validate(saveModel.Request[item]);
            if (validateError) {
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

        try {
            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.Buy.ResearchBuy)
                .then(
                    (result) => {
                        if (!result) {
                            setToastMessage({ Message: "Request failed. Please try again", Severity: 'error' });
                            setLoading(false);
                            setIsCaptchaLoading(false);
                            return;
                        }

                        if (result.IsSuccess) {
                            setLoading(false);
                            setIsCaptchaLoading(false);
                            setConfirmationModel(result.Data);
                            SessionStorage.SetData(SessionStorageKeys.Request, JSON.stringify(result.Data.Request));

                            if ([PaymentTypes.WireTransfer.id, PaymentTypes.Amex.id].includes(Model.Request.PaymentMode)) {
                                setActiveStep(2);
                                setShowConfirmation(true);
                            }
                            else if (result.Data) {
                                setModel({ ...Model, Request: { ...Model.Request, ['Id']: result.Data.Request.Id } });
                                setActiveStep(1);
                                setShowPayment(true);
                            }
                            return;
                        }

                        if (!result.IsSuccess && result.Data && result.Data.Errors && result.Data.Errors.length > 0) {
                            setValidationErrors(result.Data.Errors);
                        }

                        if (result.Data && result.Data.Model && result.Data.Model.Captcha) {
                            setModel({ ...Model, Captcha: new CaptchaModel(result.Data.Model.Captcha) });
                        }

                        setToastMessage({ Message: result && result.Message ? result.Message : "Request failed", Severity: 'error' });
                        setLoading(false);
                        setIsCaptchaLoading(false);
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

    const setFormCountryValues = (prop) => (event, country) => {
        let isValid = ValidateForm(prop, country ? country.Id : 0);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: isValid && country ? country.Id : 0 } });
        setContactCountry(country ? country : null);
    };

    const setFormJobTitleValues = (prop) => (event, jobTitle) => {
        let isValid = ValidateForm(prop, jobTitle ? jobTitle.Id : 0);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: isValid && jobTitle ? jobTitle.Id : 0 } });
        setJobTitle(jobTitle ? jobTitle : null);
    };

    const setFormTextValues = (prop) => (event) => {
        let isValid = ValidateFormItem(prop, event.target.value);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: event.target.value } });
    };

    const setPaymentModeValue = (prop) => (event) => {
        let isValid = ValidateFormItem(prop, event.target.value);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: parseInt(event.target.value) } });
    };

    const setFormEmailValues = (event) => {
        let prop = 'Email';
        let valid = setError(prop);

        if (!valid || valid.IsError || !event.target.value) {
            return;
        }

        ApiHandler.ApiService.Get(ApiHandler.ApiUrls.Validator.Email, event.target.value)
            .then(
                (response) => {
                    let errors = ValidationErrors.filter(f => f.PropertyName !== prop);

                    if (!response || !response.IsSuccess) {
                        let validationError = new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: response.Message, PropertyName: prop });
                        errors.push(validationError);
                    }

                    setIsValidForm(!errors || errors.length === 0);
                    setValidationErrors(errors);
                },
                (error) => {
                    console.error(error);
                }
            )
    };

    const setCaptchaTextValues = (prop) => (event) => {
        let isValid = ValidateCaptchaForm(prop, event.target.value);
        setModel({ ...Model, Captcha: { ...Model.Captcha, [prop]: isValid ? event.target.value : '' } });
    }

    const countryFilterOptions = createFilterOptions({
        stringify: (option) => option.Name + option.ISDCode + option.Code,
    });

    const setFormPurchasePlan = (event) => {
        setFormPurchasePlanPrice(event.target.value);
    };

    const setFormPurchasePlanPrice = (planId) => {
        let price = 0;
        if (planId === 1) {
            price = research.PriceSingleUser || Prices.SingleUser;
        }
        else {
            price = research.PriceEnterprise || Prices.Corporate;
        }

        setPostPriceOriginal(price);
        let isValid = ValidateForm('PurchasePlan', planId);

        if (couponCode) {
            let model = Model;
            model.Request.PurchasePlan = isValid ? planId : 1;
            model.Request.ReportPrice = parseInt(price);
            ApplyCoupon(true, planId, model);
        }
        else {
            setModel({ ...Model, Request: { ...Model.Request, ['PurchasePlan']: isValid ? planId : 1, ['ReportPrice']: parseInt(price) } });
        }
    };

    const KeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            SaveRequest();
        }
    }

    const KeyPressCoupon = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            ApplyCoupon(true);
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

    function showInfoOfPurchasePlan() {
        let tooltip = Model.Request.PurchasePlan === 1
            ? "It allows one person, the buyer, to have sole right and access to the purchased report. Further distribution of product is strictly prohibited."
            : "It allows the purchased product to be shared among all employees of your organization irrespective of their geographical location.";
        setPurchasePlanTooltip(tooltip);
    }

    function ApplyCoupon(apply, purchasePlan, model) {
        let prop = 'CouponCode';

        if (!couponCode || !apply) {
            setModel({ ...Model, Request: { ...Model.Request, [prop]: '' } });
            setCouponCode('');
            setCouponApplied(false);
            setCouponModel(null);
        }
        else {
            let couponModel = new Object();
            couponModel.CouponCode = couponCode;
            couponModel.ReportId = postId;
            couponModel.PurchasePlan = purchasePlan ? purchasePlan : Model.Request.PurchasePlan;

            ApiHandler.ApiService.Post(couponModel, ApiHandler.ApiUrls.Coupon.Validate)
                .then(
                    (response) => {
                        let errors = ValidationErrors.filter(f => f.PropertyName !== prop)
                        let postModel = model || Model;
                        if (!response || !response.IsSuccess) {
                            let validationError = new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: response.Message, PropertyName: prop });
                            errors.push(validationError);
                            setIsValidForm(false);
                            postModel.Request[prop] = '';
                            setCouponCode('');
                            setCouponApplied(false);
                            setCouponModel(null);
                        }
                        else {
                            postModel.Request[prop] = couponCode;
                            setCouponApplied(true);
                            setCouponModel(response.Data);
                        }

                        setModel(postModel);
                        setValidationErrors(errors);
                        setIsValidForm(!errors || errors.length === 0);
                    },
                    (error) => {
                        setLoading(false);
                        GetCaptcha();
                        console.error(error);
                    }
                )
        }
    }

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
                onChange={setFormCountryValues('CountryId')}
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
                    <FormTextField
                        {...params}
                        label={
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="body1" component="span" sx={{ mr: 1 }}>Country*</Typography>
                                {
                                    ContactCountry ? <CountryFlag countryCode={ContactCountry.Code} countryName={ContactCountry.Name} flagWidth={25} /> : null
                                }
                            </Box>
                        }

                        fieldError={setError('CountryId')}
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

    function onCancelPayment() {
        setActiveStep(0);
        setShowPayment(false);
    }

    function onSuccessPayment() {
        setActiveStep(2);
        router.push('/Thankyou/Buy');
    }

    if (!research) {
        return (
            <div>
                <Paper elevation={0} sx={{ p: '5px 30px' }}>
                    <Loader rounded showModal={true} />
                </Paper>
            </div>
        )
    }

    if (showConfirmation) {
        router.push('/Thankyou/Buy');
    }

    return (
        <>
            <Box sx={{ pt: 1 }}>
                <BuyHeader research={research} activeStep={activeStep} />
            </Box>
            <Paper id="buy-form" sx={{ p: { xs: 2, md: 5 } }} elevation={0}>
                {
                    ToastMessage ?
                        <Toast open={ToastMessage.Message ? true : false}
                            severity={ToastMessage.Severity}
                            message={ToastMessage.Message}
                            onHide={() => setToastMessage(undefined)}
                        />
                        : null
                }

                <form noValidate autoComplete="off">
                    <Grid container spacing={{ xs: 0, md: 5 }} sx={{ display: 'flex' }}>
                        <Grid item xs={12} lg={6}>
                            <Box sx={{ pt: 1, pb: 1 }} >
                                <Typography id="buy-form-title" variant="h6" component="h2" textAlign='center' sx={{ fontWeight: 'bold' }}>
                                    FILL THE DETAILS
                                </Typography>
                            </Box>

                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                        <FormTextField fieldError={setError('FullName')} label="Full Name*" value={Model.Request.FullName} onKeyPress={KeyPress} onChange={setFormTextValues('FullName')} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormTextField fieldError={setError('Email')} type='email' label="Business Email*" value={Model.Request.Email} onKeyPress={KeyPress} onChange={setFormTextValues('Email')} onBlur={setFormEmailValues} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>{buildCountriesComponent()}</FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormTextField fieldError={setError('ContactNo')} type='number' label="Contact Number*" value={Model.Request.ContactNo} onKeyPress={KeyPress}
                                            onChange={setFormTextValues('ContactNo')}
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
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormTextField fieldError={setError('CompanyName')} label="Company Name*" value={Model.Request.CompanyName} onKeyPress={KeyPress} onChange={setFormTextValues('CompanyName')}
                                            error={setError('CompanyName').IsError} helperText={setError('CompanyName').ErrorMessage} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>{buildJobTitleComponent()}</FormControl>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <FormControl fullWidth>
                                        <FormTextField multiline label="Address*" value={Model.Request.Address} onChange={setFormTextValues('Address')} fieldError={setError('Address')} rows={3} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormTextField label="ZIP*" value={Model.Request.Zip} onKeyPress={KeyPress} onChange={setFormTextValues('Zip')} fieldError={setError('Zip')} />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormTextField label="City*" value={Model.Request.City} onKeyPress={KeyPress} onChange={setFormTextValues('City')} fieldError={setError('City')} />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormTextField label="State*" value={Model.Request.State} onKeyPress={KeyPress} onChange={setFormTextValues('State')} fieldError={setError('State')} />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <FormControl fullWidth>
                                        <FormTextField multiline variant="outlined" value={Model.Request.Description} onChange={setFormTextValues('Description')}
                                            fieldError={setError('Description')} rows={4}
                                            placeholder="Tell us about your requirement in brief*"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth >
                                        <TextField variant="standard" label="Answer*" value={Model.Captcha.Answer}
                                            type="number" onKeyPress={KeyPress} onChange={setCaptchaTextValues('Answer')}
                                            error={setError('Answer').IsError} helperText={setError('Answer').ErrorMessage}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {
                                                            IsCaptchaLoading
                                                                ? <Loader rounded={true} roundedSize={20} />
                                                                : Model.Captcha.Captcha
                                                                    ? <><Image src={Model.Captcha.Captcha} alt='Solve Puzzle' loading="lazy" width={80} height={30} />=</>
                                                                    : <Button size="small" variant='outlined' color="warning" onClick={() => GetCaptcha()}>Reload Puzzle</Button>
                                                        }
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
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
                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {
                                        LoadingIpAddress
                                            ? <LoadingButton loading={LoadingIpAddress} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Loading</Typography></LoadingButton>
                                            : IsLoading ?
                                                <LoadingButton loading={IsLoading} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Proceed</Typography></LoadingButton>
                                                : <Button size="small" variant='contained' color="success" onClick={SaveRequest}>Proceed</Button>
                                    }
                                </Grid>
                            </Grid>

                            <Box sx={{ textAlign: 'center' }}>
                                <Divider sx={{ mb: 1, mt: 1 }} />
                                <Typography variant='caption' component='span' color="grey.500" sx={{ display: 'flex' }}>
                                    Note: For delivery of sample pages you must have a Domain Specific EmailID, normally your business email address complies. Generic Email IDs such as AOL, Hotmail, Yahoo, Gmail, MSNetc are not accepted
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Paper elevation={0}>
                                <Paper elevation={0} sx={{ mb: { xs: 5, md: 0 } }}>
                                    <Box sx={{ pt: 1, pb: 1, pl: 4, pr: 4 }} >
                                        <Typography id="buy-form-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                                            PRODUCT
                                        </Typography>
                                    </Box>
                                    <Paper sx={{ p: { xs: 0, md: 4 } }} elevation={0}>
                                        <Paper elevation={5} sx={{ p: { xs: 1, md: 2 }, display: 'flex', flexDirection: 'column' }} >
                                            <Box>
                                                <Typography component="h1" variant="h6">{research.PostKey}</Typography>
                                                <Typography component="h2" variant="h6" sx={{ fontSize: 16 }} >
                                                    {research.Name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Button variant="contained" color="primary" size='large' sx={{ mt: 2 }} >${couponModel && couponModel.OfferPrice ? couponModel.OfferPrice : postPriceOriginal}</Button>
                                                {
                                                    couponModel
                                                        ? <Box>
                                                            <Typography component="span" variant="body1" sx={{ fontSize: 15, color: theme.palette.error.main, textDecoration: 'line-through' }}>
                                                                ${postPriceOriginal}
                                                            </Typography>
                                                            <Typography component="span" variant="body1" sx={{ fontSize: 15, ml: '0.5rem', mr: '0.5rem' }}>
                                                                You have saved
                                                            </Typography>
                                                            <Typography component="span" variant="body1" sx={{ fontSize: 15, color: theme.palette.success.main }}>
                                                                ${couponModel.SavedAmount}
                                                            </Typography>
                                                        </Box>
                                                        : null
                                                }
                                            </Box>
                                            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                <FormControl sx={{ width: { xs: '100%', md: '50%' } }} >
                                                    <TextField select
                                                        error={setError('PurchasePlan').IsError} helperText={setError('PurchasePlan').ErrorMessage}
                                                        size="small" sx={{ width: { xs: 'auto', md: 300 } }} variant="filled"
                                                        value={Model.Request.PurchasePlan} onKeyPress={KeyPress} defaultValue={2}
                                                        onChange={setFormPurchasePlan}>
                                                        <MenuItem value={1}>Single User</MenuItem>
                                                        <MenuItem value={2}>Corporate User</MenuItem>
                                                    </TextField>
                                                </FormControl>
                                                <ClickAwayListener onClickAway={() => setPurchasePlanTooltip('')}>
                                                    <Tooltip PopperProps={{
                                                        disablePortal: true,
                                                    }}
                                                        open={purchasePlanTooltip ? true : false}
                                                        disableFocusListener
                                                        disableHoverListener
                                                        disableTouchListener
                                                        title={purchasePlanTooltip}>
                                                        <InfoOutlinedIcon onClick={showInfoOfPurchasePlan} />
                                                    </Tooltip>
                                                </ClickAwayListener>
                                            </Box>
                                        </Paper>
                                    </Paper>
                                </Paper>
                                <Paper sx={{ pl: 4, pr: 4, pt: 1 }} elevation={0}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={8}>
                                            <FormControl fullWidth>
                                                <TextField variant="outlined" placeholder='Enter Coupon Code' value={couponCode}
                                                    onKeyPress={KeyPressCoupon} onChange={(e) => setCouponCode(e.target.value)}
                                                    error={setError('CouponCode').IsError} helperText={setError('CouponCode').ErrorMessage}
                                                    disabled={couponApplied} size="small"
                                                    sx={{ backgroundColor: couponModel && couponModel.Model && couponModel.Model.CouponApplyMessage ? '#C5F1C1' : '' }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Image src='/Checkout/Coupon.png' alt='Coupon' loading="lazy" width={28} height={30} />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                                {
                                                    couponModel && couponModel.Model && couponModel.Model.CouponApplyMessage
                                                        ? <Typography variant='body1' component='span' sx={{ color: theme.palette.success.main }}>{couponModel.Model.CouponApplyMessage}</Typography>
                                                        : null
                                                }

                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button size="medium" variant='contained' color="primary" disabled={couponApplied} onClick={() => ApplyCoupon(true)}>Apply</Button>
                                                <Button size="medium" variant='contained' color="secondary" disabled={!couponApplied} onClick={() => ApplyCoupon(false)}>Remove</Button>
                                            </Paper>
                                            {
                                                couponApplied
                                                    ? <Box>
                                                        <FormControl>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox checked={couponTnCAccept} onChange={(e) => setCouponTnCAccept(e.target.checked)} />
                                                                }
                                                                label={
                                                                    <Grid container spacing={1}>
                                                                        <Grid item><Typography>Accept</Typography></Grid>
                                                                        <Grid item><Link onClick={(e) => setShowCouponTnC(true)}>{`Terms & Conditions`}</Link></Grid>
                                                                    </Grid>
                                                                } />
                                                        </FormControl>
                                                        <Modal open={showCouponTnC} onClose={() => setShowCouponTnC(false)}>
                                                            <Card sx={couponModelStyle} elevation={10}>
                                                                <CardHeader title={`Terms & Conditions`}></CardHeader>
                                                                <CardContent sx={{ overflow: 'auto', height: '50vh' }}>
                                                                    {
                                                                        couponModel && couponModel.Model && couponModel.Model.Rules
                                                                            ? <div dangerouslySetInnerHTML={{ __html: couponModel.Model.Rules }} />
                                                                            : null
                                                                    }
                                                                </CardContent>
                                                                <CardActions sx={{ backgroundColor: theme.palette.secondary.main }}>
                                                                    <Button onClick={() => setShowCouponTnC(false)} variant="text" sx={{ width: '100%' }}>OK</Button>
                                                                </CardActions>
                                                            </Card>
                                                        </Modal>
                                                    </Box>
                                                    : null
                                            }
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Paper>
                            <Paper elevation={0}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box sx={{ pt: 4, pb: 1, pl: 4, pr: 4 }} >
                                            <Typography id="buy-form-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                                                SELECT PAYMENT MODE
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item container xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid item xs={6}>
                                            <Paper sx={{ p: 4 }} elevation={0}>
                                                <FormControl>
                                                    <RadioGroup aria-labelledby="Payment Mode" defaultValue={5} name="Radio-Payment-Mode" value={Model.Request.PaymentMode}
                                                        onChange={setPaymentModeValue('PaymentMode')} sx={{
                                                            flexDirection: { xs: 'column', sm: 'row', lg: 'column' },
                                                            justifyContent: 'space-between',
                                                            '& .MuiFormControlLabel-root': {
                                                                width: { xs: 'auto', sm: '25%', lg: 'auto' }
                                                            }
                                                        }} >
                                                        <FormControlLabel value={5} control={<Radio />} label={<Image src='/Checkout/razorpay-logo-payment.png' alt='Razor Pay' loading="lazy" width={200} height={80} />} />
                                                        <FormControlLabel value={3} control={<Radio />} label={<Image src='/Checkout/ccavenue-logo-payment.png' alt='CC Avenue' loading="lazy" width={200} height={80} />} />
                                                        <FormControlLabel value={6} control={<Radio />} label={<Image src='/Checkout/amex-logo-payment.png' alt='Amex' loading="lazy" width={200} height={80} />} />
                                                        <FormControlLabel value={1} control={<Radio />} label="Wire Transfer" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box sx={{ position: 'relative', width: 150, height: 200 }}>
                                                <Image src="/GDPR/GDPR.png" alt='GDPR' loading="lazy" layout="fill" />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
                {
                    showPayment
                        ? <BuyPayment model={ConfirmationModel} onCancel={onCancelPayment} onSuccess={onSuccessPayment} />
                        : null
                }
            </Paper>
        </>
    )
}

const couponModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24
};