import React from 'react';
import { Grid } from '@mui/material';

export default function TwoColumnLayout({ children }) {
    return (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {children}
        </Grid>
    )
}