import React from 'react';
import { useScrollTrigger } from '@mui/material';

export default function ElevationScroll({ children, window }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}