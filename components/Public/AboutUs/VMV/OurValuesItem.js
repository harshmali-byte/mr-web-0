import React from 'react';
import { Typography, Grid } from '@mui/material';
import Image from 'next/image';
import Brightness1Icon from '@mui/icons-material/Brightness1';

export default function OurValuesItem({ title, imageName, description }) {
    return (
        <Grid item container xs={12} sx={{ mt: 1, mb: 1 }}>
            <Grid item container xs={12}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Brightness1Icon sx={{ fontSize: 7, mr: 1, color: '#747579' }}></Brightness1Icon>
                    <Typography variant='body1' component='span' sx={{ fontWeight: 'bold' }}>{title}</Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
                <Grid item xs={12} sm={1}><Image src={`/${process.env.NEXT_PUBLIC_ORG}/AboutUs/${imageName}.png`} loading="lazy" width={40} height={40} alt={title} /></Grid>
                <Grid item xs={12} sm={11}>{description}</Grid>
            </Grid>
        </Grid>
    )
}