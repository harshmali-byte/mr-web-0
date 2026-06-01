import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { ApiHandler } from '../Api/ApiHandler';
import { Loader } from './Commons';
import HomeSectionTitle from '../Public/Home/HomeSectionTitle';

export default function LogoView({ category }) {
    const [logos, setLogos] = useState([]);
    const [isLogosLoading, setIsLogosLoading] = useState(false);
    let logosAbortController = new AbortController();

    useEffect(() => {
        getLogos();
    }, [category])

    function getLogos() {
        setIsLogosLoading(true);
        try {
            ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.Logos.Get, category, logosAbortController)
                .then(
                    (result) => {
                        if (logosAbortController.signal.aborted) {
                            setIsLogosLoading(false);
                            return;
                        }

                        if (result && result.IsSuccess && result.Data) {
                            let logoList = [];
                            result.Data.map(img => {
                                if (img) {
                                    logoList.push({ image: img, isLoading: true });
                                }
                            });

                            setLogos(logoList)
                        }
                        else {
                            setLogos([]);
                        }

                        setIsLogosLoading(false);
                    },
                    (error) => {
                        setIsLogosLoading(false);
                        console.error(error);
                    }
                )
        }
        catch (err) {
            setIsLogosLoading(false);
            console.error(err);
        }
    }

    function ShowImages() {
        return logos.map((img, index) => {
            return (
                <Grid item xs={4} sm={3} md={3} lg={1} key={index} sx={{ display: 'flex', justifyContent: 'center' }} className="client-logos">
                    <Image src={`${process.env.NEXT_PUBLIC_REACT_APP_APIURL}/Logos/GetLogo/${category}/${img.image.ImageName}`} alt={img.ImageName} loading="lazy" width={80} height={50} />
                </Grid>
            )
        })
    }

    if (isLogosLoading) {
        return (
            <Grid item xs={12}>
                <Loader />
            </Grid>
        )
    }

    if (!logos || logos.length === 0) {
        return null;
    }

    return (
        <Box>
            <Grid container rowGap={5} columnGap={5} sx={{ justifyContent: 'center' }}>
                <Grid item xs={12}>
                    <HomeSectionTitle title="TRUSTED BY THE WORLD'S" focusTitle={`SMARTEST ${category.toUpperCase()} COMPANIES`}
                        sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }}
                        sxTitleProps={{ fontSize: 26 }} sxFocusProps={{ fontSize: 26 }} />
                </Grid>
                {ShowImages()}
            </Grid>
        </Box>
    )
}