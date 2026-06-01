import React from 'react';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const OurValuesItem = dynamic(() => import('../../VMV/OurValuesItem'));

export default function OurValues() {
    return (
        <Grid item container xs={12} rowSpacing={2} sx={{ mt: 3 }}>
            <OurValuesItem title="Integrity" imageName="Integrity" description={`We are committed to conducting our research with the utmost integrity and honesty, ensuring that all data is collected and analyzed in a fair and unbiased manner.`} />
            <OurValuesItem title="Quality" imageName="Quality" description={`We are dedicated to providing high-quality research services that are accurate, reliable, and useful to our clients.`} />
            <OurValuesItem title="Innovation" imageName="Innovation" description={`We strive to continually improve our research methodologies and techniques, using the latest technology and approaches to deliver the best possible results.`} />
            <OurValuesItem title="Customer focus" imageName="Support" description={`We are focused on meeting the needs of our clients, providing personalized and customized research services that are tailored to their specific requirements.`} />
            <OurValuesItem title="Collaboration" imageName="Collaboration" description={`We believe in working collaboratively with our clients, partners, and stakeholders, leveraging their knowledge and expertise to enhance the quality and effectiveness of our research services.`} />
        </Grid>
    )
}