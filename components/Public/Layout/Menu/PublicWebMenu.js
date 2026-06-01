import React from 'react';
import { Link, Grid, Box, Slide, useScrollTrigger, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MenuLogin, MenuRegister, MenuGridItem } from './PublicMenuService';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useStyles from './MenuStyle';
import ServicesSubMenus from './ServicesSubMenus';
import dynamic from 'next/dynamic';

const SubMenu = dynamic(() => import('./SubMenus/SubMenu'));
const BrandLogo = dynamic(() => import('../../../Common/Logos/BrandLogo'));
const ContactEmailSubMenu = dynamic(() => import('./ContactInfo/ContactEmailSubMenu'));
const ContactNumberSubMenu = dynamic(() => import('./ContactInfo/ContactNumberSubMenu'));
const SearchReportSubMenu = dynamic(() => import('./SubMenus/Search/SearchReportSubMenu'));
const IndustrySubMenu = dynamic(() => import('./SubMenus/Industry/IndustrySubMenu'));
const PublicMenuHead = dynamic(() => import('./PublicMenuHead'));
const PublicMenuItem = dynamic(() => import('./SubMenus/Industry/PublicIndustryMenuItem'));


function HideContactBarOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger} sx={{ display: trigger ? 'none' : 'flex', justifyContent: 'flex-start', mt: 1, mb: 1 }}>
            {children}
        </Slide>
    );
}

function ShrinkLogoOnScroll(props) {
    const trigger = useScrollTrigger({
        disableHysteresis: false,
        target: props.window ? window() : undefined
    });

    // return React.cloneElement(props.children, {
    //     width: trigger ? 50 : 85,
    //     height: trigger ? 50 : 85
    // });

    return React.cloneElement(props.children, {
        logoWidth: trigger ? 55 : 105,
        logoHeight: trigger ? 55 : 105
    });
}

export default function PublicWebMenu(props) {
    const theme = useTheme();
    const classes = useStyles(null)();

    return (
        <Grid className="web-menu" container sx={{ display: { xs: 'none', lg: 'flex' }, pt: 1, pl: 2 }}>
            <Grid item xs={1} xl={2} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <ShrinkLogoOnScroll {...props}>
                    <BrandLogo />
                </ShrinkLogoOnScroll>
            </Grid>
            <Grid item container xs={11} xl={10} sx={{ display: 'flex' }}>
                <Grid item container spacing={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12}>
                        <HideContactBarOnScroll {...props}>
                            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Grid container item xs={2} md={2.5} xl={3.5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Grid item>
                                        <PublicMenuHead title="Events" href="https://www.linkedin.com/company/brand-essence-market-research-and-consultancy" target="_blank" menuclassname={classes.submenu} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={7} md={6.5} xl={4.5} >
                                    <Paper>
                                        <Grid container item sx={{ pt: 0.5, pb: 0.5, display: 'flex', alignItems: 'center' }} >
                                            <Grid container item spacing={1} xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                                                <ContactNumberSubMenu />
                                            </Grid>
                                            <Grid container item spacing={1} xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <ContactEmailSubMenu />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} md={3} xl={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box>
                                        <Grid container spacing={1} sx={{ pr: 2, display: 'flex', alignItems: 'center' }}>
                                            <MenuGridItem sx={{}} xs={6}><MenuRegister {...props} /></MenuGridItem>
                                            <MenuGridItem sx={{}} xs={6}><MenuLogin {...props} /></MenuGridItem>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </HideContactBarOnScroll>
                    </Grid>
                    <Grid container item spacing={0} sx={{ backgroundColor: theme.palette.secondary.main, borderTopLeftRadius: 100, pl: 5, pt: 1, pb: 1 }} >
                        <Grid container item xs={8} lg={8} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} spacing={2} >
                            <Grid item>
                                <Link className={classes.menu} underline='none' href='/' sx={{ display: 'flex' }} >
                                    <HomeIcon style={{ marginRight: '20px', cursor: 'pointer' }} titleAccess="Home" />
                                </Link>
                            </Grid>
                            <Grid item>
                                <PublicMenuItem menuName="Industry" posticon={<KeyboardArrowDownIcon color="themeColor" />}>
                                    <IndustrySubMenu isMobileView={false} />
                                </PublicMenuItem>
                            </Grid>
                            <Grid item>
                                <PublicMenuHead title="Blog" href="/Blogs" />
                            </Grid>
                            {
                                process.env.NEXT_PUBLIC_ORG === 'MR'
                                    ?
                                    <Grid item>
                                        <SubMenu isMobileView={false} title="Services" SubMenus={ServicesSubMenus} />
                                    </Grid>
                                    : <Grid item>
                                        <PublicMenuHead title="Services" href='/Services' />
                                    </Grid>
                            }

                            <Grid item>
                                <PublicMenuHead title="About Us" href='/AboutUs' />
                            </Grid>
                            <Grid item>
                                <PublicMenuHead title="Contact Us" href="/ContactUs" />
                            </Grid>
                            <Grid item>
                                <PublicMenuHead title="Pricing" href='/Pricing' />
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} lg={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                            <Grid item sx={{ flex: 1, mr: 3 }}><SearchReportSubMenu /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}