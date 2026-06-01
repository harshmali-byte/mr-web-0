import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { OrgInfo } from '../../Common/Constants';

const Loader = dynamic(() => import('../../Common/Loader'), { fallback: <div>Loading...</div> });
const HomeOrgBanner = dynamic(() => import('./Banner/HomeOrgBanner'))
const SearchReportSubMenu = dynamic(() => import('../Layout/Menu/SubMenus/Search/SearchReportSubMenu'));

export default function HomeBrowseReports({ homeBrowseReports }) {
    const theme = useTheme();
    const [searchKeyword, setSearchKeyword] = useState('');

    if (!homeBrowseReports) {
        return <Loader />
    }

    return (
        <Box>
            <Box sx={{ position: 'relative' }}>
                <HomeOrgBanner />
            </Box>
            <Container sx={{ position: 'relative' }} >
                <Box>
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: { xs: 4, sm: 4, lg: 1 }, flexWrap: 'wrap', alignItems: 'center', pt: { xs: 1, lg: 12 } }}>
                            <Typography component="h1" variant="h4" sx={{ fontSize: { xs: 22, lg: 28 }, fontWeight: 'bold', textAlign: { xs: 'center', lg: 'left' } }}>{OrgInfo.FullName}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: { xs: 2, lg: 1 }, flexWrap: 'wrap', alignItems: 'center' }}>
                            <Typography component="h2" variant="h4" sx={{ mt: { xs: 1, lg: 0 }, mr: { xs: 1, lg: 2 }, fontSize: { xs: 22, lg: 28 } }}>Shaping Strategies to Create</Typography>
                            <Typography component="h2" variant="h4" sx={{ mt: { xs: 1, lg: 0 }, color: '#ffffff', fontWeight: '600', backgroundColor: theme.palette.highlight.main, paddingRight: 2, fontSize: { xs: 23, lg: 28 } }}>New Business Opportunity</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Typography component="div" variant="h2" sx={{ fontWeight: 'bold', mr: 3 }}>Browse</Typography>
                            <Typography component="div" variant="h2" sx={{ color: theme.palette.highlight.main, fontWeight: 'bold', mr: 3 }}>{homeBrowseReports.totalReportsCount}</Typography>
                            <Typography component="div" variant="h2" sx={{ fontWeight: 'bold' }}>Reports</Typography>
                        </Box>
                        <Box sx={{ mt: { xs: 6, sm: 4 } }}>
                            <SearchReportSubMenu textVariant="standard" textPlaceholder="What are you looking for?"
                                searchKeyword={searchKeyword} />
                        </Box>
                        <Box sx={{ mt: { xs: 2, sm: 5 } }}>
                            <Typography component="span" variant="body1" sx={{ color: '#ffffff', backgroundColor: theme.palette.highlight.main, paddingLeft: 2 }}>Trending Keywords</Typography>
                            <Typography component="span" variant="body1" sx={{ color: { xs: '#000' }, paddingLeft: 1 }}>:</Typography>
                            {
                                homeBrowseReports.trendingKeywords.map((keyword, keyIndex) => {
                                    return (
                                        <Typography component="span" key={keyIndex}
                                            onClick={() => setSearchKeyword(keyword.title)}
                                            sx={{ paddingLeft: 1, textDecoration: 'underline', cursor: 'pointer' }} >
                                            {keyword.title}
                                        </Typography>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}