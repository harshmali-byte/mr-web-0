import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import dynamic from 'next/dynamic';

const ContactNumberSubMenu = dynamic(() => import('./ContactInfo/ContactNumberSubMenu'));
const ContactEmailSubMenu = dynamic(() => import('./ContactInfo/ContactEmailSubMenu'));
const BrandLogo = dynamic(() => import('../../../Common/Logos/BrandLogo'));

export default function PublicMobileNoMenu() {

    return (
        <Box className="mobile-menu" sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, mt: 1 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={1} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }} >
                                <ContactNumberSubMenu textFontSize={12} />
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <ContactEmailSubMenu textFontSize={12} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', p: 1 }}>
                    <BrandLogo />
                </Grid>
            </Grid>
        </Box>
    )
}