import React, { useState } from 'react';
import { Box, Typography, Container, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import HomeSectionTitle from './HomeSectionTitle';
import { OrgInfo } from '../../Common/Constants';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import HomeNewsAppearanceTabPanel from './HomeNewsAppearanceTabPanel';
import { HomeNewsAppearanceData } from './HomeNewsAppearanceData';

export default function HomeNewsAppearance() {
    const theme = useTheme();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Container>
                <Box sx={{ pb: { xs: 0, sm: 2 }, mt: 7 }}>
                    <HomeSectionTitle title={`OUR RESEARCH'S`} focusTitle="DIGITAL PRESENCE" sxProps={{ flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center' }} />
                    <Box>
                        <Typography sx={{ textAlign: 'center' }}>
                            <Typography component="span" variant="span" sx={{ color: theme.palette.themeColor.main }}>{OrgInfo.Name}</Typography>
                            <Typography component="span" variant="span" sx={{ marginLeft: '.2rem' }}>is the most trusted and loved sources for market research studies</Typography>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ maxWidth: { xs: 330, sm: 720, md: 970, lg: 1200 }, mt: 4 }}>
                    <TabContext value={value}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TabList onChange={handleChange}
                                variant="scrollable"
                                sx={{
                                    mb: -5,
                                    pb: 3,
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 5,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        pb: '0.2rem',
                                        mb: 2
                                    },
                                    '& .MuiTabs-indicator:after': {
                                        content: "url('./PublicHome/DownArrow.png')",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        mb: '-1.5rem'
                                    }
                                }}>
                                {
                                    HomeNewsAppearanceData.map((tab) => (
                                        <Tab
                                            key={tab.id}
                                            value={tab.id}
                                            sx={{ mb: 2, ml: 2, mr: 2 }}
                                            icon={<Image src={`/PublicHome/NewsAppear/${tab.iconName}.png`} width={tab.iconWidth} height={tab.iconHeight || 10} loading="lazy" alt={tab.name} />}
                                        />
                                    ))
                                }
                            </TabList>
                        </Box>
                        {
                            HomeNewsAppearanceData.map((tab) => (
                                <HomeNewsAppearanceTabPanel key={tab.id} value={tab.id} url={tab.url}>
                                    {tab.news.replace('[CompanyFullName]', OrgInfo.FullName).replace('[Name]', OrgInfo.Name)}
                                </HomeNewsAppearanceTabPanel>
                            ))
                        }
                    </TabContext>
                </Box>
            </Container>
        </Box>
    )
}