import React from 'react';
import { Box, Typography, Container, Paper } from "@mui/material";
import MAImageBox from './MAImageBox';
import { useTheme } from '@mui/material/styles';

export default function MATrxTypes() {
    const theme = useTheme();

    function TypeItem({ title, description }) {
        return (
            <Box>
                <Typography variant='body2' sx={{ fontWeight: 'bold', mt: 1, mb: 0.5 }} >
                    {title}
                </Typography>
                <Typography variant='body2' component='div' sx={{ color: theme.custom.greyText }}>
                    {description}
                </Typography>
            </Box>
        )
    }

    function BuildDescription() {
        return (
            <Box>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    The top transactions covered under the category of M&A are:
                </Typography>
                <TypeItem title="Merger" description={`A merger is a business arrangement in which two or more firms combine their resources to form a new, legitimate company. For instance, in 2015, DuPont and Dow Chemical joined forces to become the world's largest chemical company, generating an annual revenue of $86 billion in 2018. However, in 2019, the business was split into three separate entities, each focusing on different areas.`} />
                <TypeItem title="Acquisition" description={`An acquisition occurs when one company buys a majority stake in another, referred to as the target company. In 2021, Salesforce acquired Slack for $27.7 billion, making it the second-largest software company acquisition of all time.`} />
                <TypeItem title="Consolidation"
                    description={
                        <Box sx={{ color: theme.custom.greyText }}>
                            <Typography variant='body2'>
                                {`Consolidation is a business restructuring process that combines two or more companies into a single entity. This process is typically done in order to reduce costs, increase efficiency, and create a stronger entity that is better positioned to compete in the marketplace.`}
                            </Typography>
                            <Typography variant='body2'>
                                {`The new entity usually has a new name, and the assets, liabilities, and operations of the former companies are combined. For instance, Sandoz and Ciba Geigy, two Swiss pharmaceutical companies, merged to form Novartis.`}
                            </Typography>
                        </Box>
                    }
                />
            </Box>
        )
    }

    return (
        <Container sx={{ mt: 5, mb: 2 }}>
            <Paper elevation={4} sx={{ p: 3 }}>
                <MAImageBox imgSrc="/Services/M_A/TypesOfM_ATransactions.png" imgAlt="Types of M&A Transactions"
                    title="Types of Mergers and Acquisitions (M&A) Transactions" description={<BuildDescription />}
                    imgHeight={{ xs: 180, sm: 320, md: 250 }}
                    xsImgGridItemSize={6} xsDescGridItemSize={6}
                    smImgGridItemSize={6} smDescGridItemSize={6}
                    mdImgGridItemSize={3} mdDescGridItemSize={9}
                />
            </Paper>
        </Container>
    )
}