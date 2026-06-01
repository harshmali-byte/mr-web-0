import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import AnimTopBox from '../AnimBoxes/AnimTopBox';
import { useTheme } from '@mui/material/styles';

export default function CustomerReviewVertical({ says, textAlign }) {
    const theme = useTheme();

    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 6 } }}>
            <AnimTopBox>
                <Box xs={12}>
                    <Paper elevation={5} sx={{ width: { xs: 280, md: 400, lg: 500 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, textAlign: textAlign || 'left' }}>
                            <Box>
                                <Paper elevation={5} sx={{ width: 80, borderRadius: 100 }}>
                                    <Avatar alt={says.customerName} src={`/PublicHome/FeedbackCustomers/${says.avatar}`} sx={{ width: 80, height: 80 }} />
                                </Paper>
                            </Box>
                            <Box sx={{ mt: 3, position: 'relative' }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body1" component="span" sx={{ fontSize: 18 }}>{says.thoughts}</Typography>
                                </Box>
                                <Box sx={{ '&:before': { content: '""', position: 'absolute', width: '100px', borderTop: `3px solid ${theme.palette.secondary.main}`, left: 'calc(50% - 50px)' } }}>
                                    <Box sx={{ mb: 2, pt: 2 }}>
                                        <Typography variant="body1" component="span" sx={{ fontSize: 18, fontWeight: 'bold' }}>{says.customerName}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </AnimTopBox>
        </Box>
    )
}