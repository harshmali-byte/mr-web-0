import React from 'react';
import { useScrollTrigger, Zoom, Box } from '@mui/material';
import ScrollToElement from '../../Common/ScrollToElement';

export default function ScrollTop({ children, window }) {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    return (
        <Zoom in={trigger}>
            <Box onClick={(event) => ScrollToElement(event, '#survey-toolbar')} role="presentation" sx={{ position: 'fixed', right: { xs: 0, sm: 5 }, bottom: { xs: '20%', sm: '10%' }, zIndex: 1000 }} >
                {children}
            </Box>
        </Zoom>
    );
}