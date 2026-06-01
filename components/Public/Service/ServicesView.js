import React from 'react';
import Head from 'next/head';
import { Grid, Box, Paper, Typography, Button, Avatar, Link, Container, Divider, Breadcrumbs } from "@mui/material";
import industryLeadData from './industryLead.json';
import servicesData from './consultingServices.json';
import Image from 'next/image';
import styles from './service.module.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import ScrollToElement from '../../Common/ScrollToElement';
import { OrgInfo } from '../../Common/Constants';
import dynamic from 'next/dynamic';

// SSR Components
import HomeSectionTitle from '../Home/HomeSectionTitle.js';
import ServiceCaseStudy from './ServiceCaseStudy';
import Service3DFramework from './Service3DFramework';
import ServiceRequest from './ServiceRequest';

// const HomeSectionTitle = dynamic(() => import('../Home/HomeSectionTitle.js'));
// const ServiceCaseStudy = dynamic(() => import('./ServiceCaseStudy'));
// const Service3DFramework = dynamic(() => import('./Service3DFramework'));
// const ServiceRequest = dynamic(() => import('./ServiceRequest'));

const avatarStyle = {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    mb: -2,
    p: 2
}

export default function ServicesView() {

    function addHeaders() {
        return (
            <Head>
                <title>Develop a Winning Go-to-Market Strategy with Our Expert Assistance</title>

                {
                    process.env.NEXT_PUBLIC_ORG === 'MR'
                        ? <meta name="robots" content='index, follow' />
                        : <meta name="robots" content='noindex, follow' />
                }
                <meta name="description" content="Maximize your market impact with our comprehensive Go-to-Market strategy services. Our experts will work with you to understand your target audience, market trends, and competition, and develop a strategy tailored to your unique business needs. Contact us today to start your journey to success." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}Services`} />
            </Head>
        )
    }
    return (
        <Box>
            {addHeaders()}
            <Container>
                <Paper elevation={0} sx={{ pl: 2, pr: 2 }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                        <Link underline="none" color="inherit">Consulting</Link>
                    </Breadcrumbs>
                </Paper>
            </Container>
            <Box className={[styles.frontImage]} sx={{ p: 1 }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Grid item xs={12} md={8} lg={6} xl={5}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', pt: 4 }}>
                                {OrgInfo.FullName} and Consulting Solutions
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={6} lg={5} xl={4} sx={{ mt: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant='p'>
                                Enhancing every element of your competitive and market intelligence to deliver top and bottom-line growth
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button onClick={(event) => ScrollToElement(event, '#requestform')} sx={{ cursor: 'pointer' }} variant='contained' color="themeColor" >
                                Request a Proposal
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Container sx={{ mb: 5 }}>
                <Box sx={{ pb: 4, pt: 4 }}>
                    <HomeSectionTitle title="CONSULTING" focusTitle="SERVICES" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                </Box>
                <Grid container spacing={5} sx={{ display: 'flex' }}>
                    {
                        servicesData.map(service => {
                            return (
                                <Grid item xs={12} md={6} lg={4} key={service.id} sx={{ mt: 1, mb: 1, display: 'flex' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Avatar sx={avatarStyle}>
                                            <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Services/${service.image}`} alt={service.title} height='60px' width='60px' />
                                        </Avatar>

                                        <Paper elevation={3} sx={{ textAlign: 'center', p: 3, height: '100%' }} >
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 3, mt: 2 }}>{service.title}</Typography>
                                            <Typography variant='body1'>{service.description}</Typography>
                                        </Paper>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

            <Divider />

            <Container sx={{ mb: 1 }}>
                <Box sx={{ pb: 4, pt: 4 }}>
                    <HomeSectionTitle title="INDUSTRY LEADING" focusTitle="MARKET INSIGHTS" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                </Box>
                <Grid container spacing={5} sx={{ display: 'flex' }}>
                    {
                        industryLeadData.map(industryLead => {
                            return (
                                <Grid item xs={12} md={4} lg={4} key={industryLead.id} sx={{ mt: 1, mb: 1, display: 'flex' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', transition: 'all 2s', ':hover': { transform: 'scale(1.1)' } }}>
                                            <Image src={`/Services/${industryLead.image}`} alt={industryLead.title} height='180px' width='200px' />
                                        </Box>

                                        <Box sx={{ m: 3, textAlign: 'center' }}>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{industryLead.title}</Typography>
                                            <Typography variant='p'>{industryLead.description}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

            <Divider />
            <ServiceCaseStudy />
            <Service3DFramework />
            <ServiceRequest requestType="RfqRequest" />
        </Box>
    )
}