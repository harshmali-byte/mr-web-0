import React, { useState } from 'react';
import { Box, Grid, Button, Container, Select, MenuItem } from '@mui/material';
import HomeSectionTitle from './HomeSectionTitle';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { HomeFocusedLibraryData } from './HomeFocusedLibraryData';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const HomeFocusedLibraryItem = dynamic(() => import('./HomeFocusedLibraryItem'));

export default function HomeFocusedLibrary() {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('SELECT CATEGORY');
    const [categoryData, setCategoryData] = useState(HomeFocusedLibraryData[0]);

    function onCategoryChange(event) {
        let cat = event.target.value;
        setSelectedCategory(cat);
        let data = HomeFocusedLibraryData.find(f => f.category === cat);
        setCategoryData(data);
    }

    return (
        <Box sx={{ marginTop: { xs: 4, sm: 7 }, p: { xs: 0, md: 5 }, pt: { xs: 5 }, pb: { xs: 3 }, backgroundColor: theme.palette.secondary.main }}>
            <Box sx={{ paddingBottom: { xs: 0, sm: 0 } }}>
                <HomeSectionTitle title="FOCUSED" focusTitle="LIBRARY" />
            </Box>
            <Container>
                <Grid container spacing={10} sx={{ marginTop: { xs: 0, sm: 0 } }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Image src={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/QuoteStart.png`} loading="lazy" layout='fixed' alt="Analyst" width={20} height={20} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: "flex-end" }, alignItems: 'flex-end', flexDirection: 'column' }}>
                            <HomeSectionTitle title="Never waste your Time and Budget on single report" focusTitle="Optimize your Market Research Budget with our Focused Category Library"
                                sxProps={{ display: 'flex', flexDirection: 'column' }} sxTitleProps={{ fontSize: 20, fontWeight: '400' }} sxFocusProps={{ fontSize: 20, fontWeight: 'bold' }} />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: "space-between" } }}>
                            <Select id="selectFocusLibrary" value={selectedCategory} displayEmpty onChange={onCategoryChange}
                                IconComponent={(props) => <KeyboardArrowDownIcon {...props} />} color="themeColor"
                                sx={{ flex: 1, backgroundColor: theme.palette.themeColor.main, color: theme.palette.themeColor.contrastText, ":hover": { backgroundColor: theme.palette.themeColor.light }, ".MuiSelect-icon": { color: theme.palette.themeColor.contrastText } }}>
                                {
                                    HomeFocusedLibraryData.map((cat, indexedCat) => {
                                        return <MenuItem key={indexedCat} value={cat.category} sx={{ ":hover": { color: theme.palette.themeColor.main } }}>{cat.category}</MenuItem>
                                    })
                                }
                            </Select>
                            {
                                selectedCategory !== 'SELECT CATEGORY'
                                    ? <Button variant='contained' href="https://brandessenceresearch.com/ContactUs" target="_blank" sx={{ flex: 1, ml: { xs: 0, md: 1 }, mt: { xs: 1, md: 0 } }}>Contact Us</Button>
                                    : null
                            }
                        </Grid>
                    </Grid>
                    {
                        categoryData
                            ? <Grid item xs={12} sm={6} md={6}>
                                <Grid container spacing={3}>
                                    <HomeFocusedLibraryItem title={categoryData.viewedBy} subTitle="Viewed by" cardIcon="Profile.png" category={categoryData.category} />
                                    <HomeFocusedLibraryItem title={categoryData.statisticCovered} subTitle="Statistic covered" cardIcon="Statistic.png" category={categoryData.category} />
                                    <HomeFocusedLibraryItem title={categoryData.companyCovered} subTitle="Company covered" cardIcon="Company.png" category={categoryData.category} />
                                    <HomeFocusedLibraryItem title={categoryData.tableCovered} subTitle="Table covered" cardIcon="Table.png" category={categoryData.category} />
                                    <HomeFocusedLibraryItem title={categoryData.countriesTracked} subTitle="Countries Tracked" cardIcon="Location.png" category={categoryData.category} />
                                    <HomeFocusedLibraryItem title={categoryData.regionCovered} subTitle="Region covered" cardIcon="Region.png" category={categoryData.category} />
                                </Grid>
                            </Grid>
                            : null
                    }
                </Grid>
            </Container>
        </Box>
    )
}