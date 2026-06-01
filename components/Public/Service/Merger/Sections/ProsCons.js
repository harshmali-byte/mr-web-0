import React from 'react';
import { Grid, Box, Typography, Avatar } from "@mui/material";
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import ProsConsBox from './ProsConsBox';

const avatarStyle = {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    boxShadow: 'rgba(99, 99, 99, 0.8) 0px 2px 8px 0px',
    zIndex: 2,
    p: 0, m: 0,
    mt: { xs: -3, lg: 0 }, mb: { xs: -3, lg: 0 }
}

export default function ProsCons({ title, pros, cons }) {
    const theme = useTheme();

    return (
        <Grid container sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ backgroundColor: '#fff', p: 2 }}>
                <Typography variant='title' sx={{ fontWeight: 'bold', mt: 1, color: theme.palette.info.main }}>{title}</Typography>
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Grid container sx={{ mt: 3, pb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }} columnSpacing={5} rowSpacing={0}>
                        <Grid item xs={12} md={5.7} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <ProsConsBox title="Advantages" items={pros} isAdvantage={true} />
                        </Grid>
                        <Grid item xs={0} md={0.1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                            <Avatar sx={avatarStyle}>
                                <Image src='/Services/M_A/Acquisition/AdvantageDisadvantageOfMerger.png' alt='Advantages and Disadvantages M&A' height='100px' width='100px' />
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} md={5.7} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <ProsConsBox title="Disadvantages" items={cons} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    )
}