import React from 'react';
import { Box, Typography, Container, Paper } from "@mui/material";
import MABox from './MABox';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';

export default function MAValuation() {
    const theme = useTheme();

    function TypeItem({ description }) {
        return (
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <CircleIcon sx={{ fontSize: 6 }} />
                </Box>
                <Box sx={{ ml: 1 }}>
                    <Typography variant='body2' component='span' sx={{ color: theme.custom.greyText, mr: 0.5 }}>{description}</Typography>
                </Box>
            </Box>
        )
    }

    function BuildDescription() {
        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant='body2' sx={{ mt: 0 }}>
                    {`Valuation involves analyzing the financials, market trends, and competitive landscape of the target company to determine its worth. The acquirer and target may use a variety of methods, such as discounted cash flow, comparable companies' analysis, and asset-based valuation, to determine the company's value. Ultimately, the parties negotiate a price that is fair for both sides.`}
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Some of the methods used for valuation are:`}
                </Typography>
                <TypeItem description="Price-to-Earnings Ratio (P/E Ratio)" />
                <TypeItem description="Enterprise-Value-to-Sales Ratio (EV/Sales)" />
                <TypeItem description="Discounted Cash Flow (DCF)" />
                <TypeItem description="Replacement Cost" />
                <TypeItem description="Comparable Transaction Analysis" />
            </Box>
        )
    }

    return (
        <Container sx={{ mt: 5, mb: 2 }}>
            <Paper elevation={4} sx={{ p: 3 }}>
                <MABox imgSrc="/Services/M_A/ValuationsOfM_A.png" imgAlt="M & A Financed" title="Valuation of Merger and Acquisitions" description={<BuildDescription />} imgHeight={{ xs: 55, sm: 100, md: 80 }} />
            </Paper>
        </Container>
    )
}