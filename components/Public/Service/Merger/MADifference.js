import React from 'react';
import { Box, Typography, Container, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import MABox from './MABox';

export default function MADifference() {
    const theme = useTheme();

    function BuildDescription() {
        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant='body2'>
                    M&A is a broad term encompassing all types of financial transactions in which one company acquires, merges with, or takes over another company. These transactions can range from a simple purchase of assets or shares to a complex series of transactions involving multiple companies.
                </Typography>
                <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                    The two terms are frequently used fungibly, but they take different meanings.
                </Typography>
                <Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <CircleIcon sx={{ fontSize: 6 }} />
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='body2' component='span' sx={{ color: theme.palette.info.main, mr: 0.5 }}>
                                Mergers
                            </Typography>
                            <Typography variant='body2' component='span' sx={{ color: theme.custom.greyText, mr: 0.5 }}>
                                usually involve two companies of roughly equal size, where each company contributes resources such as capital, assets, or personnel to the newly formed entity.
                            </Typography>
                            <Typography variant='body2' component='span' sx={{ color: theme.custom.greyText, fontStyle: 'italic' }}>
                                For example, in 2019, pharmaceutical giants Pfizer and Allergan merged in what is reported to be the largest healthcare deal ever, worth a reported $160 billion.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <CircleIcon sx={{ fontSize: 6 }} />
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='body2' component='span' sx={{ color: theme.palette.info.main, mr: 0.5 }}>
                                Acquisition
                            </Typography>
                            <Typography variant='body2' component='span' sx={{ color: theme.custom.greyText, mr: 0.5 }}>
                                is a process of buying a company or a business unit by obtaining more than 50% ownership of it. It involves various negotiations between the two parties and is usually done when the acquiring company believes that the purchase will provide value to the company, such as in the case of Walt Disney Co. and Pixar. Acquisition can be done through cash, stocks, or other forms of payment.KDS
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Container sx={{ mb: 2 }}>
            <Paper elevation={4} sx={{ p: 3 }}>
                <MABox imgSrc="/Services/M_A/DiffBetweenM_A.png" imgAlt="Differnce Between M&A" title="Difference Between Merger and Acquisition" description={<BuildDescription />} />
            </Paper>
        </Container>
    )
}