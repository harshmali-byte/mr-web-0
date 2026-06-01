import React from 'react';
import { Grid, Box } from '@mui/material';
import dynamic from 'next/dynamic';

const BrandLogo = dynamic(() => import('../../../Common/Logos/BrandLogo'));
const ContactEmailSubMenu = dynamic(() => import('./ContactInfo/ContactEmailSubMenu'));
const ContactNumberSubMenu = dynamic(() => import('./ContactInfo/ContactNumberSubMenu'));

export default function PublicWebNoMenu() {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, pt: 1, pl: 2 }}>
            <Box sx={{ display: 'flex', mr: 5 }}>
                <Grid container>
                    <Grid item sx={{ display: 'flex' }}>
                        <BrandLogo />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
                <Grid container spacing={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container item spacing={1} md={7} lg={8} sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <ContactNumberSubMenu />
                    </Grid>
                    <Grid container item spacing={1} md={5} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ContactEmailSubMenu />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}