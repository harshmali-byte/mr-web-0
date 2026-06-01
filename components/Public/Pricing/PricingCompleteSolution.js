import React from 'react';
import { Grid, Box, Typography, Button, Container } from "@mui/material";
import Image from 'next/image';
import styles from './pricing.module.css';

export default function PricingCompleteSolution({ postId }) {
    if (!postId) {
        return null
    }

    return (
        <Box>
            <Box className={[styles.frontImage]}>
                <Container>
                    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
                        <Grid container spacing={10} sx={{ mb: 10 }}>
                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src='/Pricing/RMPricingPage.png' height="450px" width="650px" alt="Global Market Graph" />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                                        A RESULT OF YEARS OF PRACTICE
                                    </Typography>
                                    <Typography variant='h5'>
                                        Make sure the report is backed
                                    </Typography>
                                    <Typography variant='h5' color='info'>
                                        by standard research methodology
                                    </Typography>
                                    <Typography variant='h5'>
                                        before purchasing!
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', mt: 3 }}>
                                    <Button href={`/requestMethodology/PostId/${postId}`} target="_blank" variant='contained' color='themeColor'
                                        startIcon={<Image src="/Research/pdf.png" width={20} height={20} loading="lazy" alt='Methodology' />}>Request Methodology</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}