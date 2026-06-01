import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function HomeSectionTitle({ title, focusTitle, sxProps, sxTitleProps, sxFocusProps }) {
    const theme = useTheme();

    return (
        <Box sx={[{ display: 'flex', justifyContent: 'center' }, sxProps]}>
            <Typography component="h2" variant="h4" sx={[{ color: theme.custom.textColor, marginRight: 1, fontWeight: 'bold' }, sxTitleProps]}>{title}</Typography>
            <Typography component="h2" variant="h4" sx={[{ color: theme.palette.themeColor.main, fontWeight: 'bold' }, sxFocusProps]}>{focusTitle}</Typography>
        </Box>
    )
}