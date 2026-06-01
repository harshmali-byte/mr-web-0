import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function HomeOurStoryItem({ imagePath, count, title, sxBorderWidth }) {
    return (
        <Grid item xs={6} md={3} sx={[{ mb: 3, borderRightColor: 'rgba(116, 117, 121, 0.82)', borderRightStyle: 'solid' }, sxBorderWidth]}>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', p: 1 }}>
                <Image src={imagePath} loading="lazy" layout='fixed' alt="About Us" width={50} height={50} />
                <Typography variant='body2' component="p" sx={{ lineHeight: 1.75, textAlign: 'center', color: '#24292D', fontSize: 30, fontWeight: 'bold' }}>
                    {count}
                </Typography>
                <Typography variant='body2' component="p" sx={{ lineHeight: 1.75, textAlign: 'center', color: '#24292D', pl: { xs: 0, md: 3, lg: 10 }, pr: { xs: 0, md: 3, lg: 10 } }}>
                    {title}
                </Typography>
            </Box>
        </Grid>
    )
}