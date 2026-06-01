import React from 'react';
import { Grid, Box, Typography, Container, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MABox from './MABox';

export default function MATypes() {
    const theme = useTheme();

    function TypeItem({ title, description }) {
        return (
            <Box>
                <Typography variant='body2' sx={{ mt: 1.5, fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant='body2' sx={{ color: theme.custom.greyText }}>
                    {description}
                </Typography>
            </Box>
        )
    }

    function BuildDescription() {
        return (
            <Grid item xs={12} md={12}>
                <Box>
                    <TypeItem title="Congeneric" description="The merger of Mobilink Telecom Inc. and Broadcom in 2002 is a perfect example of concentricity. It is permissible for the two entities, both of which are from the hardware business, to combine their respective expertise." />
                    <TypeItem title="Market Extension" description="The merger of Eagle Bancshares Inc. and RBC Centura in 2002 shows the market expansion. It allowed RBC to expand its operations in the North American market." />
                    <TypeItem title="Conglomerate" description="The merger of Walt Disney Co. and ABC Inc. in 1995 shows a conglomerate. Walt Disney had a stake in media outlets while ABC Inc. participated in the transmission broadcasting company." />
                    <TypeItem title="Horizontal" description="The merger of Compaq and Hewlett-Packard (HP) in 2001 is an example of horizontal merger. This deal resulted in the formation of a world-leading innovation giant which was valued at over $87 billion." />
                    <TypeItem title="Vertical" description="The merger of AOL and Time Warner in 2000 shows a vertical merger. Time Warner was involved in the data industry through CNN and Time Magazine, while AOL gathered data from the internet." />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant='title' sx={{ fontWeight: 'bold', color: theme.palette.info.main }}>
                        Which Type of M&A Is Right for You?
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                        {`Are you looking to expand into new markets, explore new products and services, or gain more capital? Then a vertical merger may be the right choice. No matter what type of merger you choose, it's important to make sure that both companies' cultures and business operations are compatible. A well-thought-out M&A strategy will help you determine the right type of merger for your company.`}
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                        If you are you looking to create new efficiencies and streamline your operations by joining with wholesalers or suppliers, then a vertical merger is what will help you in this.
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                        {`Mergers and acquisitions can be powerful tools for companies looking to grow and expand, but it is important to ensure that the type of transaction chosen will best support the company's overall strategy. It is wise to consult an expert advisor to assess the pros and cons of different types of mergers and acquisitions before making a decision. Doing so can help to ensure that the company will be able to make the most of the new opportunities that arise from the transaction.`}
                    </Typography>
                </Box>
            </Grid>
        )
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Paper elevation={4} sx={{ p: 2 }}>
                <MABox imgSrc="/Services/M_A/TypesOfM_A.png" imgAlt="Types of M&A" title="Types of Merger and Acquisition" description={<BuildDescription />} />
            </Paper>
        </Container>
    )
}