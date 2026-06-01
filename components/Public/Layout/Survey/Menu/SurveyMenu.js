import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';

const ElevationScroll = dynamic(() => import('../../ElevationScroll'));
const SurveyWebNoMenu = dynamic(() => import('./SurveyWebNoMenu'));
const SurveyMobileNoMenu = dynamic(() => import('./SurveyMobileNoMenu'));

export default function SurveyMenu(props) {
    const isSmallerThanLGScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    function showMenu() {
        return (
            <Toolbar disableGutters={true}>
                {
                    isSmallerThanLGScreen
                        ? <SurveyMobileNoMenu {...props} />
                        : <SurveyWebNoMenu {...props} />
                }
            </Toolbar>
        )
    }

    return (
        <ElevationScroll>
            {showMenu()}
        </ElevationScroll>
    )
}