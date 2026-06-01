import React from 'react';
import { Box, Container, Breadcrumbs, Link, Typography, Grid, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import dynamic from 'next/dynamic';
import HomeIcon from '@mui/icons-material/Home';

const AboutOrgBanner = dynamic(() => import('./AboutOrgBanner'));

export default function AboutHeader() {
    return (
        <Box>
            <AboutOrgBanner />
            <Container sx={{ position: 'relative' }}>
                <Box sx={{ pt: 2 }} >
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{
                        '& .MuiBreadcrumbs-ol': {
                            flexWrap: 'inherit',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        },
                        '& .MuiBreadcrumbs-li:last-child': {
                            textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'
                        },
                    }}>
                        <Link underline="hover" href="/" target="_blank"><HomeIcon /></Link>
                        <Link underline="none" >About Us</Link>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ height: 635, display: 'flex', alignItems: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4' component='h1' sx={{ fontWeight: '600' }}>About Us</Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Typography variant='span' component='span' sx={{ fontSize: 20 }}>{`We are a full-service market research company providing a full-scale of marketing insight along with consultancy services`}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' color="themeColor" href="/ContactUs" size='large' target="_blank">Contact Us</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}