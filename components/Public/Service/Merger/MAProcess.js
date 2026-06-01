import React from 'react';
import { Grid, Box, Container } from "@mui/material";
import HomeSectionTitle from '../../Home/HomeSectionTitle';
import Image from 'next/image';

export default function MAProcess() {
    return (
        <Box>
            <Container sx={{ mb: { xs: 1, lg: 5 } }}>
                <Box sx={{ pb: 4, pt: 4 }}>
                    <HomeSectionTitle title="MERGERS & ACQUISITIONS" focusTitle="(M&A) PROCESS" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ position: 'relative', height: { xs: 380, sm: 500, md: 600 } }}><Image src="/Services/M_A/Processes/M&AForBuyer.png" alt="M&AForBuyer" layout='fill' /></Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ position: 'relative', height: { xs: 380, sm: 500, md: 600 } }}><Image src="/Services/M_A/Processes/M&AForSeller.png" alt="M&AForSeller" layout='fill' /></Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}