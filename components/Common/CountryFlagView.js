import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Loader, CountryFlag } from './Commons';
import { CountryList } from '../Services/CountryList';

export default function CountryFlagView() {
    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);
    let countriesAbortController = new AbortController();

    useEffect(() => {
        FetchCountries();
        return (() => {
            countriesAbortController.abort();
        })
    }, [])

    function FetchCountries() {
        setIsCountriesLoading(true);
        countriesAbortController = new AbortController();
        CountryList.Fetch(countriesAbortController)
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


    function ShowImages() {
        return Countries.map((cntry, index) => {
            return (
                <Box key={index} sx={{ p: '6px' }}>
                    <CountryFlag countryCode={cntry.Code} countryName={cntry.Name} />
                </Box>
            )
        })
    }

    if (IsCountriesLoading) {
        <Grid item xs={12}>
            <Loader />
        </Grid>
    }

    if (!IsCountriesLoading && (!Countries || Countries.length === 0)) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {ShowImages()}
        </Box>
    )
}