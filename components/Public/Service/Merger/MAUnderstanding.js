import React from 'react';
import { Box, Typography, Container, Paper } from "@mui/material";
import MAImageBox from './MAImageBox';

export default function MAUnderstanding() {
    function BuildDescription() {
        return (
            <Box>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Obliquely, a deal can be referred to as a "merger" when both CEOs mutually agree that coming together is the most beneficial option for both companies. An example of this is Facebook's acquisition of mobile messaging service WhatsApp for $19 billion.`}
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    Hostile takeovers are generally seen as acquisitions, though the distinction is that the target company in this case does not wish to be acquired. A notable example of this is when Vodafone acquired Mannesmann AG in 1999, paying a staggering $202.8 billion. In this case, Mannesmann AG had no choice but to accept the takeover and be acquired by Vodafone.</Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    The company that is attempting to take over the target is referred to as the acquirer, while the company that is being taken over is known as the target.
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    Additionally, M&A provides an opportunity to diversify product lines, expand into new markets, and gain access to cutting-edge technologies. It also helps in improving overall financial performance and reducing debts. Furthermore, it can help achieve greater market share and brand recognition, thus gaining a competitive edge.</Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    Despite the high cost and potential risks associated with mergers and acquisitions (M&A), many firms still choose to pursue them as a strategy for growth. Research has shown that approximately half of all M&A deals turn out to be unsuccessful, resulting in a negative impact on stock prices. Therefore, firms must carefully consider the potential return on investment before pursuing an M&A strategy.
                </Typography>
            </Box>
        )
    }

    return (
        <Container sx={{ mt: 5, mb: 2 }}>
            <Paper elevation={4} sx={{ p: 3 }}>
                <MAImageBox imgSrc="/Services/M_A/UnderstandingM_A.png" imgAlt="Understanding M&A" title="Understanding Mergers and Acquisitions (M&A)" description={<BuildDescription />} isRtl={true}
                    xsImgGridItemSize={5} xsDescGridItemSize={7}
                    smImgGridItemSize={4} smDescGridItemSize={8}
                    mdImgGridItemSize={3} mdDescGridItemSize={9}
                />
            </Paper>
        </Container>
    )
}