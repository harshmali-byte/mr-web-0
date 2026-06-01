import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Grid, Container, AppBar, Typography, Box, Slide } from '@mui/material';
import ResearchStickyEmailRequestForm from '../../Public/Research/Request/ResearchStickyEmailRequestForm';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function StickyRequestActions({ research, requestType }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!research) {
            return null;
        }

        setOpen(true);
    }, [research])

    if (!research) {
        return null;
    }

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <AppBar position="fixed" sx={{ background: 'linear-gradient(to bottom, #C23157, #0F2F65)', top: 'auto', bottom: 0, pt: 2 }}>
                <Container sx={{}}>
                    <Box sx={{ position: 'relative' }}>
                        <Grid container spacing={2}>
                            <Grid item container spacing={1} xs={12} md={12} lg={5} sx={{}}>
                                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Box sx={{ position: 'relative', width: { xs: 150 }, height: { xs: 80 } }}>
                                        <Image src="/Research/StickyCallToAction.png" layout='fill' loading="lazy" alt='Call to action' />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', my: { xs: 1.5, md: 0 } }}>
                                    <Typography component='h4' sx={{}}>A RESULT OF YEARS OF PRACTICE</Typography>
                                    <Typography component='div' sx={{ fontSize: 12, lineHeight: 1.2, fontWeight: '300' }}>Make sure the report is backed by standard research methodology before purchasing!</Typography>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} lg={7}>
                                <ResearchStickyEmailRequestForm research={research} requestType={requestType} />
                            </Grid>
                        </Grid>
                        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                            <CancelOutlinedIcon onClick={() => setOpen(false)} sx={{ cursor: 'pointer' }} />
                        </Box>
                    </Box>
                </Container>
            </AppBar>
        </Slide>
    )
}