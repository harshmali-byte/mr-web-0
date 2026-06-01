import React from 'react';
import { Grid, Box, Typography, Container, Divider } from '@mui/material';
import HomeSectionTitle from '../../Home/HomeSectionTitle';
import { OrgInfo } from '../../../Common/Constants';
import Clients from '../../../Common/ClientCarousel/Clients';

export default function B2BTrustedClients() {
    return (
        <Box sx={{ mb: 2 }}>
            <Container sx={{ mb: 3 }}>
                <Grid container sx={{}}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mt: { xs: 5, md: 10 } }}>
                            <HomeSectionTitle title="TRUSTED BY THE WORLD'S" focusTitle="SMARTEST COMPANIES"
                                sxProps={{ flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}
                                sxTitleProps={{ fontSize: 24, display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}
                                sxFocusProps={{ fontSize: 24, display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}
                            />
                            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography component="div" variant="span" sx={{}}>Our Reports Have Been Trusted by The Best. Meet Some Companies Who Make Better Decisions With {OrgInfo.FullName}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box>
                            <Clients gridRows={2} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
        </Box>
    )
}