import React from 'react';
import { Box } from '@mui/material';
import HomeSectionTitle from '../Home/HomeSectionTitle';
import Clients from '../../Common/ClientCarousel/Clients';

export default function AboutClients() {
    return (
        <Box>
            <Box sx={{ mt: 5 }}>
                <HomeSectionTitle title="OUR" focusTitle="CLIENTS" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
            </Box>
            <Box>
                <Clients />
            </Box>
        </Box>
    )
}