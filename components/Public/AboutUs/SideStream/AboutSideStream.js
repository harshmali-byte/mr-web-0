import React from 'react';
import { Box, Grid } from '@mui/material';
import { OrgInfo } from '../../../Common/Constants';
import dynamic from 'next/dynamic';

const HomeSectionTitle = dynamic(() => import('../../Home/HomeSectionTitle'));
const AboutSideStreamItem = dynamic(() => import('./AboutSideStreamItem'));

export default function AboutSideStream() {
    return (
        <Box sx={{}}>
            <Grid container sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box>
                        <HomeSectionTitle title="OUR" focusTitle="SIDE STREAM" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                    </Box>
                </Grid>
                <Grid item container xs={12} sx={{ mt: { sm: 5 }, mb: { sm: 5 }, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Grid item xs={12} sm={4} sx={{ pl: { xs: 0, sm: 5 }, pr: { xs: 0, sm: 5 }, pt: { xs: 5, sm: 0 }, pb: { xs: 5, sm: 0 } }}><AboutSideStreamItem width={90} imageName="BrandLogo" title={OrgInfo.Name} description={`${OrgInfo.FullName} provides in-depth and pertinent industry reports from around every domain and industries worldwide. We provide customized as well as syndicated research reports, including industry research, data mining tools, and negotiation-level Q&As. Our top-level consulting can help you make more intelligent choices that benefit your company and its customers.`} /></Grid>
                    <Grid item xs={12} sm={4} sx={{ pl: { xs: 0, sm: 5 }, pr: { xs: 0, sm: 5 }, pb: { xs: 5, sm: 0 } }}><AboutSideStreamItem width={110} imageName="LogoAIMarket" title="AI Market Report" description="Now is the world of Artificial Intelligence. Why stay behind the world then? Our analysts help you see the future opportunities from the key hole of artificial intelligence with our very own AI Market Report. The AI built by us aims to help millions of decision makers with the real-time insights of the market." /></Grid>
                    <Grid item xs={12} sm={4} sx={{ pl: { xs: 0, sm: 5 }, pr: { xs: 0, sm: 5 }, pt: { xs: 5, sm: 0 }, pb: { xs: 5, sm: 0 } }}><AboutSideStreamItem width={100} imageName="IndustryStatsReport" title="Industry Stats Report" description="Our database of syndicated and customized research reports is one-stop solution where our clients can find up-to-date Industry Stats Report. We also provide Report's Library that enlightens our clients with category knowledge, relevant and incisive category insights, industry outlook and trends, market intelligence and pricing data, and much more." /></Grid>
                </Grid>
            </Grid>
        </Box>
    )
}