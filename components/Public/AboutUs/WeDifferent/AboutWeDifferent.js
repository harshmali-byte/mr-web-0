import React from 'react';
import { Box, Divider } from '@mui/material';
import { OrgInfo } from '../../../Common/Constants';
import dynamic from 'next/dynamic';

const HomeSectionTitle = dynamic(() => import('../../Home/HomeSectionTitle'));
const AboutWeDifferentItem = dynamic(() => import('./AboutWeDifferentItem'));

export default function AboutWeDifferent() {
    return (
        <Box>
            <Box sx={{ mb: 5 }}>
                <HomeSectionTitle title="HOW ARE" focusTitle="WE DIFFERENT" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
            </Box>
            <Box>
                <AboutWeDifferentItem imageName="customization" title="Customization & Flexibility" description={`${OrgInfo.FullName} does not deliver just any market report. We deliver a new perspective, built on primary market input, and understand a clear picture on the client's challenge. Our research reports are thus highly customized as per each challenge and are greatly flexible as per client's requirement.`} />
            </Box>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <Box>
                <AboutWeDifferentItem imageName="tat" title="Less Turnaround Time(TAT)" description="We are not doing our job if we do not wisely advise our clients when they need us the most. Thus, with our assessment of all the aspects to the client's expertise on their own business and in their category along with our relevant experience, we thrive to provide best results in less time." />
            </Box>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <Box>
                <AboutWeDifferentItem imageName="BI" title="BI Delivery Platform" description="Our BI Delivery Platform combines operational and financial data to provide you with a clear 360° view of your performance. This helps in better decision-making." />
            </Box>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <Box>
                <AboutWeDifferentItem imageName="SalesSupport" title="100% Post-Sales support" description={`We do not tend to forget our clients once the business is done. We value them from the core of our hearts. Long-term relationships is what we believe in. ${OrgInfo.FullName} offers support and is available to help you 24 hours a day, five days a week.`} />
            </Box>
        </Box>
    )
}