import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { Box, Grid, Typography, Container, Card, CardContent } from '@mui/material';
import BuyHeader from '../QueryForms/BuyHeader';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import LinkedInAjay from '../../Common/SocialCards/LinkedIn/LinkedInAjay';
import LinkedInVishal from '../../Common/SocialCards/LinkedIn/LinkedInVishal';
import { Prices, SessionStorageKeys } from '../../Common/Constants';
import { SessionStorage } from '../../Common/SessionStorage';

export default function BuyConfirmation() {
    const theme = useTheme();
    const [model, setModel] = useState(null);

    useEffect(() => {
        setModel(JSON.parse(SessionStorage.GetData(SessionStorageKeys.Request)));
    }, [])

    function getReportPrice() {
        let price = model.ReportPrice;
        if (!price) {
            if (model.PurchasePlan === 1) {
                price = model.Research.PriceSingleUser || Prices.SingleUser;
            }
            else {
                price = model.Research.PriceEnterprise || Prices.Corporate;
            }
        }
        return price;
    }

    function showTable() {
        if (!model) {
            return null;
        }

        return (
            <Card sx={{ mt: 5, border: 1, borderColor: "grey.500" }} elevation={1}>
                <CardContent sx={{ borderBottom: 1, borderBottomColor: "grey.500", textAlign: 'center' }}>
                    <Typography variant='h4' component='span' color="grey.500">Order Details</Typography>
                </CardContent>
                <CardContent sx={{ display: { xs: 'none', md: 'block' }, pt: 6, pl: 10, pr: 10, pb: 2 }}>
                    <Grid container>
                        <Grid item container xs={12}>
                            <Grid item xs={10}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>Product</Typography></Grid>
                            <Grid item xs={1} sx={{ textAlign: 'center' }}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>Items</Typography></Grid>
                            <Grid item xs={1} sx={{ textAlign: 'right' }}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>Price</Typography></Grid>
                        </Grid>
                        <Grid item container xs={12} sx={{ mt: 1, pt: 1 }}>
                            <Grid item xs={10}><Typography variant='span' component='span' sx={{}}>{model.Research.Name}</Typography></Grid>
                            <Grid item xs={1} sx={{ textAlign: 'center' }}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>1</Typography></Grid>
                            <Grid item xs={1} sx={{ textAlign: 'right' }}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>${getReportPrice()}</Typography></Grid>
                        </Grid>
                        <Grid item container xs={12} sx={{ borderTop: `3px solid ${theme.palette.secondary.main}`, mt: 2, pt: 2 }}>
                            <Grid item xs={11}><Typography variant='span' component='span' sx={{ color: 'grey.500', fontSize: 24 }}>Total</Typography></Grid>
                            <Grid item xs={1} sx={{ textAlign: 'right' }}><Typography variant='span' component='span' sx={{ color: 'grey.500', fontSize: 24, fontWeight: 'bold' }}>${getReportPrice()}</Typography></Grid>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardContent sx={{ display: { xs: 'block', md: 'none' }, pt: 3, pl: 2, pr: 2, pb: 2 }}>
                    <Grid container>
                        <Grid item container xs={12}>
                            <Grid item xs={12}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>Product:</Typography></Grid>
                            <Grid item xs={12}><Typography variant='span' component='span' sx={{}}>{model.Research.Name}</Typography></Grid>
                        </Grid>
                        <Grid item container xs={12} sx={{ mt: 1, pt: 1 }}>
                            <Grid item xs={6} sx={{}}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>Items:</Typography></Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>1</Typography></Grid>
                        </Grid>
                        <Grid item container xs={12} sx={{ mt: 1, pt: 1 }}>
                            <Grid item xs={6} sx={{}}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>Price:</Typography></Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant='span' component='span' sx={{ color: 'grey.500' }}>${getReportPrice()}</Typography></Grid>
                        </Grid>
                        <Grid item container xs={12} sx={{ borderTop: `3px solid ${theme.palette.secondary.main}`, mt: 2, pt: 2 }}>
                            <Grid item xs={6}><Typography variant='span' component='span' sx={{ color: 'grey.500', fontSize: 24 }}>Total</Typography></Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant='span' component='span' sx={{ color: 'grey.500', fontSize: 24, fontWeight: 'bold' }}>${getReportPrice()}</Typography></Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    function addHeaders() {
        if (!model || !model.Research) {
            return null;
        }

        return (
            <Head>
                <meta name="robots" content='noindex, nofollow' />
                {
                    model.Research.PostKey
                        ? <title>{`Purchase_${model.Research.PostKey}`}</title>
                        : <title>Purchase</title>
                }
            </Head>
        )
    }

    return (
        <Box sx={{ mt: 1 }}>
            {addHeaders()}
            <BuyHeader research={model ? model.Research : null} activeStep={2} />
            <Container maxWidth='lg'>
                <Grid container sx={{ textAlign: 'center', mt: 10 }}>
                    <Grid item xs={12}>
                        <Typography variant='h3' component='span' color="grey.500">ORDER CONFIRMED</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                        <CheckCircleOutlineRoundedIcon sx={{ color: theme.palette.success.main }} fontSize='large' />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h4' component='span' color="grey.500">Thank You!</Typography>
                    </Grid>
                    {
                        model
                            ? <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                                <Typography variant='subtitle1' component='span'>Your order <Typography variant='subtitle1' component='span' sx={{ fontWeight: 'bold' }}>#{model.Id}</Typography> has been placed</Typography>
                            </Grid>
                            : null
                    }
                </Grid>

                {showTable()}

                <Card sx={{ mt: 5 }} elevation={0}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' component='span' color="grey.500">FOR HELP</Typography>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}><LinkedInAjay /></Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}><LinkedInVishal /></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}