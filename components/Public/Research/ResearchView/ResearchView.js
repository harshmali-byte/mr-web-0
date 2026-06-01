import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Breadcrumbs, Link, Paper, Grid, Container, Button, Modal } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { LocalStorage } from '../../../Common/Commons';
import HomeIcon from '@mui/icons-material/Home';
import { ApiHandler } from '../../../Api/ApiHandler';
import { OrgInfo, LocalStorageKeys, RobotIndexes } from '../../../Common/Constants';
import dynamic from 'next/dynamic';
import styles from './Summary/ResearchSummaryView.module.css';

// SSR Components
const ResearchSummaryView = dynamic(() => import('./Summary/ResearchSummaryView'));
const ResearchHeaderView = dynamic(() => import('./ResearchHeaderView'));
const ResearchSegments = dynamic(() => import('./Summary/ResearchSegments'));
const ResearchViewSeo = dynamic(() => import('./ResearchViewSeo'));

const StickyRequestActions = dynamic(() => import('../../../Common/StickyCallToActions/StickyRequestActions'));
const ResearchRequestQuery = dynamic(() => import('../Request/ResearchRequestQuery'));
const LinkedInVishal = dynamic(() => import('../../../Common/SocialCards/LinkedIn/LinkedInVishal'));
const ResearchInfoView = dynamic(() => import('./ResearchInfoView'));

export default function ResearchView({ researchMetaUrl, research }) {
    const [showTableOfContent, setShowTableOfContent] = useState(false);
    const [tableOfContent, setTableOfContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showStickyRequest, setShowStickyRequest] = useState(false);

    useEffect(() => {
        let localData = LocalStorage.GetData(LocalStorageKeys.RequestFormFilled);

        if (localData && JSON.parse(localData).findIndex(s => s.reportId === research.Id && s.requestType === 'downloadSample') > -1) {
            setShowModal(false);
            return;
        }

        setTimeout(() => {
            setShowModal(true);
        }, 30000)
    }, [])

    function AddCommonTags() {
        return (
            <>
                {research.MetaTitle && <title>{research.MetaTitle}</title>}
                {research.MetaDescription && <meta name="description" content={research.MetaDescription} />}
                {research.MetaTags && <meta name="keywords" content={research.MetaTags} />}
                {research.CanonicalUrl && <link rel="canonical" href={research.CanonicalUrl} />}
            </>
        )
    }

    function AddOgTags() {
        return (
            <>
                <meta property="og:site_name" content={OrgInfo.FullName} />
                <meta property="og:locale" content="en_us" />
                <meta property="og:type" content="article" />
                {research.MetaTitle && <meta property="og:title" content={research.MetaTitle} />}
                {research.MetaDescription && <meta property="og:description" content={research.MetaDescription} />}
                {research.CanonicalUrl && <meta property="og:url" content={research.CanonicalUrl} />}
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}OGTag.png`} />
            </>
        )
    }

    function AddTwitterTags() {
        return (
            <>
                {research.MetaTitle && <meta name="twitter:title" content={research.MetaTitle} />}
                {research.MetaDescription && <meta name="twitter:description" content={research.MetaDescription} />}
                {research.MetaDescription && <meta name="twitter:card" content={research.MetaDescription} />}
                {research.CanonicalUrl && <meta name="twitter:url" content={research.CanonicalUrl} />}
                <meta name="twitter:site" content="@BrandEssenceMR" />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}TwitterTag.png`} />
            </>
        )
    }

    function addHeaders() {
        return (
            <Head>
                {AddCommonTags()}
                {AddOgTags()}
                {AddTwitterTags()}

                <meta name="robots" content={RobotIndexes[research.RobotIndex || 0].title} />
            </Head>
        )
    }

    if (!research) {
        return null;
    }

    return (
        <>
            {addHeaders()}
            <Box className={styles[`Research_${process.env.NEXT_PUBLIC_ORG}`]}>
                <Box sx={{ p: '0 30px 5px 30px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon sx={{ mt: '0.3rem' }} /></Link>
                        <Link underline="hover" color="inherit" href="/Categories" target="_blank">Industry</Link>
                        <Link underline="hover" color="inherit" href={`/Category/${research.CategoryUrl}`} target="_blank">{research.Category}</Link>
                        <Link underline="none" color="text.primary">{research.PostKey ? research.PostKey : researchMetaUrl}</Link>
                    </Breadcrumbs>
                </Box>

                {
                    showModal && <Modal
                        open={showModal}
                        onClose={(e, reason) => { if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') { setShowModal(false) } }}
                        aria-labelledby="Download free sample poupup"
                        aria-describedby="Download free sample poupup"
                        sx={{ overflow: 'auto' }}
                    >
                        <Box>
                            <ResearchRequestQuery research={research} requestType="downloadSample" onCloseModal={(visibility) => { setShowModal(visibility); setShowStickyRequest(true); }} />
                        </Box>
                    </Modal>
                }

                <Box sx={{ p: '10px 30px' }}>
                    <ResearchHeaderView Research={research} setTocVisible={setShowTableOfContent} />
                    {/*<Box sx={{ display: 'flex', mt: 2 }} >
                    <ButtonGroup variant='text' color='primary'>
                        <Button requesttype='requestEnquiry' onClick={onRequestClick}>Enquire</Button>
                        <Button requesttype='requestSample' onClick={onRequestClick}>Request Sample</Button>
                        <Button requesttype='requestCustomization' onClick={onRequestClick}>Request Customization</Button>
                        <Button requesttype='requestBuy' onClick={onRequestClick}>Request Buy</Button>
                        <Button requesttype='downloadSample' onClick={onRequestClick}>Download Sample</Button>
                        <Button requesttype='requestMethodology' onClick={onRequestClick}>Request Methodology</Button>
                        <Button requesttype='requestMarketShares' onClick={onRequestClick}>Request Market Shares</Button>
                        <Button requesttype='requestTitle' onClick={onRequestClick}>Request Title</Button>
                    </ButtonGroup>
                </Box>*/}
                    {
                        showTableOfContent
                            ? <ResearchInfoView Research={research} tableOfContent={tableOfContent} setTableOfContent={setTableOfContent} InfoType="TableOfContents" />
                            : <ResearchSummaryView Research={research} fetchImageApi={ApiHandler.ApiUrls.Research.GetImage} />
                    }
                </Box>
                <Container sx={{ mt: 10, mb: 3 }}>
                    <Grid container spacing={5} sx={{ display: 'flex' }}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ pl: { xs: 0, sm: 10, md: 0 }, pr: { xs: 0, sm: 10, md: 0 }, display: 'flex', justifyContent: { md: 'flex-end' } }}>
                                <LinkedInVishal />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item container sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center' }}>
                                <Grid item>
                                    <Image src="/Research/BookAppointment.png" width={100} height={100} loading="lazy" alt='Book Appointment' />
                                </Grid>
                                <Grid item>
                                    <Button href={`https://calendly.com/vishalsawant/analyst-call-with-brandessence-market-research`} target="_blank" variant='contained' color="themeColor">Book 15 min Free Analyst Call</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Container sx={{ mt: 3, mb: 3 }}>
                    <ResearchSegments Research={research} />
                </Container>
                <ResearchViewSeo research={research} />
                {showStickyRequest && <StickyRequestActions research={research} requestType="requestMethodology" />}
            </Box>
        </>
    )
}