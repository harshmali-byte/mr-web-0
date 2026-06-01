import React from 'react';
import { Box, Typography, Container, Paper } from "@mui/material";
import MABox from './MABox';

export default function MAFinanced() {

    function BuildDescription() {
        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant='body2' sx={{ mt: 0 }}>
                    {`In cash transactions, the buyer will provide the seller with a lump sum of money in exchange for the seller's business. This money is most commonly paid in the form of cash, but it can also take the form of bonds, promissory notes, or other forms of financing. This form of financing is often more expensive than stock swaps, as the buyer must put out more money up front.`}
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Debt assumption is another way to finance an M&A deal. This involves the buyer taking over the seller's existing debt, instead of issuing new debt for the transaction. This can be beneficial for the buyer, as it allows them to avoid the costs associated with taking on new debt. However, it can also be risky, as the buyer must manage the existing debt and ensure that it is paid off on time.`}
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Finally, an M&A deal can be financed by acquiring another business's assets. This involves the buyer purchasing the assets of the seller and using those assets as collateral for the transaction. This can be beneficial for the buyer, as it can provide them with a more secure form of financing. However, it can also be risky, as the buyer must ensure that the assets are properly managed and that they are able to recoup it.`}
                </Typography>
            </Box>
        )
    }

    return (
        <Container sx={{ mt: 5, mb: 2 }}>
            <Paper elevation={4} sx={{ p: 3 }}>
                <MABox imgSrc="/Services/M_A/M_AFinanced.png" imgAlt="M & A Financed" title="How Are Merger and Acquisitions Financed?" description={<BuildDescription />} imgHeight={{ xs: 70, sm: 100, md: 80 }} />
            </Paper>
        </Container>
    )
}