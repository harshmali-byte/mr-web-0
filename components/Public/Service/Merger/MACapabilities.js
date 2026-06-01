import React from 'react';
import { Grid, Box, Paper, Typography, Container } from "@mui/material";
import capabilitiesData from './OurCapabilities.json';
import HomeSectionTitle from '../../Home/HomeSectionTitle';
import Image from 'next/image';

export default function MACapabilities() {
    return (
        <Box>
            <Container sx={{ mb: 5 }}>
                <Box sx={{ pb: 4, pt: 4 }}>
                    <HomeSectionTitle title="OUR" focusTitle="CAPABILITIES" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                </Box>
                <Grid container spacing={5} sx={{ display: 'flex' }}>
                    {
                        capabilitiesData.map(capability => {
                            return (
                                <Grid item xs={12} sm={6} md={6} lg={4} key={capability.id} sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Paper elevation={3} sx={{
                                            pt: 0.5, pb: 0.5, pl: 2, pr: 2, display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', borderRadius: 10, width: '90%', mb: -2, zIndex: 1
                                        }}>
                                            <Image src={`/Services/M_A/OurCapabilities/${capability.image}`} alt={capability.title} height='20px' width='20px' />
                                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', ml: 1 }}>{capability.title}</Typography>
                                        </Paper>
                                        <Paper elevation={3} sx={{ p: 3, height: '100%' }} >
                                            <Typography variant='body1'>{capability.description}</Typography>
                                        </Paper>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </Box>
    )
}             