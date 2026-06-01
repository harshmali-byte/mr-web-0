import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function AboutWeDifferentItem({ imageName, title, description }) {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} sm={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ borderRadius: '50%', backgroundColor: theme.palette.secondary.main, p: 2 }}>
                        <Image src={`/AboutUs/${imageName}.png`} loading="lazy" layout='fixed' height={60} width={60} alt={title} />
                    </Box>
                </Box>
            </Grid>
            <Grid item container xs={12} sm={9}>
                <Grid item xs={12} sm={12}><Typography variant='h5' component="p" sx={{ lineHeight: 1.75, textAlign: { xs: 'center', sm: 'left' } }}>{title}</Typography></Grid>
                <Grid item xs={12} sm={12}><Typography variant='body2' component="p" sx={{ lineHeight: 1.75, textAlign: { xs: 'center', sm: 'left' } }}>{description}</Typography></Grid>
            </Grid>
        </Grid>
    )
}