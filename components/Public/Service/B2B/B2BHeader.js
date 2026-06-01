import React from 'react';
import dynamic from 'next/dynamic';
import { Grid, Box, Typography, Container, Button } from "@mui/material";
import Image from 'next/image';
import ScrollToElement from '../../../Common/ScrollToElement';

const HomeOrgBanner = dynamic(() => import('../../Home/Banner/HomeOrgBanner'))

export default function B2BHeader() {
    return (
        <Box>
            <HomeOrgBanner />
            <Box sx={{ position: 'relative' }}>
                <Container>
                    <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, pb: 2, alignItems: 'center' }}>
                        <Grid item container xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
                            <Grid item xs={12} sx={{}}>
                                <Typography variant='h4' component="h1" sx={{ fontWeight: 'bold' }}>
                                    B2B Lead Generation Services
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ py: 2 }}>
                                <Typography variant='p'>
                                    We offer an all-inclusive solution to augment your B2B sales strategy, spanning from lead acquisition to appointment booking. Engage with a skilled sales expert to develop a sustainable and dependable pipeline for your business in a cost-effective pay per lead approach.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                <Button variant='contained' color="info" onClick={(event) => ScrollToElement(event, '#requestform')} sx={{ mt: 2 }}>
                                    Unlock your growth
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box sx={{
                                height: { xs: 460, md: 560 }, width: { xs: 460, md: 560 },
                                position: 'relative'
                            }}>
                                <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Services/B2BLead/Banner.gif`} layout='fill' alt='B2B Lead' />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}