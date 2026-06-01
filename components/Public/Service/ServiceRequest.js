import React from 'react';
import { Box, Container, Paper, Typography } from "@mui/material";
import dynamic from 'next/dynamic';

import HomeSectionTitle from '../Home/HomeSectionTitle';

const ServiceRequestForm = dynamic(() => import('./ServiceRequestForm'));
// const HomeSectionTitle = dynamic(() => import('../Home/HomeSectionTitle'));

export default function ServiceRequest({ requestType, title, focusTitle, subtitle, queryPlaceholder }) {
    return (
        <Container sx={{ mt: 6, mb: 5 }} id='requestform'>
            <Paper elevation={4} sx={{ pt: 4 }}>
                <Box sx={{}}>
                    <HomeSectionTitle title={title || "REQUEST A"} focusTitle={focusTitle || "PROPOSAL"} sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                    {
                        subtitle && <Typography component="div" variant="span" sx={{ pl: { xs: 1, lg: 30 }, pr: { xs: 1, lg: 30 }, textAlign: 'center' }}>{subtitle}</Typography>
                    }
                </Box>
                <Box sx={{ p: 6, pt: 4 }}>
                    <ServiceRequestForm requestType={requestType} queryPlaceholder={queryPlaceholder} />
                </Box>
            </Paper>
        </Container>
    )
}