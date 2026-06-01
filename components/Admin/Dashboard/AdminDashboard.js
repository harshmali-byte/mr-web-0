import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/Auth/AuthContext';
import clsx from 'clsx';
import CssBaseline from '@mui/material/CssBaseline';
import { Drawer, Box, AppBar, Toolbar, List, Typography, Divider, IconButton, Container, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardMenu from './DashboardMenu';
import useStyles from './DashboardStyle';
import Loader from '../../Common/Loader';
import { OrgInfo } from '../../Common/Constants';
import { IsAdmin } from '../../Common/AdminConstants';
import UnAuthorized from '../../Common/UnAuthorized';
import BrandLogo from '../../Common/Logos/BrandLogo';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/" target="_blank">
                {OrgInfo.FullName}
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function AdminDashboard({ children, toolBarMenu, selectedMenuName, setAuthorization }) {
    const router = useRouter();
    const auth = useAuth();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [pageAuthorization, setPageAuthorization] = useState(null);

    useEffect(() => {
        if (!auth || !auth.authData) {
            return;
        }

        setAuthenticated(true);
    }, [auth, router, children])

    useEffect(() => {
        if (!authenticated) {
            return;
        }

        let isAdmin = IsAdmin(auth.authData.Name);
        let pageAccess;

        if (!isAdmin) {
            let access = auth.authData.RoleAccess;
            pageAccess = access && access.find(f => f.Name === selectedMenuName);
        }

        let authorize = {};
        if (!pageAccess) {
            pageAccess = {};
        }

        authorize.CanView = isAdmin || pageAccess.CanView;
        authorize.CanEdit = isAdmin || pageAccess.CanEdit;
        authorize.CanDelete = isAdmin || pageAccess.CanDelete;
        authorize.CanCreate = isAdmin || pageAccess.CanCreate;
        authorize.CanApprove = isAdmin || pageAccess.CanApprove;
        authorize.CanReject = isAdmin || pageAccess.CanReject;
        authorize.CanExport = isAdmin || pageAccess.CanExport;

        setPageAuthorization(authorize);

        if (setAuthorization) {
            setAuthorization(authorize);
        }
    }, [authenticated])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function setAppbar() {
        return (
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link className={classes.title} href="/" target="_blank" color="inherit" underline="none">
                            {OrgInfo.Name}
                        </Link>
                    </Box>
                    {/* Hide this untill notification get implemented */}
                    {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
                    {
                        toolBarMenu ? toolBarMenu : null
                    }
                </Toolbar>
            </AppBar>
        )
    }

    if (!authenticated) {
        return (
            <Loader />
        )
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            {setAppbar()}
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <BrandLogo logoWidth={50} logoHeight={50} />
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <DashboardMenu selectedMenuName={selectedMenuName} />
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth={false} className={classes.container}>
                    <Box pt={1}>
                        {
                            pageAuthorization && pageAuthorization.CanView ? children : <UnAuthorized />
                        }
                    </Box>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}