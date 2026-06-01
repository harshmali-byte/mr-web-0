import React from 'react';
import { Grid } from '@mui/material';
import { OrgInfo } from '../../../../Common/Constants';
import dynamic from 'next/dynamic';

const OurValuesItem = dynamic(() => import('../../VMV/OurValuesItem'));

export default function OurValues() {
    return (
        <Grid item container xs={12} rowSpacing={2} sx={{ mt: 3 }}>
            <OurValuesItem title="Unstoppable Team" imageName="Team" description={`${OrgInfo.Name}'s competitive advantage arises from our ability to collaborate, share expertise, and draw on one another's strengths. Working together, listening to one another, and putting our best foot forward all make our team unstoppable.`} />
            <OurValuesItem title="Growth Mindset" imageName="Growth" description={`We at ${OrgInfo.Name} are all about pushing the envelope and unlocking our customers' full potential. We view problems as solutions waiting to be discovered and obstacles as opportunities to learn from. As part of the ${OrgInfo.Name} experience, we all have the chance to grow both personally and professionally.`} />
            <OurValuesItem title="Extreme Ownership" imageName="Ownership" description={`We seek opportunities, take ownership, and act on them—even if that means crossing boundaries and tackling new roles. Our continuous improvement of our platform and the success of our clients are driven by this initiative and intrinsic motivation.`} />
            <OurValuesItem title="Happy People" imageName="Support" description={`Our firm is more than just a business; we're a lot of unique personalities with distinct personalities. We strive to maintain an environment where you can be yourself, make friends, and enjoy your job. Customers are satisfied when employees are happy.`} />
        </Grid>
    )
}