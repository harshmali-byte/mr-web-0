import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import dynamic from 'next/dynamic';

const ElevationScroll = dynamic(() => import('../ElevationScroll'));
const PublicWebNoMenu = dynamic(() => import('./PublicWebNoMenu'));
const PublicMobileNoMenu = dynamic(() => import('./PublicMobileNoMenu'));

export default function PublicNoMenu() {
    return (
        <ElevationScroll>
            <AppBar sx={{ display: 'flex', transitionDuration: '600ms', transitionTimingFunction: 'ease-in-out', backgroundColor: '#fff' }} >
                <Toolbar disableGutters={true}>
                    <PublicWebNoMenu />
                    <PublicMobileNoMenu />
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}