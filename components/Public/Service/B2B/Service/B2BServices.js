import React from 'react';
import { Grid, Box, Typography, Container, Button } from "@mui/material";
import dynamic from 'next/dynamic';
import ScrollToElement from '../../../../Common/ScrollToElement';

const HomeSectionTitle = dynamic(() => import('../../../Home/HomeSectionTitle'));
const B2BserviceItem = dynamic(() => import('./B2BserviceItem'));

export default function B2BServices({ Data }) {

    if (!Data) {
        return null;
    }

    return (
        <Container>
            <Box sx={{ mb: { xs: 1, lg: 13 } }}>
                <Box sx={{ py: 4 }}>
                    <HomeSectionTitle title="OUR" focusTitle="B2B SERVICES" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                    <Typography component="div" variant="span" sx={{ textAlign: 'center' }}>Generating leads for your business, so you can focus on closing deals</Typography>
                </Box>
                <Box>
                    <Grid container columnSpacing={6} rowSpacing={3}>
                        {
                            Data.map((d, i) => {
                                return (
                                    <Grid key={i} item xs={12} sm={6}>
                                        <B2BserviceItem data={d} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Button variant='contained' color="info" onClick={(event) => ScrollToElement(event, '#requestform')} sx={{ cursor: 'pointer' }}>
                        Quotation Request
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}