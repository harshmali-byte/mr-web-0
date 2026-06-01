import React from 'react';
import { Grid, Box, Typography, Container, Paper, useMediaQuery } from "@mui/material";
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function MADefinition() {
    const theme = useTheme();

    function GetImage({ smSize }) {
        return (
            <Grid item xs={6} sm={smSize} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/Services/M_A/WhatIsM_A.png" alt="What is M&A" height='140px' width='140px' />
            </Grid>
        )
    }

    function GetTitle() {
        return (
            <Typography variant='title' sx={{ fontWeight: 'bold', mt: 1, color: '#4285F4' }}>
                What Is Mergers And Acquisitions (M&A)?
            </Typography>
        )
    }

    function GetPara() {
        return (
            <>
                <Typography variant='body2' sx={{ mt: { xs: 0, lg: 1 } }}>
                    Mergers and acquisitions (M&A) refer to the process of combining two companies into one, either through a merger process where both companies combine to form a single entity, or an acquisition process where one company purchases the other and incorporates it into its business. These transactions can involve any type of agreement between two companies.
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Let's have a look at these two terms, merger and acquisition, separately.`}
                </Typography>
            </>
        )
    }

    function Build() {
        const isGreaterThanMDScreen = useMediaQuery(theme.breakpoints.up('sm'));

        if (isGreaterThanMDScreen) {
            return (
                <Grid container sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <GetImage smSize={2} />
                    <Grid item xs={12} sm={10}>
                        <Box sx={{ p: { xs: 1, sm: 2 }, pt: { xs: 0 } }}>
                            <GetTitle />
                            <GetPara />
                        </Box>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid container sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <GetImage smSize={4} />
                <Grid item xs={6} sm={8} md={10} lg={12}>
                    <Box sx={{ p: { xs: 1, sm: 2 }, display: 'flex' }}>
                        <GetTitle />
                    </Box>
                </Grid>

                <Grid item xs={12} md={12} lg={12} >
                    <Box sx={{ p: { xs: 1, sm: 2 }, pt: { xs: 0 } }}>
                        <GetPara />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ mb: { xs: 1, lg: 5 } }}>
            <Paper elevation={4}>
                <Build />
            </Paper>
        </Container>
    )
}