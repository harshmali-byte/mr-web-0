import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import DatePicker from '@mui/lab/DatePicker';
import { ApiHandler, fetchData } from '../../../Api/ApiHandler';
import SurveyFilterModel from '../../../Models/Survey/Filter/SurveyFilterModel';
import SurveyFilterValidationModel from '../../../Models/Survey/Filter/SurveyFilterValidationModel';
import dynamic from 'next/dynamic';
import { SurveyStatus } from '../../../Common/AdminConstants';
import { ValidationMessages } from '../../../Common/Constants';
import CountryFlag from '../../../Common/CountryFlag';
import FormTextField from '../../../Common/Inputs/FormTextField';
import { FormHandler } from '../../../Common/FormHandler';

const Loader = dynamic(() => import('../../../Common/Loader'));
const FormAutoComplete = dynamic(() => import('../../../Common/Inputs/FormAutoComplete'));

export default function SurveyInfoView({ filterModel, setFilterModel, setSearchResult, isAdminView, setToastMessage, buildExportData, isExportingData, authorization, Countries }) {
    const theme = useTheme();
    const [surveys, setSurveys] = useState(null);
    const [model, setModel] = useState(null);
    const [IsValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const validation = new SurveyFilterValidationModel();

    const surveyAbortController = new AbortController();

    useEffect(() => {
        fetchData(setIsLoading, surveyAbortController, ApiHandler.ApiUrls.SurveyAdmin.GetSurveysForUser, setSurveys, null);

        let stats = [];

        Object.entries(SurveyStatus).forEach(s => {
            let st = s[1];
            if (isAdminView) {
                if (st.IsAdmin === true) {
                    stats.push(st);
                }
            }
            else {
                if (st.IsClient === true) {
                    stats.push(st);
                }
            }
        })
        setStatuses(stats);
    }, [])

    useEffect(() => {
        setModel(filterModel ? filterModel : new SurveyFilterModel());
    }, [filterModel])

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

    const setAutoCompleteValue = (selVal, prop) => {
        FormHandler.setFormAutoCompleteValues(prop, selVal, model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    }

    const setFormStatusValues = (prop) => (event, selVal) => {
        setAutoCompleteValue(selVal, prop);
        setSelectedStatus(selVal);
    };

    const setFormSurveyValues = (prop) => (event, selVal) => {
        setAutoCompleteValue(selVal, prop);
        setSelectedSurvey(selVal);
    };

    const setFormCountryValues = (prop) => (event, selVal) => {
        setAutoCompleteValue(selVal, prop);
        setSelectedCountry(selVal);
    };

    const setFormDateValues = (prop) => (newDate) => {
        FormHandler.setFormDateValues(prop, newDate, model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    };

    function applyFilter() {
        setSearchResult(false);
        if (isLoading) {
            return;
        }

        let saveModel = model ? JSON.parse(JSON.stringify(model)) : null;

        if (!saveModel) {
            saveModel = new SurveyFilterModel();
        }

        let validateErrors = [];
        for (const item in validation) {
            let modelProp = saveModel[item];

            let validateError = validation[item].Validate(modelProp);
            if (validateError) {
                validateErrors.push(validateError);
            }

            if (modelProp !== undefined && modelProp !== null && modelProp.toString().trim().length === 0) {
                modelProp = null;
            }
        }

        setValidationErrors(validateErrors);

        if (validateErrors && validateErrors.length > 0) {
            setToastMessage({ Message: ValidationMessages.ValidationFailed, Severity: 'error' });
            return;
        }

        setValidationErrors([]);
        setFilterModel(saveModel);
        setSearchResult(true);
    }

    function buildSurveyComponent() {
        let attribute = { Name: "Survey", DisplayName: "Survey", IsMandatory: true };

        return <FormAutoComplete isLoading={isLoading} items={surveys}
            onChange={setFormSurveyValues} value={selectedSurvey} attrib={attribute}
            optionLabel={(option) => option && option.Name ? option.Name : ''}
            optionDisplayText={(option) => option.Name}
            setError={setError}
        />
    }

    function buildStatusComponent() {
        let attribute = { Name: "Status", DisplayName: "Status", IsMandatory: false };

        return <FormAutoComplete isLoading={false} items={statuses}
            onChange={setFormStatusValues} value={selectedStatus} attrib={attribute}
            optionLabel={(option) => option && option.DisplayName ? option.DisplayName : ''}
            optionDisplayText={(option) => option.DisplayName}
            setError={setError}
        />
    }

    const countryFilterOptions = createFilterOptions({
        stringify: (option) => option.Name + option.Code,
    });

    function buildCountriesComponent() {
        let attribute = { Name: "Country", DisplayName: "Country", IsMandatory: false };

        return <FormAutoComplete isLoading={false} items={Countries}
            onChange={setFormCountryValues} value={selectedCountry} attrib={attribute}
            optionLabel={(option) => option && option.Name ? option.Name : ''}
            filterOptions={countryFilterOptions}
            groupBy={option => option.firstLetter}
            renderOption={(props, option) => (
                <Box component="li"  {...props}>
                    <CountryFlag countryCode={option.Code} countryName={option.Name} />
                    <Typography variant="body1" component="span" sx={{ ml: 1 }}>{option.Name} ({option.Code})</Typography>
                </Box>
            )}
            renderInput={(params) => (
                <FormTextField
                    {...params}
                    label={
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="body1" component="span" sx={{ mr: 1 }}>{`${attribute.DisplayName}${attribute.IsMandatory ? '*' : ''}`}</Typography>
                            {
                                selectedCountry ? <CountryFlag countryCode={selectedCountry.Code} countryName={selectedCountry.Name} flagWidth={25} /> : null
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

    if (isLoading) {
        return <Loader />
    }

    if (!surveys) {
        return null;
    }

    return (
        <Box sx={{ p: 1, mb: 2 }}>
            <form noValidate autoComplete="off">
                <Grid container spacing={{ xs: 0, md: 5 }} sx={{ display: 'flex' }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>{buildSurveyComponent()}</FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>{buildStatusComponent()}</FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>{buildCountriesComponent()}</FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>
                            <DatePicker showTodayButton={true} clearable={true} disableMaskedInput={true}
                                openTo="day" views={['year', 'month', 'day']} inputFormat="dd-MMM-yyyy"
                                label="Starting" value={model.StartDate || null} onChange={setFormDateValues('StartDate')}
                                showDaysOutsideCurrentMonth={true} showToolbar={true}
                                renderInput={(params) =>
                                    <FormTextField {...params} fieldError={setError('StartDate')} />
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>
                            <DatePicker showTodayButton={true} clearable={true} disableMaskedInput={true}
                                openTo="day" views={['year', 'month', 'day']} inputFormat="dd-MMM-yyyy"
                                label="Ending" value={model.EndDate || null} onChange={setFormDateValues('EndDate')}
                                showDaysOutsideCurrentMonth={true} showToolbar={true}
                                renderInput={(params) =>
                                    <FormTextField {...params} fieldError={setError('EndDate')} />
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={applyFilter}>Search</Button>
                    {
                        authorization.CanExport && <Button variant="contained" color="primary" onClick={buildExportData} sx={{ ml: 2, minWidth: 100 }}>{isExportingData ? <Loader rounded={true} roundedSize={15} loaderStyle={{ color: theme.palette.primary.contrastText }} /> : 'Export'}</Button>
                    }
                </Box>
            </form>
        </Box>
    )
}