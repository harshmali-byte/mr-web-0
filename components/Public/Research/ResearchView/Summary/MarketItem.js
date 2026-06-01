import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

export default function MarketItem({ body, title, iconImage }) {
    const theme = useTheme();
    const [segmentViewAll, setSegmentViewAll] = useState(false);
    const height = 800;

    if (!body) {
        return null;
    }

    return (
        <Grid item xs={12} md={4} >
            <Paper elevation={8} sx={{ p: 2 }}>
                <Box sx={{ height: segmentViewAll ? 'auto' : height, overflow: segmentViewAll ? 'visible' : 'hidden' }} className="marketKeyPlayers">
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ mr: 2 }}>{iconImage}</Box>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>{title}</Typography>
                    </Box>
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" target="_blank" onClick={() => setSegmentViewAll(!segmentViewAll)} sx={{
                        textDecoration: 'underline', mt: { xs: 1, sm: 0 }, fontSize: 20, "&.MuiButton-root:hover": {
                            bgcolor: "transparent"
                        },
                        textTransform: 'initial'
                    }} endIcon={<ExpandMoreIcon sx={{ backgroundColor: theme.palette.secondary.main, borderRadius: 10, height: 30, width: 30, transform: segmentViewAll ? 'rotate(-180deg)' : 'rotate(0)', }} />}>
                        {segmentViewAll ? 'View Less' : 'View More'}
                    </Button>
                </Box>
            </Paper>
        </Grid>
    )
}