import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import Image from 'next/image';

export default function CustomerReviewHorizontal({ says, textAlign }) {
    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 6 } }}>
            <Box xs={12}>
                <Paper elevation={5} sx={{ width: { xs: 280, md: 400, lg: 500 } }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', padding: 4 }}>
                        <Box sx={{ marginRight: { xs: 0, sm: 3 } }}>
                            <Paper elevation={5} sx={{ marginLeft: { xs: 0, lg: '-75px' }, width: 80, borderRadius: 100, display: 'flex', justifyContent: 'center' }}>
                                <Avatar alt={says.customerName} src={`/PublicHome/FeedbackCustomers/${says.avatar}`} sx={{ width: 80, height: 80 }} />
                            </Paper>
                        </Box>
                        <Box>
                            <Box>
                                <Box sx={{}}>
                                    <Image src={`/PublicHome/${process.env.NEXT_PUBLIC_ORG}/QuoteEnd.png`} loading="lazy" layout='fixed' alt="Analyst" width={30} height={30} />
                                </Box>
                                <Box sx={{ mb: 2, textAlign: textAlign || 'left' }}>
                                    <Typography variant="body1" component="span" sx={{ fontSize: 18 }}>{says.thoughts}</Typography>
                                </Box>
                                <Box sx={{ mb: 2, textAlign: textAlign || 'left' }}>
                                    <Typography variant="body1" component="span" sx={{ fontSize: 18, fontWeight: 'bold' }}>-{says.customerName}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}