import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Brightness1Icon from '@mui/icons-material/Brightness1';

const OurVM = dynamic(() => import('./OurVM'));
const AboutOrgValues = dynamic(() => import('../AboutOrgValues'));
const AboutOrgValue = dynamic(() => import('../AboutOrgValue'));

export default function OurVmV() {
    const theme = useTheme();

    return (
        <Grid container columnSpacing={{ xs: 0, md: 8 }}>
            <Grid item container xs={12} md={4} sx={{ p: 3, pr: 10, backgroundColor: theme.palette.secondary.main }}>
                <Grid item xs={12}>
                    <OurVM title="Our Vision" imageName="Vision" description="Empowering business and individual's decision-making process through cost-effective market intelligences." />
                </Grid>
                <Grid item xs={12} sx={{ mt: 5 }}>
                    <OurVM title="Our Mission" imageName="Mission" description="To extend statistical assistance to expansion plans and strategies of businesses through crisp market trends and forecasts. To acquire, curate and offer analytical reports that actively aid decision-making processes in enterprises that aim to achieve market dominance" />
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container>
                    <Grid item container xs={12} sx={{ mt: { xs: 5, md: 0 } }}>
                        <Grid item container xs={12} sm={2} sx={{ position: 'relative' }}>
                            <Grid item xs={12} sx={{ zIndex: 1, mt: 2 }} >
                                <Image src={`/${process.env.NEXT_PUBLIC_ORG}/AboutUs/Values.png`} loading="lazy" width={70} height={70} alt='Values' />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                <Brightness1Icon sx={{ color: theme.palette.secondary.main, position: 'absolute', left: 25, top: 0, fontSize: 60 }} />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} sm={9}>
                            <Grid item xs={12}><Typography variant='h4' component='span'>Our Values</Typography></Grid>
                            <Grid item xs={12}><Typography variant='span' component='span' sx={{ color: '#747579' }}><AboutOrgValue /></Typography></Grid>
                        </Grid>
                    </Grid>
                    <AboutOrgValues />
                </Grid>
            </Grid>
        </Grid>
    )
}