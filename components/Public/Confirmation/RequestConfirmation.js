import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { Box, Grid, Typography, Container, Card, CardContent, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { SessionStorageKeys, RequestTypes } from '../../Common/Constants';
import { SessionStorage } from '../../Common/SessionStorage';
import DownloadIcon from '@mui/icons-material/Download';

const Loader = dynamic(() => import('../../Common/Loader'));
const LinkedInVishal = dynamic(() => import('../../Common/SocialCards/LinkedIn/LinkedInVishal'));
const LinkedInAjay = dynamic(() => import('../../Common/SocialCards/LinkedIn/LinkedInAjay'));

export default function RequestConfirmation({ requestType }) {
    const theme = useTheme();
    const [RequestFormType, setRequestFormType] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => {
        setModel(JSON.parse(SessionStorage.GetData(SessionStorageKeys.Request)));
    }, [])

    useEffect(() => {
        if (!requestType) {
            return;
        }

        let requestFormType = RequestTypes.find(f => f.name.toLowerCase() === requestType.toLowerCase());
        if (!requestFormType) {
            console.error('request Form Type is null');
            // navigate user to common error page
            return;
        }

        setRequestFormType(requestFormType);
    }, [requestType])

    function addHeaders() {
        if (!model || !model.Research) {
            return (
                <Head>
                    <meta name="robots" content='noindex, nofollow' />
                </Head>
            )
        }

        return (
            <Head>
                <meta name="robots" content='noindex, nofollow' />
                {
                    model.Research.PostKey
                        ? <title>{`Thankyou_${RequestFormType ? RequestFormType.requestText : 'Request'}_${model.Research.PostKey}`}</title>
                        : <title>{`Thankyou_${RequestFormType ? RequestFormType.requestText : 'Request'}`}</title>
                }
            </Head>
        )
    }

    function ShowSubMessage() {
        if (!RequestFormType) {
            return null
        }

        if (RequestFormType.id === 5 || RequestFormType.id === 22 || RequestFormType.id === 32 || RequestFormType.id === 33) {
            return "Our team will contact you shortly"
        }
        else if (RequestFormType.id === 30 || RequestFormType.popupId === 31) {
            return <Button href='/MR/Services/MAGuidebook.pdf' target="_blank" rel="noopener noreferrer" variant="contained" color="themeColor" startIcon={<DownloadIcon />} download>Download</Button>
        }
        else
            return "Our research experts will work on this and deliver it shortly."
    }

    function ShowSubTitle() {
        if (RequestFormType.id === 30 || RequestFormType.popupId === 31) {
            return 'Here is your guidebook!'
        }

        return `Your ${RequestFormType ? RequestFormType.requestText : 'request'} has been submitted successfully!`
    }

    function ShowVideo() {
        let vidUrl = '';

        if (RequestFormType.id === 30 || RequestFormType.popupId === 31) {
            vidUrl = '_xyqcMfCz-U';
        }
        else {
            vidUrl = 'VXZFbQc6S6A';
        }

        return <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${vidUrl}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: 'none' }}></iframe>
    }

    if (!RequestFormType) {
        return <Loader />
    }

    return (
        <Box sx={{ mt: 1 }}>
            {addHeaders()}
            <Container maxWidth='lg'>
                <Grid container sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                        <CheckCircleOutlineRoundedIcon sx={{ color: theme.palette.success.main, fontSize: 100 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h3' component='span'>Thank You!</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant='subtitle1' component='span' sx={{ color: "grey.500" }}>{ShowSubTitle()}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1' component='span' sx={{ color: "grey.500" }}>{ShowSubMessage()}</Typography>
                    </Grid>
                    <Grid item container xs={12} sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} md={6} sx={{ height: { xs: 200, sm: 400, md: 300 } }}>
                            <ShowVideo />
                        </Grid>
                    </Grid>
                    {
                        model && model.Research && model.Research.ResearchUrl
                            ? <Grid item xs={12} sx={{ mt: 5 }}>
                                <Button onClick={() => window.open(model.Research.ResearchUrl)} variant='contained'>Continue to view summary</Button>
                            </Grid>
                            : null
                    }
                </Grid>

                <Card elevation={0} sx={{ mt: 5 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' component='span'>If any query, feel free to contact our experts.</Typography>
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