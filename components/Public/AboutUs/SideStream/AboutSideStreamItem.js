import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function AboutSideStreamItem({ imageName, title, description, width }) {
    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Image src={`/AboutUs/${imageName}.png`} loading="lazy" layout='fixed' height={100} width={width} alt={description} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant='h6' component="span" sx={{ lineHeight: 1.75, textAlign: 'center', fontWeight: '600' }}>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' component="p" sx={{ lineHeight: 1.75, textAlign: 'center' }}>{description}</Typography>
            </Grid>
        </Grid>
    )
}