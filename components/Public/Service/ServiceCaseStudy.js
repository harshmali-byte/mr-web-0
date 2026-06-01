import React from 'react';
import Image from 'next/image';
import { Grid, Box, Paper, Typography, Link, Container } from "@mui/material";
import caseStudyData from './caseStudy.json';
import ScrollToElement from '../../Common/ScrollToElement';
// import dynamic from 'next/dynamic';
import HomeSectionTitle from '../Home/HomeSectionTitle';

// const HomeSectionTitle = dynamic(() => import('../Home/HomeSectionTitle'));

export default function ServiceCaseStudy() {


    return (
        <Container sx={{ mb: 5 }}>
            <Box sx={{ pb: 4, pt: 4 }}>
                <HomeSectionTitle title="CASE" focusTitle="STUDIES" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
            </Box>
            <Grid container spacing={2} columnSpacing={3} sx={{ display: 'flex', justifyContent: "center" }}>
                {
                    caseStudyData.map(caseStudy => {
                        return (
                            <Grid item xs={12} md={4} lg={3} key={caseStudy.id} sx={{ mt: 1, mb: 1, display: 'flex' }}>
                                <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Image src={`/Services/${caseStudy.image}`} alt={caseStudy.title} height='400px' width='800px' />
                                    </Box>
                                    <Box sx={{ p: 2 }}>
                                        <Box sx={{ textAlign: 'left', mb: 2 }}>
                                            <Typography variant="body2" component="p" sx={{ fontWeight: 'bold', mb: 2 }} >{caseStudy.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">{caseStudy.description}</Typography>
                                        </Box>
                                        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                                            <Link onClick={(event) => ScrollToElement(event, '#requestform')} color="inherit" sx={{ cursor: 'pointer' }}>Read Case Study</Link>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}