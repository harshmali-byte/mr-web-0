import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const HomeSectionTitle = dynamic(() => import('../../Home/HomeSectionTitle'));
const AboutDeliveryModelItem = dynamic(() => import('./AboutDeliveryModelItem'));

export default function AboutDeliveryModel() {
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
            <Container>
                <Grid container spacing={3} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <HomeSectionTitle title="OUR" focusTitle="DELIVERY MODEL" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                        </Box>
                    </Grid>
                    <Grid item container xs={12} sx={{ mt: { sm: 5 }, mb: { sm: 5 }, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Grid item xs={12} sm={4} sx={{ pl: 5, pr: 5, pt: { xs: 5, sm: 0 }, pb: { xs: 5, sm: 0 }, }}>
                            <AboutDeliveryModelItem imageName="InfographicFacts" description="Full Access to Latest Infographic Statistics & Facts at Affordable Plan Rates" />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{
                            pl: 5, pr: 5, pt: { xs: 5, sm: 0 }, pb: { xs: 5, sm: 0 },
                            borderLeft: { xs: 'none', sm: '3px solid #5c5e6030' },
                            borderRight: { xs: 'none', sm: '3px solid #5c5e6030' },
                            borderTop: { xs: '3px solid #5c5e6030', sm: 'none' },
                            borderBottom: { xs: '3px solid #5c5e6030', sm: 'none' }
                        }}>
                            <AboutDeliveryModelItem imageName="CompanyReports" description="Access to Company Reports, Industry Reports and COVID-19 Impact Analysis Reports" />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ pl: 5, pr: 5, pt: { xs: 5, sm: 0 }, pb: { xs: 5, sm: 0 }, }}>
                            <AboutDeliveryModelItem imageName="FreeSnapshot" description="Free Snapshot View of 60,000+ reports" />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}