import React from 'react';
import Image from 'next/image';
import { Box, Grid, Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const ServiceQuickRequestForm = dynamic(() => import('../../ServiceQuickRequestForm'));

const modelStyle = {
    position: 'absolute',
    top: { xs: '50%', md: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '&:focus-visible': {
        outline: 'none'
    },
    width: { xs: '90%', md: '75%', lg: '65%', xl: '45%' },
    maxWidth: 700
};

const pdfIconBoxStyleMd = {
    ml: 8,
    position: 'absolute'
}

export default function MAGuideBookRequest({ onCloseModal }) {
    const theme = useTheme();

    function ShowPostKey() {
        return (
            <Grid item xs={12}>
                <Typography variant='span' component='h2' sx={{ color: theme.palette.info.main, textDecoration: 'underline' }}>Download M&A Guide Book</Typography>
            </Grid>
        )
    }

    function ShowRequestForm() {
        return (
            <Grid item xs={12} >
                <ServiceQuickRequestForm requestType="DownloadMAGuideBook" onCloseModal={onCloseModal} />
            </Grid>
        )
    }

    function ShowImage({ width, height }) {
        return (
            <Image src="/Research/PopupImage.png" width={width} height={height} loading="lazy" alt='Download Guide Book' />
        )
    }
    function ShowBox() {
        const isSmallerThanMDScreen = useMediaQuery(theme.breakpoints.down('md'));

        if (isSmallerThanMDScreen) {
            return (
                <Grid container sx={{ display: { xs: 'flex', md: 'none' } }} >
                    <Grid item container xs={12}>
                        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box>
                                <ShowImage width={60} height={80} />
                            </Box>
                        </Grid>
                        <Grid item xs={10} container sx={{ pl: 2 }}>
                            <ShowPostKey />
                        </Grid>
                    </Grid>
                    <ShowRequestForm />
                </Grid>
            )
        }

        return (
            <Grid container sx={{ display: { xs: 'none', md: 'flex' } }} >
                <Grid item xs={2} sx={{ backgroundColor: theme.palette.secondary.main, display: 'flex', alignItems: 'center' }}>
                    <Box sx={pdfIconBoxStyleMd}>
                        <ShowImage width={130} height={170} />
                    </Box>
                </Grid>
                <Grid item xs={10} container sx={{ p: 2, pl: 12 }}>
                    <ShowPostKey />
                    <ShowRequestForm />
                </Grid>
            </Grid>
        )
    }

    return (
        <Card sx={modelStyle}>
            <CardContent sx={{ p: { xs: 2, md: 0 }, '&:last-child': { pb: { xs: 2, md: 0 } } }}>
                {ShowBox()}
            </CardContent>
        </Card>
    )
}