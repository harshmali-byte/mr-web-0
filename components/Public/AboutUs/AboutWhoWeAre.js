import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { OrgInfo } from '../../Common/Constants';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const BrandLogo = dynamic(() => import('../../Common/Logos/BrandLogo'));
const HomeSectionTitle = dynamic(() => import('../Home/HomeSectionTitle'));

export default function AboutWhoWeAre() {
    const [showMore, setShowMore] = useState(false);

    return (
        <Grid container>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' }, alignItems: 'center' }}>
                <BrandLogo logoWidth={240} logoHeight={250} />
            </Grid>
            <Grid item xs={12} md={8} sx={{ mt: { xs: 5, lg: 0 } }}>
                <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                        <HomeSectionTitle title="WHO" focusTitle="WE ARE" sxProps={{ justifyContent: { xs: 'center', md: 'flex-start' } }} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Typography variant='body2' component="p" sx={{ lineHeight: 1.75 }}>
                            Every successful strategy is supported by high-quality research. And this is what {OrgInfo.FullName} lives on. We provide in-depth and pertinent industry reports from around every domain and industries worldwide. Our analysts draw on economic, demographic, and market information to support organisations in making the best business decisions. {OrgInfo.FullName} has been providing industry information since 2017.
                        </Typography>

                        <Typography variant='body2' component="p" sx={{ mt: 2, lineHeight: 1.75 }}>
                            At {OrgInfo.Name}, we help companies enhance their strategies by providing actionable insights. We use scientific research to investigate consumer views, perceptions, and expectations regarding an existing or proposed product or service launch. A variety of factors influence the success of a product and service launch and it takes a scientific study of focus groups to understand their opinions, perceptions, and expectations. The brilliant minds at {OrgInfo.Name} have mastered the science of market research, across various industries and domains, using cutting-edge research tools to do so.
                        </Typography>
                    </Box>
                    <Box sx={{ display: showMore ? 'block' : 'none' }}>
                        <Typography variant='body2' component="p" sx={{ mt: 2, lineHeight: 1.75 }}>
                            {`Every single ${OrgInfo.Name} report is a narrative in itself. Our crisp reports are to the point, provide actionable insights, highlight statistical data, include expert inferences and hard facts, and help businesses plan. As industries are changing rapidly in today's world, they are not the same at all levels. Hence, we make sure to put together all the reports in the right light. ${OrgInfo.Name} market reports, including industry research, data mining tools, and negotiation-level Q&As, can help you make more intelligent choices that benefit your company and its customers.`}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-start' }, mt: 2, mb: 2 }}>
                        <Button variant="text" onClick={() => setShowMore(!showMore)} sx={{
                            mt: { xs: 1, sm: 0 }, fontSize: 20, "&.MuiButton-root:hover": {
                                bgcolor: "transparent"
                            }
                        }} endIcon={<ExpandCircleDownIcon sx={{ color: '#747579', height: 28, width: 28, transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)' }} />}>
                            {showMore ? 'Read less' : 'Read more'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}