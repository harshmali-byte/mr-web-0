import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import LockIcon from '@mui/icons-material/Lock';

export default function HomeFocusedLibraryItem({ title, subTitle, cardIcon, category }) {
    const theme = useTheme();

    return (
        <Grid item xs={6}>
            <Paper elevation={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, minHeight: { xs: 100, md: 'auto' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='caption' component="span" sx={{ color: '#24292D', fontWeight: '500', fontSize: 20 }}>{title ? title : <LockIcon color="themeColor" />}</Typography>
                    <Typography variant='caption' component="span" sx={{ color: '#747579', fontWeight: '600' }}>{subTitle}</Typography>
                </Box>
                <Box sx={{ backgroundColor: theme.palette.themeColor.main, display: 'flex', height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 40, pl: 1, pr: 1, pt: 0, pb: 0 }}>
                    <Image src={`/PublicHome/Focused/${cardIcon}`} loading="lazy" layout='fixed' alt={category} width={28} height={28} />
                </Box>
            </Paper>
        </Grid>
    )
}