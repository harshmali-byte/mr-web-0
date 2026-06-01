import React from 'react';
import { Box, Button, Grid, Container, Typography } from '@mui/material';
import Image from 'next/image';
import HomeSectionTitle from './HomeSectionTitle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { OrgInfo } from '../../Common/Constants';

export default function HomeWhatWeDo() {
    return (
        <Box sx={{ marginTop: { xs: 4, sm: 0 }, p: { xs: 1, sm: 5 }, backgroundColor: '#FFFFFF' }}>
            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Box sx={{ flex: 1, position: 'relative' }}>
                            <Image src={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/HomeAboutUs.png`} loading="lazy" height={520} width={600} alt="About Us" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <HomeSectionTitle title="WHAT" focusTitle="WE DO" sxProps={{ justifyContent: { xs: 'center', md: 'flex-start' } }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Typography variant='body2' component="p" sx={{ lineHeight: 1.75 }}>
                                    Every successful strategy is supported by high-quality research. And this is what {OrgInfo.FullName} lives on. We provide in-depth and pertinent industry reports from around every domain and industries worldwide. Our analysts draw on economic, demographic, and market information to support organisations in making the best business decisions. At {OrgInfo.Name}, we help companies enhance their strategies by providing actionable insights. We use scientific research to investigate consumer views, perceptions, and expectations regarding an existing or proposed product or service launch. The brilliant minds at {OrgInfo.Name} have mastered the science of market research, across various industries and domains, using cutting-edge research tools to do so.
                                </Typography>
                                <Typography variant='body2' component="p" sx={{ lineHeight: 1.75, mt: 3 }}>
                                    Every single {OrgInfo.Name} report is a narrative in itself. Our crisp reports are to the point, provide actionable insights, highlight statistical data, include expert inferences and hard facts, and help businesses plan. {OrgInfo.Name} market reports, including industry research, data mining tools, and negotiation-level Q&As, can help you make more intelligent choices that benefit your company and its customers. Our 3 different delivery models will help you to see your brand grow in a different way. Each of the delivery model has its own speciality ranging from Full Access to Latest Infographic Statistics & Facts, Real-time Data Scraping, Snapshot View of 30,000+ reports. All these models ultimately focus on one thing — profound business results and ensure your brand growth.
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-start' }, mt: 2, mb: 2 }}>
                                <Button variant="text" href="/AboutUs" target="_blank" sx={{
                                    mt: { xs: 1, sm: 0 }, fontSize: 20, "&.MuiButton-root:hover": {
                                        bgcolor: "transparent"
                                    }
                                }} endIcon={<ChevronRightIcon sx={{ backgroundColor: '#E8E8E8', color: '#747579', borderRadius: 10, height: 30, width: 30 }} />}>
                                    Read more
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}