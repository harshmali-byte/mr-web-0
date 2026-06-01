import React from 'react';
import { Typography } from '@mui/material';

export default function TnCItem({ data }) {
    return (
        <>
            <Typography variant="h5" component="h5" sx={{ mt: 2, mb: 2 }}>
                {data.title}
            </Typography>
            <Typography variant="p" component="p" sx={{ mt: 2, mb: 2 }}>
                {data.description}
            </Typography>
        </>
    )
}