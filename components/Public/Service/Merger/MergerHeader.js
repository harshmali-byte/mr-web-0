
import { Grid, Box, Typography, Button, Container } from "@mui/material";
import Image from 'next/image';
import ScrollToElement from "../../../Common/ScrollToElement";

export default function MergerHeader() {
    return (
        <Box sx={{ background: 'url("/Front.png")', backgroundRepeat: 'no-repeat' }}>
            <Box>
                <Container>
                    <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, pb: 2 }}>
                        <Grid item container xs={12} md={6} sx={{ pl: { xs: 6, md: 0 } }}>
                            <Grid item xs={12}>
                                <Typography variant='h4' component="h1" sx={{ fontWeight: 'bold', pt: 4 }}>
                                    Merger & Acquisition Advisory
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Typography variant='p'>
                                    Enhancing every element of your competitive and market intelligence to deliver top and bottom-line growth
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button variant='contained' color="info" onClick={(event) => ScrollToElement(event, '#requestform')} sx={{ cursor: 'pointer' }}>
                                    Request a Proposal
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Box sx={{
                                height: { xs: 150, md: 175, lg: 250 }, width: { xs: 150, md: 175, lg: 250 },
                                position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'
                            }}>
                                <Image src="/Services/M_A/M_AAdvisory.png" layout='fill' alt='Merger & Acquisition Advisory' />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}