import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Grid, Container, AppBar, Typography, Box, Slide, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function StickyMAActions({ }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 5000)
    }, [])

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <AppBar position="fixed" sx={{ background: 'linear-gradient(to bottom, #1267F5, #0F2F65)', top: 'auto', bottom: 0, py: 2 }}>
                <Container>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        <Grid item container spacing={1} xs={12} md={12} lg={5}>
                            <Grid item xs={2} sm={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <Box sx={{ position: 'relative', width: { xs: 40 }, height: { xs: 40 } }}>
                                    <Image src="/Services/M_A/ExpertAdvice.png" layout='fill' loading="lazy" alt='Expert Advice' />
                                </Box>
                            </Grid>
                            <Grid item xs={10} sm={10} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', my: { xs: 1.5, md: 0 } }}>
                                <Typography component='h4'>Expert Advice</Typography>
                                <Typography component='div' sx={{ fontSize: 12, lineHeight: 1.2, fontWeight: '300' }}>Make sure the report is backed by standard research methodology before purchasing!</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} ms={6} lg={3}>
                            <Button variant="contained" fullWidth size='small'
                                href={`https://calendly.com/vishalsawant/analyst-call-with-brandessence-market-research`} target="_blank"
                                startIcon={<Image src="/Services/M_A/Advice.png" width="20" height="20" loading="lazy" alt='Expert Advice' />}
                                sx={{
                                    m: { xs: 1, md: 0 },
                                    bgcolor: theme.palette.primary.contrastText,
                                    color: theme.custom.textColor,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.contrastText,
                                    }
                                }}
                            >Take Expert Advice</Button>
                        </Grid>
                        <Grid item container xs={12} ms={6} lg={3}>
                            <Button onClick={() => setOpen(false)} fullWidth variant="outlined" size='small' startIcon={<CancelOutlinedIcon />}
                                sx={{
                                    m: { xs: 1, md: 0 },
                                    borderColor: theme.palette.secondary.main,
                                    color: theme.palette.primary.contrastText,
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: theme.palette.primary.contrastText,
                                    }
                                }}
                            >{`I don't want Expert Advice`}</Button>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </Slide>
    )
}