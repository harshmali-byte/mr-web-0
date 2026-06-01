import React from 'react';
import { Grid } from '@mui/material';

export default function ThreeColumnLayout({ children }) {
    return (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            {children}
        </Grid>
    )
}