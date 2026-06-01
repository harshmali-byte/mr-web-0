import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import Image from 'next/image';

export default function HomeClients() {
    function ShowImage({ name }) {
        return (
            <Grid item xs={6} md={2} sx={{ position: 'relative' }}>
                <Box sx={{ textAlign: 'center', mx: 2, my: { xs: 2, sm: 0 }, position: 'relative', height: 90 }}>
                    <Image src={`/PublicHome/Logos/${name}.png`} loading="lazy" layout="fill" alt={name} />
                </Box>
            </Grid>
        )
    }

    return (
        <Container>
            <Box sx={{ marginTop: { xs: 4, sm: 7 } }}>
                <Grid container>
                    <ShowImage name="Accenture" />
                    <ShowImage name="Deloitte" />
                    <ShowImage name="Disney" />
                    <ShowImage name="ey" />
                    <ShowImage name="Mercedes-Benz" />
                    <ShowImage name="Microsoft" />
                </Grid>
            </Box>
        </Container>
    )
}