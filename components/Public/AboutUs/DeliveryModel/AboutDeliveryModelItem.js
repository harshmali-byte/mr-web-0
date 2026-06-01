import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function AboutDeliveryModelItem({ imageName, description }) {
    const theme = useTheme();

    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Image src={`/AboutUs/${imageName}.png`} loading="lazy" layout='fixed' height={80} width={75} alt={description} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' component="p" sx={{ lineHeight: 1.75, textAlign: 'center', fontSize: 20, color: theme.custom.textColor, fontWeight: '500' }}>{description}</Typography>
            </Grid>
        </Grid>
    )
}