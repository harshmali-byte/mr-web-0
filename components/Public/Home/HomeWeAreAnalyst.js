import React from 'react';
import { Box, Card, Grid, Container } from '@mui/material';
import Image from 'next/image';
import HomeSectionTitle from './HomeSectionTitle';
import HomeWeAreAnalystItem from './HomeWeAreAnalystItem';

export default function HomeWeAreAnalyst() {

    return (
        <Card elevation={5} sx={{ backgroundColor: '#E8E8E8', borderTopRightRadius: 80, borderBottomLeftRadius: 80, mt: 10, mb: 10 }}>
            <Container>
                <Grid container spacing={{ xs: 0, lg: 10 }}>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                        <Box sx={{ mb: 2, mt: 3 }}>
                            <Grid item container>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: "flex-end" }, alignItems: 'flex-end' }}>
                                    <Image src={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/QuoteEnd.png`} loading="lazy" layout='fixed' alt="Analyst" width={50} height={50} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: "flex-end" }, alignItems: 'flex-end' }}>
                                    <HomeSectionTitle title="We are" focusTitle="ANALYST" sxProps={{ alignItems: 'baseline' }} sxTitleProps={{ fontSize: 24, fontWeight: '400' }} />
                                    <HomeSectionTitle title="," sxTitleProps={{ fontSize: 24, fontWeight: '400' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <HomeSectionTitle title="not generalists" sxProps={{ justifyContent: { xs: 'center', lg: "flex-end" } }} sxTitleProps={{ fontSize: 24, fontWeight: '400' }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12} sx={{}}>
                            <HomeWeAreAnalystItem number={1} title="Contextualizing and interpreting your data." subtitle="" borderBottomWidth={1} />
                            <HomeWeAreAnalystItem number={2} title="Estimating and forecasting Data." subtitle="" borderBottomWidth={1} />
                            <HomeWeAreAnalystItem number={3} title="Transforming data and information into insights." subtitle="" borderBottomWidth={0} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Card>
    )
}