import { Box, Container, Grid } from "@mui/material";
import NewsletterSubscribe from "../../../Common/Subscribe/NewsletterSubscribe";
import { useTheme } from '@mui/material/styles';

export default function AboutSubscribe() {
    const theme = useTheme();
    return (
        <Box sx={{ backgroundColor: theme.palette.secondary.main, pt: 2, pb: 2 }}>
            <Container>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={5}>
                        <NewsletterSubscribe />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}