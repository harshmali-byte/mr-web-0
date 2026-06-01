import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Box, Divider, SwipeableDrawer, Paper, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuDashboard, MenuLogin, MenuGridItem } from './PublicMenuService';
import useStyles from './MenuStyle';
import HomeIcon from '@mui/icons-material/Home';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ServicesSubMenus from './ServicesSubMenus';
import dynamic from 'next/dynamic';

const SubMenu = dynamic(() => import('./SubMenus/SubMenu'));
const BrandLogo = dynamic(() => import('../../../Common/Logos/BrandLogo'));
const ContactEmailSubMenu = dynamic(() => import('./ContactInfo/ContactEmailSubMenu'));
const ContactNumberSubMenu = dynamic(() => import('./ContactInfo/ContactNumberSubMenu'));
const SearchReportSubMenu = dynamic(() => import('./SubMenus/Search/SearchReportSubMenu'));
const IndustrySubMenu = dynamic(() => import('./SubMenus/Industry/IndustrySubMenu'));
const PublicMenuHead = dynamic(() => import('./PublicMenuHead'));
const PublicIndustryMobileMenuItem = dynamic(() => import('./SubMenus/Industry/PublicIndustryMobileMenuItem'));

export default function PublicMobileMenu(props) {
    const theme = useTheme();
    const classes = useStyles()();

    const [toggleMenuDrawer, setToggleMenuDrawer] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(200);

    const updateSize = () => {
        setDrawerWidth(window.innerWidth - 50);
    }

    useEffect(() => {
        updateSize();
    }, [])

    useEffect(() => {
        window.onresize = updateSize;
    }, []);

    function handleOpenNavMenu() {
        setToggleMenuDrawer(!toggleMenuDrawer);
    }

    return (
        <Box className="mobile-menu" sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, mt: 1 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={1} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }} >
                                <ContactNumberSubMenu textFontSize={12} />
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <ContactEmailSubMenu textFontSize={12} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, pb: 1, pr: 1 }}>
                    <IconButton
                        size="large"
                        aria-label="Menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="primary"
                    >
                        <MenuIcon />
                    </IconButton>
                    <BrandLogo logoWidth={55} logoHeight={55} />
                </Grid>
            </Grid>

            <SwipeableDrawer
                anchor='left'
                open={toggleMenuDrawer}
                onClose={() => { setToggleMenuDrawer(false) }}
                onOpen={() => { setToggleMenuDrawer(true) }}
                sx={{ '& .MuiDrawer-paper': { backgroundColor: theme.palette.secondary.main } }}
            >
                <Box role="presentation" sx={{ width: drawerWidth, backgroundColor: theme.palette.secondary.main }}>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <BrandLogo showGrey={true} />
                            <HighlightOffIcon onClick={() => setToggleMenuDrawer(false)} sx={{ fontSize: 30 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item container xs={1.5} md={0.5}>
                                <Grid item xs={12}>
                                    <Link underline='none' href="/" >
                                        <HomeIcon titleAccess="Home" />
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item container xs={10.5} md={11.5} rowSpacing={1}>
                                <Grid item xs={12} sx={{}}>
                                    <PublicIndustryMobileMenuItem menuName="Industry">
                                        <IndustrySubMenu isMobileView={true} />
                                    </PublicIndustryMobileMenuItem>
                                </Grid>
                                <Grid item xs={12}>
                                    <PublicMenuHead title="Blog" href="/Blogs" />
                                </Grid>
                                {
                                    process.env.NEXT_PUBLIC_ORG === 'MR'
                                        ?
                                        <Grid item xs={12} sx={{}}>
                                            <PublicIndustryMobileMenuItem menuName="Services">
                                                <SubMenu isMobileView={true} title="Services" SubMenus={ServicesSubMenus} />
                                            </PublicIndustryMobileMenuItem>
                                        </Grid>
                                        : <Grid item>
                                            <PublicMenuHead title="Services" href='/Services' />
                                        </Grid>
                                }

                                <Grid item xs={12}>
                                    <PublicMenuHead title="About Us" href='/AboutUs' />
                                </Grid>
                                <Grid item xs={12}>
                                    <PublicMenuHead title="Contact Us" href="/ContactUs" />
                                </Grid>
                                <Grid item xs={12}>
                                    <PublicMenuHead title="Pricing" href="/Pricing" />
                                </Grid>
                                <Grid container item xs={12} sx={{ display: 'flex', flexDirection: "row", }}>
                                    <Grid itemProp=''>
                                        <PublicMenuHead title="Events" href="https://brandessenceresearch.com/events/upcomingEvents" target="_blank" menuclassname={classes.submenu} />
                                    </Grid>
                                    <MenuGridItem><MenuDashboard {...props} menuclassname={classes.submenu} /></MenuGridItem>
                                </Grid>
                                <Grid container item xs={12} sx={{ display: 'flex', flexDirection: "row" }}>
                                    <MenuGridItem><MenuLogin menuclassname={classes.submenu} {...props} /></MenuGridItem>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sx={{ mt: 1, mb: 2 }} >
                                <Grid item sx={{ flex: 1 }}><SearchReportSubMenu /></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </SwipeableDrawer>
        </Box>
    )
}