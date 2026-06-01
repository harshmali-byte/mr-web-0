import React from 'react';
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function MAImageBox({ imgSrc, imgAlt, title, description, isRtl,
    xsImgGridItemSize, xsDescGridItemSize, smImgGridItemSize, smDescGridItemSize,
    mdImgGridItemSize, mdDescGridItemSize, imgHeight }) {
    const theme = useTheme();
    const isSmallerThanMDScreen = useMediaQuery(theme.breakpoints.down('md'));

    function BuildImage({ mr, imageHeight }) {
        return (
            <Box sx={{ mr: mr || 2, position: 'relative', width: '100%', height: imageHeight || 350 }}>
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
                    {
                        !isRtl && <Grid item xs={xsImgGridItemSize || 6} sm={smImgGridItemSize || 2}>
                            <BuildImage mr={2} imageHeight={imgHeight || { xs: 200, sm: 350 }} />
                        </Grid>
                    }
                    <Grid item xs={xsDescGridItemSize || 6} sm={smDescGridItemSize || 10}>
                        <BuildTitle />
                    </Grid>
                    {
                        isRtl && <Grid item xs={xsImgGridItemSize || 6} sm={smImgGridItemSize || 2}>
                            <BuildImage mr={2} imageHeight={imgHeight || { xs: 200, sm: 350 }} />
                        </Grid>
                    }
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
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: { xs: 'flex-start', md: 'center' } }} >
            {
                !isRtl && <Grid item xs={12} md={mdImgGridItemSize || 4}>
                    <BuildImage imageHeight={imgHeight || { xs: 350, sm: 350 }} />
                </Grid>
            }

            <Grid item container xs={12} md={mdDescGridItemSize || 8}>
                <Grid item>
                    <Box>
                        <BuildTitle />
                    </Box>
                </Grid>
                {description}
            </Grid>
            {
                isRtl && <Grid item xs={12} md={mdImgGridItemSize || 4}>
                    <BuildImage imageHeight={imgHeight || { xs: 350, sm: 350 }} />
                </Grid>
            }
        </Grid>
    )
}