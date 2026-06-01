import React from 'react';
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function MABox({ imgSrc, imgAlt, title, description, imgHeight }) {
    const theme = useTheme();
    const isSmallerThanMDScreen = useMediaQuery(theme.breakpoints.down('md'));

    function BuildImage({ mr, imageHeight }) {
        return (
            <Box sx={{ mr: mr || 2, position: 'relative', width: '100%', height: imageHeight || 60 }}>
                <Image src={imgSrc} alt={imgAlt} layout='fill' />
            </Box>
        )
    }

    function BuildTitle() {
        return (
            <Typography variant='body2' sx={{ fontWeight: 'bold', color: theme.palette.info.main, fontSize: 16 }}>
                {title}
            </Typography>
        )
    }

    if (isSmallerThanMDScreen) {
        return (
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Grid item container xs={12} spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={3} sm={2}>
                        <BuildImage mr={2} imageHeight={imgHeight || 60} />
                    </Grid>
                    <Grid item xs={9} sm={10}>
                        <BuildTitle />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ p: { xs: 1, sm: 2 }, pt: { xs: 0 } }}>
                        {description}
                    </Box>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Grid item xs={12} md={1}>
                <BuildImage imageHeight={imgHeight || { xs: 60, sm: 90 }} />
            </Grid>
            <Grid item container xs={12} md={11}>
                <Grid item>
                    <Box>
                        <BuildTitle />
                    </Box>
                </Grid>
                {description}
            </Grid>
        </Grid>
    )
}