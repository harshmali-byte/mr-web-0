import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import HomeSectionTitle from './HomeSectionTitle';
import Clients from '../../Common/ClientCarousel/Clients';
import { OrgInfo } from '../../Common/Constants';

export default function HomeTrusted() {
    return (
        <Box>
            <Container>
                <Box sx={{ pb: { xs: 0, sm: 2 }, mt: 10 }}>
                    <HomeSectionTitle title="TRUSTED BY THE WORLD'S" focusTitle="SMARTEST COMPANIES" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                    <Box>
                        <Typography component="div" variant="span" sx={{ pl: { xs: 3, lg: 30 }, pr: { xs: 3, lg: 30 }, textAlign: 'center' }}>Our Reports Have Been Trusted by The Best. Meet Some Companies Who Make Better Decisions With {OrgInfo.FullName}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Clients />
                </Box>
            </Container>
        </Box>
    )
}