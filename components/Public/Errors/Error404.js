import React from 'react';
import { Box, CardContent, Tooltip, Divider, Grid, List, ListItem, ListItemText, Typography, Card, Paper, Container, Link, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Contacts, OrgInfo } from '../../Common/Constants';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInVishal from '../../Common/SocialCards/LinkedIn/LinkedInVishal';
import LinkedInAjay from '../../Common/SocialCards/LinkedIn/LinkedInAjay';
import SearchReportSubMenu from '../Layout/Menu/SubMenus/Search/SearchReportSubMenu';

export default function Error404() {
    return (
        <Box sx={{ mt: 5, mb: { xs: 5, md: 2 } }}>
            <Grid container spacing={2}>
                <Grid item container xs={12} md={6} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h2' component="div" sx={{ fontSize: { xs: 40, md: 50 }, fontWeight: 'bold' }}>NO RESULTS?</Typography>
                        <Typography variant='h2' component="div" sx={{ fontSize: { xs: 40, md: 50 }, fontWeight: 'bold' }}>NO PROBLEM</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='p' component="p">Our team can find some tailored recommendations for you. They can help you navigate the market, or identify off-market options.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchReportSubMenu />
                    </Grid>
                    <Grid item xs={12}>
                        <Button href="/" variant="contained" color="secondary" size="large" sx={{ display: { xs: 'flex', md: 'inline-block' } }}>
                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Typography variant='span' component="span" sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}><HomeIcon sx={{ fontSize: 20, mr: 1 }} /></Typography>
                                <Typography variant='span' component="span">Return to home</Typography>
                            </Box>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={12}>
                        <Button size="large" variant='contained' color="info" href={`mailto:${OrgInfo.SalesEmail}`} sx={{ display: { xs: 'flex', md: 'initial' } }}>Get Recommendation</Button>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }} xs={12}>
                        <Typography variant='h5' component="p"><LocalPhoneIcon sx={{ fontSize: 30 }} /></Typography>
                        <Link variant='h5' underline='none' href={`tel:${Contacts.UK.Contact}`}>{Contacts.UK.Contact}</Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <LinkedInVishal />
                            <LinkedInAjay />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}