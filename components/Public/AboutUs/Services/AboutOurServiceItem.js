import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function AboutOurServiceItem({ imageName, title, description }) {
    const theme = useTheme();

    return (
        <Grid container spacing={{ xs: 2, sm: 5 }}>
            <Grid item xs={3} sm={2} lg={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', backgroundColor: theme.palette.themeColor.main, mt: 1, p: 2, borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image src={`/AboutUs/Services/${imageName}`} loading="lazy" layout='fixed' height={35} width={35} alt={description} />
                </Box>
            </Grid>
            <Grid item xs={9} sm={10} lg={11}>
                <Typography variant='body2' component="p" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>
                <Typography variant='body2' component="p" sx={{}}>{description}</Typography>
            </Grid>
        </Grid>
    )
}