import React from 'react';
import { Box, Typography, Grid, Button, List, Avatar, Container, Link, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { OrgInfo, Contacts } from '../../Common/Constants';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const NewsletterSubscribe = dynamic(() => import('../../Common/Subscribe/NewsletterSubscribe'));

export default function PublicFooter() {
    const theme = useTheme();

    function BuildLi(text, url) {
        return (
            <ListItem>
                <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.primary.main }}>
                    <ChevronRightIcon />
                    <Link href={url} target="_blank" underline='hover' sx={{ '&.MuiLink-underlineHover:hover': { color: theme.palette.info.main } }} >{text}</Link>
                </Box>
            </ListItem>
        )
    }

    function BuildContactLi(text) {
        return (
            <Link href={`tel:${text}`} target="_blank" underline='hover' sx={{ display: 'flex', alignItems: 'center', '&.MuiLink-underlineHover:hover': { color: theme.palette.info.main } }} >{text}</Link>
        )
    }

    function BuildFollowIcon(icon, title, url) {
        return (
            <Avatar alt={title} src={`/PublicLayout/Footer/${icon}`} sx={{
                backgroundColor: theme.palette.primary.main, p: 1, mr: 1,
                cursor: 'pointer',
                '&.MuiAvatar-root:hover': {
                    backgroundColor: theme.palette.themeColor.main
                }
            }} onClick={() => window.open(url)} />
        )
    }

    return (
        <Grid item xs={12} sx={{ mt: 0 }}>
            <Box sx={{ mb: { xs: -4, sm: -6, md: -4 } }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={8} md={8} lg={6} xl={5} sx={{
                        backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, display: 'flex',
                        justifyContent: 'space-around', alignItems: 'center', p: 2, borderRadius: { xs: 0, sm: 10 }, zIndex: { xs: 0, sm: 5 },
                        mt: { sm: 4, md: 5 }
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: { xs: 'center', md: 'space-around' },
                            flex: 1, alignItems: 'center'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalPhoneIcon sx={{ mr: '0.5rem' }} />
                                <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>
                                    {Contacts.UK.Contact}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ mr: '0.5rem' }} />
                                <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>
                                    {OrgInfo.SalesEmail}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Grid item container spacing={3} sx={{ backgroundColor: '#E8E8E8', p: 5, }} >
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography sx={{ color: theme.palette.primary.main, mb: 1 }}>We are always looking to hire talented individuals with equal and extraordinary proportions of industry expertise, problem solving ability and inclination interested? please email us <Link sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }} href={`mailto:hr@brandessenceresearch.com`}>hr@brandessenceresearch.com</Link></Typography>
                    <Button variant="contained" disableElevation color="success" href={`mailto:hr@brandessenceresearch.com`}>JOIN US</Button>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>FIND ASSISTANCE</Typography>
                    <List dense>
                        {BuildLi('FAQ', '/FAQ')}
                        {BuildLi('Terms & Conditions', '/TnC')}
                        {BuildLi('Disclaimer', '/Disclaimer')}
                        {BuildLi('Privacy Policy', '/PrivacyPolicy')}
                        {BuildLi('Refund Policy', '/RefundPolicy')}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}><LocationOnIcon sx={{ fontSize: 18, mr: 1 }} /> LONDON OFFICE</Typography>
                    <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{`${OrgInfo.FullName} and Consulting Pvt ltd.`}</Typography>
                    <Typography sx={{ color: theme.palette.primary.main }}>{Contacts.UK.Address}</Typography>
                    <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mt: 2, mb: 2 }} variant="body1">FOLLOW US</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {BuildFollowIcon('twitter_White.png', 'Twitter', 'https://twitter.com/BrandEssenceMR')}
                        {BuildFollowIcon('Facebook_White.png', 'Facebook', 'https://www.facebook.com/Brandessence-Market-Research-and-Consulting-Pvt-ltd-1557019054395026/?modal=admin_todo_tour')}
                        {BuildFollowIcon('Linkedin_white.png', 'LinkedIn', 'https://www.linkedin.com/company/brand-essence-market-research-and-consultancy')}
                        {BuildFollowIcon('Skype_White.png', 'Skype', 'skype:live:61876c38b49450fb?chat')}
                        {BuildFollowIcon('youtube.png', 'YouTube', 'https://www.youtube.com/channel/UC52A6TBnNArOacAQ8UjsaMA')}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}><LocalPhoneIcon size="small" sx={{ fontSize: 18, mr: 1 }} /> CONTACT US</Typography>
                    {BuildContactLi(`${Contacts.US.Contact} - ${Contacts.US.Title}`)}
                    {BuildContactLi(`${Contacts.UK.Contact} - ${Contacts.UK.Title}`)}
                    {BuildContactLi(`${Contacts.IN.Contact} - ${Contacts.IN.Title}`)}
                    <Box sx={{ mt: 2 }}>
                        <NewsletterSubscribe />
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ backgroundColor: theme.palette.primary.main, p: 1 }}>
                <Container>
                    <Grid container spacing={1} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', aligntItems: 'center' }}>
                            <Typography sx={{ color: '#fff', textAlign: 'center' }}>
                                &#169; Copyright {new Date().getFullYear()}-{format(new Date().setFullYear(new Date().getFullYear() + 1), 'yy')} {OrgInfo.FullNamePvtLtd}. All Rights Reserved | Designed by {OrgInfo.Name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center', aligntItems: 'center' }}>
                            <Box sx={{ justifyContent: 'center', aligntItems: 'center', width: { xs: 320, sm: 420, md: 520 }, height: { xs: 30, sm: 40, md: 50 }, position: 'relative' }}>
                                <Image src="/PublicLayout/Footer/PaymentModes.png" loading="lazy" layout='fill' alt="PaymentModes" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Grid>
    )
}