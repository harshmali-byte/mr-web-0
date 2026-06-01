import React from 'react';
import { Typography } from '@mui/material';

export default function AssistanceTitle({ data }) {
    return (
        <Typography variant="h5" component="h5" sx={{ mt: 2, mb: 2, fontSize: 20, fontWeight: 'bold' }}>
            {data}
        </Typography>
    )
}