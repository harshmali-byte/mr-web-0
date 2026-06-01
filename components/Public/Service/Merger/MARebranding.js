import React from 'react';
import { Grid, Box, Typography, Container, Paper } from "@mui/material";
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import MASectionTitle from './Sections/MASectionTitle';

const useStyles = makeStyles((theme) => ({
    circle: {
        border: `1px solid ${theme.palette.secondary.main}`,
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        color: theme.palette.info.main,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        fontWeight: 'bold',
        top: 3,
        left: 3
    },
}));

export default function MARebranding() {
    const theme = useTheme();
    const classes = useStyles();

    function TypeItem({ number, description }) {
        return (
            <Box sx={{ p: 1 }}>
                <Box sx={{ position: 'relative' }}>
                    <Paper className={classes.circle}>{number}</Paper>
                </Box>
                <Paper elevation={0} variant="outlined" sx={{ m: 2, p: 2 }}>
                    <Typography variant='body2'>{description}</Typography>
                </Paper>
            </Box>
        )
    }
    return (
        <Container sx={{ mb: 2 }}>
            <Paper elevation={4}>
                <Grid container sx={{ mt: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Grid item xs={12}>
                        <MASectionTitle title="Is Rebranding Necessary?" />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{ mt: 2 }}>
                        <Box sx={{ textAlign: 'center', color: theme.custom.greyText, p: 1 }}>
                            <Typography variant='title'>
                                {`Choosing an appropriate name for the new firm formed through an M&A is essential for its long-term success. There are four options; each has its own set of pros and cons.`}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: { xs: 'column', lg: 'row' } }}>
                        <Grid item xs={12} md={12} lg={4}>
                            <TypeItem number={1} description={`Keeping both names and operating as one company: This strategy is used when the two companies have complementary strengths and both names have strong brand equity. For example, the merger between Citigroup and Travelers Group in 1998 saw the resulting company being known as Citigroup.`} />
                            <TypeItem number={2} description={`Merging two names: This is when two names are combined to create a new one. An example of this is the merger of Chase Manhattan Bank and J.P. Morgan & Co., which created JPMorgan Chase & Co.`} />
                        </Grid>

                        <Grid item xs={12} md={12} lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Image src='/Services/M_A/Rebranding.png' alt='Rebranding' height='300px' width='300px' />
                        </Grid>

                        <Grid item xs={12} md={12} lg={4}>
                            <TypeItem number={3} description={`Retaining one and discontinuing other: The other name is discontinued and all customers, assets, and liabilities are absorbed into the stronger brand. This strategy is used to increase brand visibility, customer loyalty and market share. It also helps to reduce costs by streamlining operations and eliminating redundancy.`} />
                            <TypeItem number={4} description={`Coming up with entirely new name: This is the most widely used way where the strategy is to create a new brand name. The best example of this is the merger of Bell Atlantic and GTE. The new company adopted the brand name "Verizon Communications" in order to reflect the combination of the two companies.`} />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}