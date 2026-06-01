import React from 'react';
import { Typography } from '@mui/material';

export default function AssistancePara({ data }) {
    return (
        <Typography variant="p" component="p" sx={{ mt: 2, mb: 2 }}>
            {data}
        </Typography>
    )
}