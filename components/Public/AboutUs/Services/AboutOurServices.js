import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { OrgInfo } from '../../../Common/Constants';
import dynamic from 'next/dynamic';

const HomeSectionTitle = dynamic(() => import('../../Home/HomeSectionTitle'));
const AboutOurServiceItem = dynamic(() => import('./AboutOurServiceItem'));

export default function AboutOurServices() {
    return (
        <Box sx={{}}>
            <Grid container sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box>
                        <HomeSectionTitle title="OUR" focusTitle="SERVICES" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant='p' component='p' sx={{ textAlign: 'center' }}>{`We provide a power source for each stage of your growth pipeline. We collaborate with you to accomplish revolutionary growth from conception to realisation via methodical research.`}</Typography>
                </Grid>
                <Grid item container spacing={5} xs={12} sx={{ mt: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Grid item xs={12} sm={6} sx={{}}><AboutOurServiceItem imageName="SyndicateReports.png" title="Syndicate Reports" description="Our syndicated research reports cover 45+ industry sectors offering you product/services and country-wise breakup of the market along with niche data and insights that will help you make informed business decisions. Our research is focused on the key segments of an industry that possess opportunities of growth." /></Grid>
                    <Grid item xs={12} sm={6} sx={{}}><AboutOurServiceItem imageName="ManagementConsultingServices.png" title="Customization Of Reports" description={`${OrgInfo.Name} offer especially tailored reports as custom projects wherein we offer you customization of our syndicated reports to expand its scope covering the areas of your interest. We offer on-demand customization on all syndicated report purchases as well.`} /></Grid>
                    <Grid item xs={12} sm={6} sx={{}}><AboutOurServiceItem imageName="LibraryOfFocussedReports.png" title="Library of Focussed Reports" description="We understand the need of data along with a statistical point. To accomplish this goal, we have come up with iFACTOR. A new and proven concept wherein you get access to Global and Country level reports along with newly published COVID-19 reports, Infographics & Statistics, numerous Company Profiles, 24/7 Analyst support, On Request Report, and Market Size Table at unexpectedly low cost." /></Grid>
                    <Grid item xs={12} sm={6} sx={{}}><AboutOurServiceItem imageName="CustomizationOfReports.png" title="Management Consulting Services" description={`${OrgInfo.FullName} provides top-notch management consulting services which include Go-to market strategy, Mergers and acquisitions, New product development, Competitive intelligence, Market feasibility study, Pricing analysis and much more. All you need to do is request a proposal.`} /></Grid>
                </Grid>
            </Grid>
        </Box>
    )
}