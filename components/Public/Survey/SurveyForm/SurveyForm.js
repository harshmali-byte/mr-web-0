import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import dynamic from 'next/dynamic';
import SurveyResponseModel from '../../../Models/Survey/Response/SurveyResponseModel';
import SurveyResponseValidationModel from '../../../Models/Survey/Response/SurveyResponseValidationModel';
import SurveyResponseQueryModel from '../../../Models/Survey/Response/SurveyResponseQueryModel';
import { CountryList } from '../../../Services/CountryList';
import { ApiHandler, fetchData } from '../../../Api/ApiHandler';
import CountryFlag from '../../../Common/CountryFlag';
import { ValidationMessages, Dates } from '../../../Common/Constants';
import { EmployeeSizes, Revenues } from '../../../Common/SurveyConstants';

// Don't load this dynamically else, autocomplete will throw console error
import FormTextField from '../../../Common/Inputs/FormTextField';
import { format } from 'date-fns';
import SurveyFormField from './SurveyFormField';

const Loader = dynamic(() => import('../../../Common/Loader'));
const FormAutoComplete = dynamic(() => import('../../../Common/Inputs/FormAutoComplete'));

export default function SurveyForm({ survey, surveyResponse, setToastMessage, isCreatingSurvey, startSurvey, isAdmin, isAdminView }) {
    const theme = useTheme();

    const [IsLoading, setLoading] = useState(false);
    const [IsSurveyCreating, setIsSurveyCreating] = useState(false);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [Model, setModel] = useState(new SurveyResponseQueryModel());
    const [VisibleFields, setVisibleFields] = useState([]);

    const [isGenerateId, setGenerateId] = useState(false);
    const [IsCookieIdLoading, setIsCookieIdLoading] = useState(false);
    const [GeneratedCookieSettingId, setGeneratedCookieSettingId] = useState(null);

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    const [ContactCountry, setContactCountry] = useState(null);
    const [CountryAutoPopulate, setCountryAutoPopulate] = useState(false);

    const [JobTitles, setJobTitles] = useState([]);
    const [IsJobTitlesLoading, setIsJobTitlesLoading] = useState(true);
    const [JobTitle, setJobTitle] = useState(null);
    const [JobTitleAutoPopulate, setJobTitleAutoPopulate] = useState(false);

    const [Currencies, setCurrencies] = useState([]);
    const [IsCurrenciesLoading, setIsCurrenciesLoading] = useState(true);
    const [Currency, setCurrency] = useState(null);
    const [CurrencyAutoPopulate, setCurrencyAutoPopulate] = useState(false);

    const [BusinessTypes, setBusinessTypes] = useState([]);
    const [IsBusinessTypesLoading, setIsBusinessTypesLoading] = useState(true);
    const [BusinessType, setBusinessType] = useState(null);
    const [BusinessTypeAutoPopulate, setBusinessTypeAutoPopulate] = useState(false);

    const [RevenueRanges, setRevenueRanges] = useState([]);
    const [IsRevenueRangesLoading, setIsRevenueRangesLoading] = useState(true);
    const [RevenueRange, setRevenueRange] = useState(null);
    const [RevenueRangeAutoPopulate, setRevenueRangeAutoPopulate] = useState(false);

    const [EmployeeSizeRanges, setEmployeeSizeRanges] = useState([]);
    const [IsEmployeeSizeRangesLoading, setIsEmployeeSizeRangesLoading] = useState(true);
    const [EmployeeSizeRange, setEmployeeSizeRange] = useState(null);
    const [EmployeeSizeRangeAutoPopulate, setEmployeeSizeRangeAutoPopulate] = useState(false);

    const [validation, setValidation] = useState(null);

    let countriesAbortController = new AbortController();
    const jobTitleAbortController = new AbortController();
    const currenciesAbortController = new AbortController();
    const businessTypesAbortController = new AbortController();
    const cookieIdAbortController = new AbortController();

    useEffect(() => {
        FetchCountries();
        fetchData(setIsJobTitlesLoading, jobTitleAbortController, ApiHandler.ApiUrls.Survey.GetJobTitles, setJobTitles);
        fetchData(setIsCurrenciesLoading, currenciesAbortController, ApiHandler.ApiUrls.Currency.Get, setCurrencies);
        fetchData(setIsBusinessTypesLoading, businessTypesAbortController, ApiHandler.ApiUrls.BusinessTypes.Get, setBusinessTypes);

        return (() => {
            countriesAbortController.abort();
            jobTitleAbortController.abort();
        })
    }, [])

    useEffect(() => {
        if (!survey || !survey.Id) {
            return;
        }

        setIsRevenueRangesLoading(true);
        setRevenueRanges(Revenues[survey.ClientName.replaceAll(' ', '')]);
        setIsRevenueRangesLoading(false);

        setIsEmployeeSizeRangesLoading(true);
        setEmployeeSizeRanges(EmployeeSizes[survey.ClientName.replaceAll(' ', '')]);
        setIsEmployeeSizeRangesLoading(false);

        if (survey && survey.ViewAttributes) {
            let attribs;

            try {
                attribs = JSON.parse(survey.ViewAttributes);
            }
            catch (e) {
                console.log('ViewAttributes is not configured well. Please check format of value.');
            }

            if (attribs) {
                setVisibleFields(attribs.map(a => a.Name));
                setValidationRules(attribs);
            }
        }
    }, [survey])

    useEffect(() => {
        if (!surveyResponse || !surveyResponse.Id) {
            return;
        }

        let resModel = new SurveyResponseModel(surveyResponse);
        setCountryAutoPopulate(true);
        setCurrencyAutoPopulate(true);
        setJobTitleAutoPopulate(true);
        setBusinessTypeAutoPopulate(true);
        setRevenueRangeAutoPopulate(true);
        setEmployeeSizeRangeAutoPopulate(true);
        setModel({ ...Model, Request: resModel });
    }, [surveyResponse])

    useEffect(() => {
        setIsSurveyCreating(isCreatingSurvey);
    }, [isCreatingSurvey])

    useEffect(() => {
        if (IsCountriesLoading || !CountryAutoPopulate || !Countries || Countries.length === 0
            || !Model || !Model.Request) {
            return;
        }

        setCountryAutoPopulate(false);

        if (!Model || !Model.Request || !Model.Request.CountryId || parseInt(Model.Request.CountryId) === 0) {
            return;
        }

        let selectedCountry = Countries.find(f => f.Id === parseInt(Model.Request.CountryId));
        if (selectedCountry) {
            setContactCountry(selectedCountry);
        }
    }, [IsCountriesLoading, Model])

    useEffect(() => {
        if (IsCurrenciesLoading || !CurrencyAutoPopulate || !Currencies || Currencies.length === 0
            || !Model || !Model.Request) {
            return;
        }

        setCurrencyAutoPopulate(false);

        if (!Model || !Model.Request || !Model.Request.CurrencyId || parseInt(Model.Request.CurrencyId) === 0) {
            return;
        }

        let selectedCurrency = Currencies.find(f => f.Id === parseInt(Model.Request.CurrencyId));
        if (selectedCurrency) {
            setCurrency(selectedCurrency);
        }
    }, [IsCurrenciesLoading, Model])

    useEffect(() => {
        if (IsBusinessTypesLoading || !BusinessTypeAutoPopulate || !BusinessTypes || BusinessTypes.length === 0
            || !Model || !Model.Request) {
            return;
        }

        setBusinessTypeAutoPopulate(false);

        if (!Model || !Model.Request || !Model.Request.BusinessTypeId || parseInt(Model.Request.BusinessTypeId) === 0) {
            return;
        }

        let selectedValue = BusinessTypes.find(f => f.Id === parseInt(Model.Request.BusinessTypeId));
        if (selectedValue) {
            setBusinessType(selectedValue);
        }
    }, [IsBusinessTypesLoading, Model])

    useEffect(() => {
        if (IsJobTitlesLoading || !JobTitleAutoPopulate || !JobTitles || JobTitles.length === 0
            || !Model || !Model.Request) {
            return;
        }

        setJobTitleAutoPopulate(false);

        if (!Model || !Model.Request || !Model.Request.JobTitleId || parseInt(Model.Request.JobTitleId) === 0) {
            return;
        }

        let selectedValue = JobTitles.find(f => f.Id === parseInt(Model.Request.JobTitleId));
        if (selectedValue) {
            setJobTitle(selectedValue);
        }
    }, [IsJobTitlesLoading, Model])

    useEffect(() => {
        if (IsRevenueRangesLoading || !RevenueRangeAutoPopulate || !RevenueRanges || RevenueRanges.length === 0
            || !Model || !Model.Request) {
            return;
        }

        setRevenueRangeAutoPopulate(false);

        if (!Model || !Model.Request || !Model.Request.AnnualRevenueRange || parseInt(Model.Request.AnnualRevenueRange) === 0) {
            return;
        }

        let selectedValue = RevenueRanges.find(f => f.Id === parseInt(Model.Request.AnnualRevenueRange));
        if (selectedValue) {
            setRevenueRange(selectedValue);
        }
    }, [IsRevenueRangesLoading, Model])

    useEffect(() => {
        if (IsEmployeeSizeRangesLoading || !EmployeeSizeRangeAutoPopulate || !EmployeeSizeRanges || EmployeeSizeRanges.length === 0
            || !Model || !Model.Request) {
            return;
        }

        setEmployeeSizeRangeAutoPopulate(false);

        if (!Model || !Model.Request || !Model.Request.NoOfEmployeesRange || parseInt(Model.Request.NoOfEmployeesRange) === 0) {
            return;
        }

        let selectedValue = EmployeeSizeRanges.find(f => f.Id === parseInt(Model.Request.NoOfEmployeesRange));
        if (selectedValue) {
            setEmployeeSizeRange(selectedValue);
        }
    }, [IsEmployeeSizeRangesLoading, Model])

    useEffect(() => {
        if (!isGenerateId || IsCookieIdLoading) {
            return;
        }

        fetchData(setIsCookieIdLoading, cookieIdAbortController, ApiHandler.ApiUrls.SurveyAdmin.GetCookieId, setCookieId);

        return (() => {
            cookieIdAbortController.abort();
        })
    }, [isGenerateId])

    useEffect(() => {
        if (GeneratedCookieSettingId) {
            setModel({ ...Model, Request: { ...Model.Request, ['CookieSettingId']: GeneratedCookieSettingId } });
            setGenerateId(false);
            setIsCookieIdLoading(false);
        }
    }, [GeneratedCookieSettingId])

    function setValidationRules(attribs) {
        if (!attribs || attribs.length === 0) {
            return;
        }
        var valModel = new SurveyResponseValidationModel();

        attribs.every(att => {
            if (!att) {
                return true;
            }

            let valItem = valModel[att.Name];

            if (!valItem) {
                return true;
            }

            var item = att;
            item.Validate = valItem ? valItem.Validate : null;

            if (isAdmin && item.IsAdminVisible) {
                item.IsVisible = item.IsAdminVisible;
            }
            valModel[att.Name] = item;

            return true;
        })

        setValidation(valModel);
    }

    function setCookieId(result) {
        setGeneratedCookieSettingId(result);
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

        let saveModel = Model ? JSON.parse(JSON.stringify(Model)) : null;
        if (!saveModel) {
            saveModel = new SurveyResponseQueryModel();
        }

        if (!saveModel.Request) {
            saveModel.Request = new SurveyResponseModel();
        }

        setLoading(true);

        if (!saveModel.Request.OtherCurrency && saveModel.Request.OtherCurrency.trim().length > 0) {
            saveModel.Request.CurrencyId = 0;
        }

        let validateErrors = [];
        for (const item in validation) {
            let validateError = validation[item].Validate(saveModel.Request[item]);
            if (validateError) {
                validateErrors.push(validateError);
            }

            if (saveModel.Request[item] !== undefined && saveModel.Request[item] !== null && saveModel.Request[item].toString().trim().length === 0) {
                saveModel.Request[item] = null;
            }
        }

        setValidationErrors(validateErrors);

        if (validateErrors && validateErrors.length > 0) {
            setToastMessage({ Message: ValidationMessages.ValidationFailed, Severity: 'error' });
            setLoading(false);
            return;
        }

        saveModel.Request.IsAdmin = isAdmin;
        saveModel.Request.IsAdminView = isAdminView;

        setValidationErrors([]);

        try {
            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.Survey.Update)
                .then(
                    (result) => {
                        setLoading(false);
                        if (!result) {
                            setToastMessage({ Message: "Survey failed. Please try again", Severity: 'error' });

                            return;
                        }

                        if (result.IsSuccess && result.Data) {
                            startSurvey();
                            return;
                        }

                        if (!result.IsSuccess && result.ValidationErrors && result.ValidationErrors.length > 0) {
                            setValidationErrors(result.ValidationErrors);
                        }

                        setToastMessage({ Message: result && result.Message ? result.Message : "Survey failed", Severity: 'error' });
                    },
                    (error) => {
                        setLoading(false);
                        console.error(error);
                    }
                )
        }
        catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

    const setAutoCompleteValue = (id, prop) => {
        id = id || 0;
        let isValid = ValidateForm(prop, id);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: isValid && id } });
    }

    const setFormCountryValues = (prop) => (event, country) => {
        setAutoCompleteValue(country ? country.Id : 0, prop);
        setContactCountry(country ? country : null);
    };

    const setFormJobTitleValues = (prop) => (event, jobTitle) => {
        setAutoCompleteValue(jobTitle ? jobTitle.Id : 0, prop);
        setJobTitle(jobTitle ? jobTitle : null);
    };

    const setFormCurrencyValues = (prop) => (event, curr) => {
        let curId = curr ? curr.Id : 0;
        setAutoCompleteValue(curId, prop);
        setCurrency(curr ? curr : null);
    };

    const setFormBusinessTypeValues = (prop) => (event, bt) => {
        setAutoCompleteValue(bt ? bt.Id : 0, prop);
        setBusinessType(bt ? bt : null);
    };

    const setFormRevenueRangeValues = (prop) => (event, val) => {
        setAutoCompleteValue(val ? val.Id : 0, prop);
        setRevenueRange(val);
    };

    const setFormEmployeeSizeRangeValues = (prop) => (event, val) => {
        setAutoCompleteValue(val ? val.Id : 0, prop);
        setEmployeeSizeRange(val);
    };

    const setFormTextValues = (prop) => (event) => {
        let isValid = ValidateFormItem(prop, event.target.value);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: event.target.value } });
    };

    const setFormDateValues = (prop) => (newVal) => {
        let dateVal;
        if (newVal && newVal.toString() !== 'Invalid Date') {
            try {
                dateVal = new Date(newVal);
            }
            catch { }
        }

        let dateStr = dateVal ? format(dateVal, Dates.longDateTimeFormat) : newVal;

        let isValid = ValidateFormItem(prop, dateStr);
        setModel({ ...Model, Request: { ...Model.Request, [prop]: dateStr } });
    }

    const countryFilterOptions = createFilterOptions({
        stringify: (option) => option.Name + option.ISDCode + option.Code,
    });

    const KeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            SaveRequest();
        }
    }

    function buildCountriesComponent(attribute) {
        return <FormAutoComplete isLoading={IsCountriesLoading} items={Countries}
            onChange={setFormCountryValues} value={ContactCountry} attrib={attribute}
            optionLabel={(option) => option && option.Name ? option.Name : ''}
            filterOptions={countryFilterOptions}
            groupBy={option => option.firstLetter}
            renderOption={(props, option) => (
                <Box component="li"  {...props}>
                    <CountryFlag countryCode={option.Code} countryName={option.Name} />
                    <Typography variant="body1" component="span" sx={{ ml: 1 }}>{option.Name} ({option.Code}) {option.ISDCode}</Typography>
                </Box>
            )}
            renderInput={(params) => (
                <FormTextField
                    {...params}
                    label={
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="body1" component="span" sx={{ mr: 1 }}>{`${attribute.DisplayName}${attribute.IsMandatory ? '*' : ''}`}</Typography>
                            {
                                ContactCountry ? <CountryFlag countryCode={ContactCountry.Code} countryName={ContactCountry.Name} flagWidth={25} /> : null
                            }
                        </Box>
                    }

                    fieldError={setError(attribute.Name)}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    }

    function buildJobTitleComponent(attribute) {
        return <FormAutoComplete isLoading={IsJobTitlesLoading} items={JobTitles}
            onChange={setFormJobTitleValues} value={JobTitle} attrib={attribute}
            optionLabel={(option) => option && option.Name ? option.Name : ''}
            optionDisplayText={(option) => option.Name}
            setError={setError}
        />
    }

    function buildCurrencyComponent(attribute) {
        return <FormAutoComplete isLoading={IsCurrenciesLoading} items={Currencies}
            onChange={setFormCurrencyValues} value={Currency} attrib={attribute}
            optionLabel={(option) => option ? `${option.Name} (${option.Symbol})` : ''}
            optionDisplayText={(option) => `${option.Name} (${option.Symbol})`}
            setError={setError}
        />
    }

    function buildBusinessTypesComponent(attribute) {
        return <FormAutoComplete isLoading={IsBusinessTypesLoading} items={BusinessTypes}
            onChange={setFormBusinessTypeValues} value={BusinessType} attrib={attribute}
            optionLabel={(option) => option && option.Name ? option.Name : ''}
            optionDisplayText={(option) => option.Name}
            setError={setError}
        />
    }

    function buildRevenueRangeComponent(attribute) {
        return <FormAutoComplete isLoading={IsRevenueRangesLoading} items={RevenueRanges}
            onChange={setFormRevenueRangeValues} value={RevenueRange} attrib={attribute}
            optionLabel={(option) => option && option.DisplayName ? option.DisplayName : ''}
            optionDisplayText={(option) => option.DisplayName}
            setError={setError}
        />
    }

    function buildEmployeesRangeComponent(attribute) {
        return <FormAutoComplete isLoading={IsEmployeeSizeRangesLoading} items={EmployeeSizeRanges}
            onChange={setFormEmployeeSizeRangeValues} value={EmployeeSizeRange} attrib={attribute}
            optionLabel={(option) => option && option.DisplayName ? option.DisplayName : ''}
            optionDisplayText={(option) => option.DisplayName}
            setError={setError}
        />
    }

    if (!survey || !Model || !Model.Request) {
        return (
            <div>
                <Paper elevation={0} sx={{ p: '5px 30px' }}>
                    <Loader rounded showModal={true} />
                </Paper>
            </div>
        )
    }

    return (
        <Box>
            <form noValidate autoComplete="off">
                <Grid container spacing={{ xs: 0, md: 5 }} sx={{ display: 'flex' }}>
                    {
                        validation && VisibleFields && VisibleFields.map((attrib, index) => {
                            let lookupFn;
                            let attribute = attrib ? validation[attrib] : null;

                            if (attribute && attribute.IsVisible && attribute.InputType && attribute.InputType.toLowerCase() === 'lookup') {
                                switch (attribute.Name) {
                                    case 'CurrencyId': lookupFn = buildCurrencyComponent; break;
                                    case 'BusinessTypeId': lookupFn = buildBusinessTypesComponent; break;
                                    case 'CountryId': lookupFn = buildCountriesComponent; break;
                                    case 'JobTitleId': lookupFn = buildJobTitleComponent; break;
                                    case 'AnnualRevenueRange': lookupFn = buildRevenueRangeComponent; break;
                                    case 'NoOfEmployeesRange': lookupFn = buildEmployeesRangeComponent; break;
                                    default: lookupFn = null; break;
                                }
                            }

                            return (
                                <SurveyFormField
                                    key={index}
                                    attrib={attribute}
                                    lookupFn={lookupFn}
                                    ContactCountry={ContactCountry}
                                    setFormTextValues={setFormTextValues}
                                    keyPress={KeyPress}
                                    model={Model}
                                    setError={setError}
                                />
                            )
                        })
                    }
                </Grid>

                {
                    isAdmin &&
                    <Paper sx={{ mt: 10, px: 2, py: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: '900', pb: 3 }}>To be filled by Admin</Typography>
                        <Grid container spacing={{ xs: 0, md: 5 }} sx={{ display: 'flex' }}>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth>
                                    <FormTextField fieldError={setError('Latitude')} label="Latitude" type="number" value={Model.Request.Latitude} onKeyPress={KeyPress} onChange={setFormTextValues('Latitude')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth>
                                    <FormTextField fieldError={setError('Longitude')} label="Longitude" type="number" value={Model.Request.Longitude} onKeyPress={KeyPress} onChange={setFormTextValues('Longitude')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth>
                                    <FormTextField fieldError={setError('IpAddress')} label="Ip Address" value={Model.Request.IpAddress} onKeyPress={KeyPress} onChange={setFormTextValues('IpAddress')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth>
                                    <FormTextField disabled fieldError={setError('CookieSettingId')} label="Cookie Setting Id" value={Model.Request.CookieSettingId} onKeyPress={KeyPress} onChange={setFormTextValues('CookieSettingId')} />
                                </FormControl>
                                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                                    <Box sx={{}}>
                                        <Button variant="contained" onClick={() => setGenerateId(true)}>
                                            {IsCookieIdLoading ? <Loader rounded={true} loaderStyle={{ color: theme.palette.primary.contrastText }} roundedSize={15} /> : 'Generate'}
                                        </Button>
                                    </Box>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth>
                                    <FormTextField
                                        label="Starting (UTC)"
                                        fieldError={setError('CreatedDate')}
                                        onChange={setFormTextValues('CreatedDate')}
                                        value={Model.Request.CreatedDate}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth>
                                    <FormTextField
                                        label="Ending (UTC)"
                                        fieldError={setError('UpdatedDate')}
                                        onChange={setFormTextValues('UpdatedDate')}
                                        value={Model.Request.UpdatedDate}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                }

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Button variant="contained" onClick={SaveRequest} >{IsSurveyCreating || IsLoading ? <Loader rounded={true} loaderStyle={{ color: theme.palette.primary.contrastText }} roundedSize={15} /> : 'Start Survey'}</Button>
                </Box>
            </form>
        </Box>
    )
}