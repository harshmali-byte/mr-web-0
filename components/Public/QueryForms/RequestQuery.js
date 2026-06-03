import React from 'react';
import { format } from 'date-fns';
import { Box, CardContent, Tooltip, Divider, Grid, List, ListItem, ListItemText, Typography, Card, Paper, Container, Link } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { Loader, LogoView } from '../../Common/Commons';
import CircleIcon from '@mui/icons-material/Circle';
import dynamic from 'next/dynamic';
// import ResearchSegments from '../Research/ResearchView/Summary/ResearchSegments';

const RequestQueryForm = dynamic(() => import('./RequestQueryForm'));
const HubSpotSampleForm = dynamic(() => import('./HubSpotSampleForm'));
const LinkedInVishal = dynamic(() => import('../../Common/SocialCards/LinkedIn/LinkedInVishal'));
const LinkedInAjay = dynamic(() => import('../../Common/SocialCards/LinkedIn/LinkedInAjay'));
const ResearchSegments = dynamic(() => import('../Research/ResearchView/Summary/ResearchSegments'));

// Request types whose form is handled by HubSpot (the "view/free sample" flow).
const HUBSPOT_REQUEST_TYPES = ['requestsample'];

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: '100%',
    }
});

export default function RequestQuery({ requestType, postId, research }) {
    const theme = useTheme();
    const useHubSpotForm = requestType && HUBSPOT_REQUEST_TYPES.includes(requestType.toLowerCase());

    function reportDetailListItem(label, text) {
        return (
            <ListItem dense={true} sx={{ pt: 0, pb: 0 }}>
                <ListItemText sx={{ pt: 0, pb: 0, mt: 0, mb: 0 }}>
                    <CircleIcon sx={{ pr: 1, pt: 1 }} fontSize="24" />{label}: {text}
                </ListItemText>
            </ListItem>
        )
    }

    function buildReportDetails() {
        if (!research) {
            return (
                <Grid item>
                    <Loader />
                </Grid>
            )
        }

        return (
            <Grid item container xs={12} sx={{ p: 2, pt: 8 }} spacing={5}>
                <Grid item xs={12}>
                    <Box sx={{ p: 2, backgroundColor: 'transparent' }}>
                        <Link target="_blank" underline='none' sx={{ fontSize: 26, color: '#000' }}
                            href={`/${research.CategoryUrl}/${research.MetaUrl ? research.MetaUrl : research.PostKey}`}>{research.PostKey}
                        </Link>
                        <NoMaxWidthTooltip title={research.Name} >
                            <Typography component="h2" variant="h2"
                                sx={{ color: '#000', fontSize: 16, WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }} >
                                {research.Name}
                            </Typography>
                        </NoMaxWidthTooltip>
                        <Divider sx={{ mt: 2, mb: 2, backgroundColor: theme.custom.borderColor, width: { xs: '100%', lg: '100%' }, height: 3 }} />

                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <Grid item xs={3} md={1.3} sx={{ display: 'flex', position: 'relative' }}>
                                <Image src="/Research/PopupImage.png" alt='Report' loading="lazy" layout="fill" />
                            </Grid>
                            <Grid item xs={9} md={10.7}>
                                <List>
                                    {reportDetailListItem('Product Id', research.Code)}
                                    {reportDetailListItem('Pages', research.NumberOfPages)}
                                    {reportDetailListItem('Publish Date', research.PublishDate ? format(new Date(research.PublishDate), 'MMM-yyyy') : '')}
                                    {reportDetailListItem('Category', research.Category)}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid item container xs={12} md={12} lg={10} spacing={10} sx={{ position: 'relative', pb: 2 }}>
                        <Box sx={{ backgroundColor: '#EFEFEF', borderRadius: '50%', bottom: 0, right: { xs: '15%', md: 40 }, position: 'absolute', height: '65%', width: { xs: '60%', md: '45%' }, zIndex: 0 }}></Box>
                        <Grid item container spacing={1} sx={{ zIndex: 1 }} xs={12} sm={8} lg={10}>
                            <LinkedInVishal lgW={11} />
                            <LinkedInAjay lgW={11} />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: 'center' }}>
                            <Box sx={{ position: 'relative', width: 150, height: 200 }}>
                                <Image src="/GDPR/GDPR.png" alt='GDPR' loading="lazy" layout="fill" />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    if (!research) {
        // navigate to error page
        return (
            <div>
                <Paper elevation={0} sx={{ p: '5px 30px' }}>
                    <Loader rounded showModal={true} />
                </Paper>
            </div>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card sx={{ borderRadius: 0 }} elevation={0}>
                    <Box className="headerImage" sx={{ height: '400px', position: 'absolute', width: '100%' }}></Box>
                    <CardContent sx={{ pl: { xs: 2, lg: 10 }, pr: { xs: 2, lg: 10 }, position: 'relative' }}>
                        <Grid container>
                            <Grid item container xs={12} lg={7}>
                                {buildReportDetails()}
                            </Grid>
                            <Grid item xs={12} lg={5}>
                                {
                                    useHubSpotForm
                                        ? <HubSpotSampleForm />
                                        : <RequestQueryForm requestType={requestType} postId={postId} />
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{}}>
                <Container>
                    <Box sx={{ pt: { xs: 2, lg: 10 }, pb: { xs: 2, lg: 10 } }}>
                        {
                            research && research.Category
                                ? <LogoView category={research.Category} />
                                : null
                        }
                    </Box>
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{ mt: 5 }}>
                <Container>
                    <ResearchSegments Research={research} />
                </Container>
            </Grid>
        </Grid>
    )
}
