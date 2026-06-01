import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';

const ElevationScroll = dynamic(() => import('../ElevationScroll'));
const PublicMobileMenu = dynamic(() => import('./PublicMobileMenu'));
const PublicWebMenu = dynamic(() => import('./PublicWebMenu'));

export default function PublicMenu(props) {
    const isSmallerThanLGScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    function showMenu() {
        return (
            <Toolbar disableGutters={true}>
                {
                    isSmallerThanLGScreen
                        ? <PublicMobileMenu {...props} />
                        : <PublicWebMenu {...props} />
                }
            </Toolbar>
        )
    }

    return (
        <ElevationScroll>
            <AppBar sx={{ display: 'flex', transitionDuration: '600ms', transitionTimingFunction: 'ease-in-out', backgroundColor: '#fff' }} >
                {showMenu()}
            </AppBar>
        </ElevationScroll>
    )
}