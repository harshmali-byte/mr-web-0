import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Button, Container, Divider } from '@mui/material';
import HomeSectionTitle from './HomeSectionTitle';
import DownloadIcon from '@mui/icons-material/Download';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Loader from '../../Common/Loader';

export default function HomeTopSellings({ homeTopSellingReports }) {
    function onRequestClick(e, id) {
        let requestType = e.currentTarget.attributes['requesttype'].value;
        window.open(`/${requestType}/PostId/${id}`);
    }

    if (!homeTopSellingReports) {
        return <Loader />
    }

    return (
        <Box sx={{ marginTop: { xs: 4, sm: 7 }, p: { xs: 0, md: 5 }, pt: { xs: 5 }, pb: { xs: 3 }, backgroundColor: '#E8E8E8' }}>
            <Box sx={{ paddingBottom: { xs: 0, sm: 2 } }}>
                <HomeSectionTitle title="TOP" focusTitle="SELLING" />
            </Box>
            <Container>
                <Grid container spacing={5} sx={{ marginTop: { xs: 0, sm: 1 } }}>
                    {
                        homeTopSellingReports.map(report => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={report.Id}>
                                    <Card sx={{ backgroundColor: '#FFFFFF', height: 400, display: 'flex', flex: 1, }} elevation={5}>
                                        <CardContent sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
                                            <Box sx={{
                                                mb: 1, height: 170,
                                                display: 'block',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {report.Title}
                                            </Box>
                                            <Divider />
                                            <Box sx={{ flex: 1, mt: 2, mb: 2 }}>
                                                <Box sx={{ pb: 1 }}><Typography variant="body1" component="span" sx={{ fontSize: 20, fontWeight: 'bold' }}>{report.Price}</Typography></Box>
                                                <Box><Typography variant="body1" component="span">Published: </Typography><Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>{report.Published}</Typography></Box>
                                                <Box><Typography variant="body1" component="span">Pages: </Typography><Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>{report.Page}</Typography></Box>
                                                <Box><Typography variant="body1" component="span">Downloaded: </Typography><Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>{report.Downloaded}</Typography></Box>
                                            </Box>
                                            <Box sx={{ flex: 0 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', lg: 'row' } }}>
                                                    <Button variant="contained" sx={{ backgroundColor: '#747579' }} startIcon={<DownloadIcon />} requesttype='requestSample' onClick={(e) => onRequestClick(e, report.Id)}>Free Sample</Button>
                                                    <Button variant="text" href={report.url} target="_blank" disableRipple={true}
                                                        sx={{
                                                            textDecoration: 'underline', mt: { xs: 1, sm: 0 }, "&.MuiButton-root:hover": {
                                                                bgcolor: "transparent"
                                                            }
                                                        }}
                                                        endIcon={<ChevronRightIcon sx={{
                                                            backgroundColor: '#E8E8E8', borderRadius: 10, height: 25, width: 25
                                                        }} />}
                                                    >
                                                        Details
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                    <Button variant="text" href="/Categories" target="_blank" sx={{
                        textDecoration: 'underline', mt: { xs: 1, sm: 0 }, fontSize: 20, "&.MuiButton-root:hover": {
                            bgcolor: "transparent"
                        }
                    }} endIcon={<ChevronRightIcon sx={{ backgroundColor: '#FFFFFF', borderRadius: 10, height: 30, width: 30 }} />}>
                        View more
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}