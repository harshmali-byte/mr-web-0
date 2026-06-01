import React from 'react';
import { Grid, Button, Link } from '@mui/material';
import * as Constants from '../../../Common/Constants';
import dynamic from 'next/dynamic';

const RegisterMenu = dynamic(() => import('./SubMenus/Login/RegisterMenu'));
const LoginMenu = dynamic(() => import('./SubMenus/Login/LoginMenu'));

function handleLogout(props) {
    props.showToast({ Message: 'You have successfully logged out', Severity: 'success' });
    setTimeout(() => {
        props.auth.signOut();
        window.location.reload();
    }, 2000)
}

function MenuDashboard(props) {
    let show = false;
    // if (props.auth && props.auth.authData && props.auth.authData.RoleAccess) {
    //     show = props.auth.authData.RoleAccess.some((access) => access.Id === Constants.Access.AdminDashboard.id);
    // }

    let landingPage = '/Admin/Dashboard';
    if (props.auth && props.auth.authData) {
        show = true;
        landingPage = props.auth.authData.LandingPage || landingPage;
    }

    return show
        ? <Link underline='always' href={landingPage} target="_blank" className={props.menuclassname}>Dashboard</Link>
        : null
}

function MenuLogin(props) {
    let show = props.auth && props.auth.authData;

    return show
        ? <Button variant="contained" onClick={() => handleLogout(props)} sx={{ ml: { lg: 2 } }} color="themeColor">Logout</Button>
        : <LoginMenu showToast={props.showToast} classNames={props.menuclassname} />
}

function MenuRegister(props) {
    let show = props.auth && props.auth.authData;

    let landingPage = '/Admin/Dashboard';
    if (show) {
        landingPage = props.auth.authData.LandingPage || landingPage;
    }

    return show
        ? <Link underline='always' href={landingPage} target="_blank">Dashboard</Link>
        : <RegisterMenu showToast={props.showToast} classNames={props.classNames} />
}

function MenuGridItem(props) {
    if (props.children)
        return <Grid item {...props}>{props.children}</Grid>
    return null;
}

export { MenuDashboard, MenuLogin, MenuRegister, MenuGridItem }
