import React from 'react';
import Head from 'next/head';
import { Grid, Breadcrumbs, Link, Paper, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ContactInfo = dynamic(() => import('./ContactInfo'));
const ContactLocation = dynamic(() => import('./ContactLocation'));
const ContactForm = dynamic(() => import('./ContactForm'));

export default function Contact() {

    function addHeaders() {
        return (
            <Head>
                <meta name="robots" content='index, follow' />
            </Head>
        )
    }

    return (
        <Box sx={{ mt: 3 }}>
            {addHeaders()}
            <Paper elevation={0}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                    <Link underline="none" color="inherit">Contact us</Link>
                </Breadcrumbs>
            </Paper>

            <Grid container sx={{ mt: 5, mb: 5 }}>
                <Grid container item xs={12} md={4} rowSpacing={3}>
                    <Grid item xs={12}>
                        <ContactInfo />
                    </Grid>
                    <Grid item xs={12}>
                        <ContactLocation />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ContactForm />
                </Grid>
            </Grid>
        </Box>
    )
}