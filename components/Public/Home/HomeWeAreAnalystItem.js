import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

export default function HomeWeAreAnalystItem({ number, title, subtitle, borderBottomWidth }) {
    return (
        <Box sx={{ borderBottomWidth: borderBottomWidth, borderBottomColor: '#FFFFFF', borderBottomStyle: 'solid' }}>
            <Grid item container xs={12} sx={{ pt: 0, pb: 0, mt: 0, pb: 1, alignItems: 'center' }}>
                <Grid item xs={2} sm={1} sx={{ p: 1 }}>
                    <Typography variant='body1' component="p" sx={{ marginLeft: 1, paddingBottom: 0, fontWeight: 'bold', fontSize: 25, color: '#24292D', lineHeight: 1.2 }}>{number}</Typography>
                    <Typography variant='body1' component="p" sx={{ marginTop: -2, backgroundColor: '#FFFFFF', borderRadius: 100, width: 25, color: '#FFFFFF' }}>{number}</Typography>
                </Grid>
                <Grid item container xs={10} sm={8} md={11} sx={{ p: 1, display: 'flex', flexDirection: 'column' }} >
                    <Grid item xs={12}>
                        <Typography variant='body1' component="p" sx={{ color: '#24292D', fontWeight: 'bold', fontSize: { xs: 13, sm: 20 } }}>{title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body1' component="p" sx={{ color: '#24292D', fontWeight: 'bold', fontSize: { xs: 13, sm: 20 } }}>{subtitle}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}