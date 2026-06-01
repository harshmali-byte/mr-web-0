import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Grid, Box, Paper, Typography, Link, Container, Divider, Breadcrumbs, Card, CardContent } from "@mui/material";
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import styles from './pricing.module.css';
import HomeSectionTitle from '../Home/HomeSectionTitle';
import PriceData from './pricing.json';
import customerBenefits from './customerBenefits.json';
import PricePlan from './PricePlan';
import HomeTrusted from '../Home/HomeTrusted';
import PricingCompleteSolution from './PricingCompleteSolution';
import { ApiHandler } from '../../Api/ApiHandler';
import { Toast, Loader } from '../../Common/Commons';
import { APIMessages } from '../../Common/Constants';

export default function PricingView({ postId }) {
    const [IsLoading, setIsLoading] = useState(true);
    const [ResearchModel, setResearchModel] = useState(null);
    const [ToastMessage, setToastMessage] = useState(null);

    let postAbortController = new AbortController();

    useEffect(() => {
        if (!postId || parseInt(postId) <= 0) {
            setIsLoading(false);
            return;
        }

        fetchPost();

        return (() => {
            postAbortController.abort();
        })
    }, [postId])

    function fetchPost() {
        setIsLoading(true);
        let model = new Object();
        model.Id = postId;
        model.IsSummaryRequired = false;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.Research.GetDetails, postAbortController)
            .then(
                (result) => {
                    if (postAbortController.signal.aborted) {
                        setIsLoading(false);
                        return;
                    }

                    let message;
                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            setResearchModel(result.Data);
                        }
                        else {
                            message = { Message: result.Message || 'Fail to fetch reasearch post', Severity: 'error' };
                        }
                    }
                    else {
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };
                    }

                    setToastMessage(message);
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoading(false);
                    setToastMessage({ Message: APIMessages.APIExceptionMessage, Severity: 'error' });
                    console.log(error);
                }
            )
    }

    function addHeaders() {
        return (
            <Head>
                <meta name="robots" content='index, follow' />
                {
                    ResearchModel && ResearchModel.PostKey
                        ? <title>{`Price_${ResearchModel.PostKey}`}</title>
                        : <title>Price_HomePage</title>
                }

            </Head>
        )
    }

    if (IsLoading) {
        return (
            <Loader />
        )
    }

    return (
        <Box>
            {addHeaders()}
            {
                ToastMessage ?
                    <Toast open={true} message={ToastMessage.Message} severity={ToastMessage.Severity} onHide={() => setToastMessage(null)} />
                    : null
            }
            <Container>
                <Paper elevation={0} sx={{ pl: 2, pr: 2 }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                        <Link underline="none" color="inherit">Pricing</Link>
                    </Breadcrumbs>
                </Paper>
            </Container>

            <Box className={[styles.frontImage]} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box>
                    {
                        ResearchModel && ResearchModel.PostKey
                            ? <Typography variant="h4" sx={{ textAlign: 'center' }}>{ResearchModel.PostKey}</Typography>
                            : null
                    }
                    <HomeSectionTitle title="REPORT PURCHASE" focusTitle="OPTIONS" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                    <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5, p: 2 }}>
                        <Grid item xs={12} lg={5}>
                            <Typography sx={{ textAlign: 'center' }}>
                                Member can access Global and Country level reports along with newly published COVID-19 Reports, 10,000+ new emerging market reports
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ pb: 5 }}>
                    <Container>
                        <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={5}>
                            {
                                PriceData.map(price => {
                                    return <PricePlan key={price.id} price={price} researchModel={ResearchModel} />
                                })
                            }
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Box sx={{ mt: 5, mb: 5 }}>
                <Box item xs={12} sx={{ mb: 5 }}>
                    <HomeSectionTitle title="BENEFITS FOR" focusTitle="OUR CUSTOMERS" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                </Box>
                <Container>
                    <Grid container sx={{ display: 'flex' }}>
                        {
                            customerBenefits.map(benefit => {
                                return (
                                    <Grid key={benefit.id} item xs={12} sm={6} md={4} lg={3}>
                                        <Card elevation={0}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Pricing/${benefit.image}`} height="40px" width="40px" alt={benefit.title} />
                                                </Typography>
                                                <Typography variant="h5" component="div" gutterBottom sx={{ height: 70, display: 'flex', alignItems: 'center' }}>
                                                    {benefit.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {benefit.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Box>
            <Divider />
            <PricingCompleteSolution postId={ResearchModel && ResearchModel.Id ? ResearchModel.Id : null} />
            <HomeTrusted />
        </Box>
    )
}