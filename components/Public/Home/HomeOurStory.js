import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import HomeSectionTitle from './HomeSectionTitle';
import HomeOurStoryItem from './HomeOurStoryItem';

export default function HomeOurStory() {

    return (
        <Card elevation={5} sx={{ mb: 2, p: 2 }}>
            <Box>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2, mt: 3 }}>
                        <HomeSectionTitle title="OUR STORY" focusTitle="IN NUMBERS" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                        <Typography variant='body2' component="p" sx={{ lineHeight: 1.75, textAlign: 'center', color: '#747579' }}>
                            {`We've always valued data's ability to tell a story, so here's ours`}
                        </Typography>
                    </Grid>
                    <Grid item container sx={{ backgroundColor: '#FFFFFF' }}>
                        <Grid item container>
                            <HomeOurStoryItem imagePath={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/OurStory/Report_Home.png`} count="6000+" title="Market Research Reports Published Per Year" sxBorderWidth={{ borderWidth: { xs: 1 } }} />
                            <HomeOurStoryItem imagePath={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/OurStory/Analysis.png`} count="80+" title="Industry Sectors Analyzed Till Date" sxBorderWidth={{ borderWidth: { xs: 0, md: 1 } }} />
                            <HomeOurStoryItem imagePath={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/OurStory/Clients.png`} count="500+" title="Clients Worldwide Per Year" sxBorderWidth={{ borderWidth: { xs: 1 } }} />
                            <HomeOurStoryItem imagePath={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/OurStory/Company.png`} count="2 Mn+" title="Company Profiles Analyzed Till Date" sxBorderWidth={{ borderWidth: 0 }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}