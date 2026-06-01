import React from 'react';
import { Typography, Grid } from '@mui/material';
import Image from 'next/image';
import Brightness1Icon from '@mui/icons-material/Brightness1';

export default function OurVM({ title, imageName, description }) {
    return (
        <Grid container>
            <Grid item container xs={12} sx={{ position: 'relative' }}>
                <Grid item xs={12} sx={{ zIndex: 1, mt: 2 }} >
                    <Image src={`/${process.env.NEXT_PUBLIC_ORG}/AboutUs/${imageName}.png`} loading="lazy" width={50} height={50} alt={title} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex' }}>
                    <Brightness1Icon sx={{ color: '#FFFFFF', position: 'absolute', left: 22, top: 0, fontSize: 40 }} />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                <Typography variant='h5' component='span'>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='span' component='span' sx={{ color: '#747579' }}>{description}</Typography>
            </Grid>
        </Grid>
    )
}