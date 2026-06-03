import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Button, Divider, Box } from '@mui/material';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../Auth/AuthContext';
import Image from 'next/image';
import { openHubSpotSample } from '../../../../lib/hubspotSample';

export default function ResearchHeaderView({ Research, setTocVisible }) {
    const theme = useTheme();
    const auth = useAuth();
    const [isSummary, setIsSummary] = useState(true);
    const [toggleInfoText, setToggleInfoText] = useState('View TOC');
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (!auth || !auth.authData) {
            return null;
        }
        setAuthenticated(true);
    }, [auth])

    function loadPostInfo() {
        if (isSummary) {
            setIsSummary(false);
            setToggleInfoText('Report Description');
            setTocVisible(true);
        }
        else {
            setIsSummary(true);
            setToggleInfoText('View TOC');
            setTocVisible(false);
        }
    }

    function onBuyClick(e) {
        window.open(`/Checkout?report_id=${Research.Id}`);
    }

    function onRequestClick(e) {
        let requestType = e.currentTarget.attributes['requesttype'].value;
        if (requestType && requestType.toLowerCase() === 'requestsample') {
            openHubSpotSample();
            return;
        }
        window.open(`/${requestType}/PostId/${Research.Id}`);
    }

    return (
        <Paper sx={{ p: { xs: 0, lg: 5 } }} elevation={0}>
            <Grid container sx={{ p: { xs: 0, lg: 1 } }} spacing={{ xs: 5, lg: 3 }}>
                <Grid item xs={12} lg={6} sx={{ pr: { xs: 0, lg: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <Paper elevation={0}>
                        <Grid container spacing={2} sx={{}}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component='h1' sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                                    {Research.PostKey}
                                </Typography>
                            </Grid>

                            {
                                Research.PostKey &&
                                <Grid item xs={12}>
                                    <Typography variant="h2" component='span' sx={{ fontSize: '18px', fontWeight: 'bold', color: theme.custom.greyText, letterSpacing: '1px' }}>
                                        {Research.PostKey} {Research.PostKey.trim().endsWith('Market') ? '' : 'Market'} Size, Share & Trends Analysis Report
                                    </Typography>
                                </Grid>
                            }

                            <Grid item xs={12} sx={{}}>
                                <Paper elevation={5} sx={{ p: 2 }}>
                                    <Typography variant="h2" component='h2' sx={{ fontSize: 13, color: theme.custom.textColor }}>
                                        {Research.Name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} sx={{ mt: 1, display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Button href={`/requestMethodology/PostId/${Research.Id}`} target="_blank" variant='contained' color='secondary' sx={{ mt: 1, fontWeight: 'bold' }}
                            startIcon={<Image src="/Research/pdf.png" width={20} height={20} loading="lazy" alt='Methodology' />}>Request Methodology</Button>
                        <Button href={`/downloadSample/PostId/${Research.Id}`} target="_blank" variant='contained' color='secondary' sx={{ mt: 1, fontWeight: 'bold' }}
                            startIcon={
                                <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Research/Download.gif`} width={20} height={20} loading="lazy" alt='Methodology' />
                            }>
                            Download Sample</Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6} sx={{
                    borderLeftStyle: { xs: 'none', lg: 'solid' },
                    borderLeftWidth: { xs: 0, lg: 3 },
                    borderLeftColor: { xs: 'transparent', lg: theme.palette.secondary.main }
                }}>
                    <Grid container spacing={{ xs: 5, sm: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={0}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='div' sx={{ fontSize: '18px', fontWeight: 'bold' }}>Published</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Report ID : </Typography>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Research.Code}</Typography>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Number of pages : </Typography>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Research.NumberOfPages}</Typography>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Published Date : </Typography>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Research.PublishDate ? format(new Date(Research.PublishDate), 'MMM yyyy') : null}</Typography>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Category : </Typography>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Research.Category}</Typography>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Delivery Timeline : </Typography>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>48 hrs</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button variant="contained" startIcon={
                                            <Image src="/Research/View.png" width={20} height={20} loading="lazy" alt='View' />
                                        } onClick={loadPostInfo} size="medium" color="themeColor" sx={{}}>{toggleInfoText}</Button>
                                        {
                                            authenticated
                                                ? <Button variant="contained"
                                                    startIcon={<EditIcon />}
                                                    href={`/Admin/Research/ResearchUpsert/${Research.Id}`}
                                                    target="_blank"
                                                    size="medium" color="themeColor"
                                                    sx={{ ml: 2 }}
                                                >
                                                    Edit
                                                </Button>
                                                : null
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', mb: 5 }}>
                                <Button href={`/Pricing/${Research.Id}`} variant="contained" size='large' color="highlightButton" sx={{ display: 'flex', flex: 1 }}
                                    startIcon={<Image src='/Research/Pricing.gif' width={30} height={30} loading="lazy" alt='Pricing' />} target="_blank">Pricing</Button>
                            </Box>
                            <Paper elevation={5} sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}><Button requesttype='requestBuy' onClick={onBuyClick} variant="contained" size='large' >Buy Now</Button></Grid>
                                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}><Button requesttype='requestBuy' onClick={onBuyClick} variant="contained" color="secondary" size='large' >Order by PO</Button></Grid>
                                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}><Button requesttype='requestSample' onClick={onRequestClick} variant="contained" color="themeColor" size='large' >Get a quote</Button></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}