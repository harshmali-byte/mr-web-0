import React from 'react';
import { Grid, Box, Typography, Container, Button } from "@mui/material";
import HomeSectionTitle from '../../Home/HomeSectionTitle';
import LinkedInAniketShort from '../../../Common/SocialCards/LinkedIn/LinkedInAniketShort';
import LinkedInVishalShort from '../../../Common/SocialCards/LinkedIn/LinkedInVishalShort';
import LinkedInAjayShort from '../../../Common/SocialCards/LinkedIn/LinkedInAjayShort';

export default function B2BOurTeam() {
    return (
        <Container>
            <Box sx={{ mb: { xs: 1, lg: 13 } }}>
                <Box sx={{ pb: 4, pt: 4 }}>
                    <HomeSectionTitle title="OUR" focusTitle="TEAM" sxProps={{ alignItems: 'center', textAlign: 'center' }} />
                    <Typography component="div" variant="span" sx={{ pl: { xs: 1, lg: 30 }, pr: { xs: 1, lg: 30 }, textAlign: 'center' }}>We are a full-service market research company providing a full-scale of marketing insight along with consultancy services</Typography>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}><LinkedInAniketShort /></Grid>
                    <Grid item xs={12} sm={6} md={4}><LinkedInVishalShort /></Grid>
                    <Grid item xs={12} sm={6} md={4}><LinkedInAjayShort /></Grid>
                </Grid>
            </Box>
        </Container>
    )
}