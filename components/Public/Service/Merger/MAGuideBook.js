import React from 'react';
import { Grid, Box, Paper, Typography, Container } from "@mui/material";
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
// import dynamic from 'next/dynamic';

import HomeSectionTitle from '../../Home/HomeSectionTitle';

// const HomeSectionTitle = dynamic(() => import('../../Home/HomeSectionTitle'));

export default function MAGuideBook({ MAGuideBooData, showDownloadPopup }) {
    const theme = useTheme();

    if (!MAGuideBooData) {
        return null;
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ mb: { xs: 1, lg: 13 } }}>
                <Box sx={{ pb: 4, pt: 4 }}>
                    <HomeSectionTitle title="MERGERS & ACQUISITIONS" focusTitle="(M&A) GUIDEBOOK" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                </Box>
                <Box sx={{ backgroundImage: 'url("/Services/M_A/UltimateGuideToTheM&A.png")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '500px' }}>
                    <Grid container sx={{}}>
                        <Grid item container xs={12} lg={4.5}>
                            {
                                MAGuideBooData.Left.map(guideBook => {
                                    return (
                                        <Grid item xs={12} key={guideBook.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Paper elevation={3} sx={{ borderRadius: 75, fontSize: 14, fontWeight: 'bold', pt: 1, pr: 1.5, pb: 1, pl: 1.5, mt: 1, mb: 0.5, transition: 'all 1s', ':hover': { transform: 'scale(1.1)' } }}>
                                                    <Typography component='p' sx={{ textAlign: 'center' }}>{guideBook.question}</Typography>
                                                </Paper>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Grid item xs={12} lg={3} sx={{ height: { xs: 500, lg: 'auto' }, mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'flex-end', height: '100%', mt: { xs: 1, lg: 10 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Typography variant='body1' component='span'
                                        sx={{
                                            textAlign: 'center', pt: 1, pr: 3, pb: 1, pl: 3,
                                            borderRadius: 30, backgroundColor: theme.palette.info.main,
                                            color: theme.palette.info.contrastText,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                        onClick={() => showDownloadPopup(true)}
                                    >
                                        <Image src="/Download_Theme.gif" width={20} height={20} loading="lazy" alt='Download Guide Book' />&nbsp;The Ultimate Guide to the M&A</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} lg={4.5}>
                            {
                                MAGuideBooData.Right.map(guideBook => {
                                    return (
                                        <Grid item xs={12} key={guideBook.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Paper elevation={3} sx={{ borderRadius: 75, fontSize: 14, fontWeight: 'bold', pt: 1, pr: 1.5, pb: 1, pl: 1.5, mt: 1, mb: 0.5, transition: 'all 1s', ':hover': { transform: 'scale(1.1)' } }}>
                                                    <Typography component='p' sx={{ textAlign: 'center' }}>{guideBook.question}</Typography>
                                                </Paper>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}             