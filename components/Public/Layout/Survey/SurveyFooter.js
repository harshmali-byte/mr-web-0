import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import { OrgInfo } from '../../../Common/Constants';
import { format } from 'date-fns';

export default function SurveyFooter() {
    const theme = useTheme();

    function HideOnScroll(props) {
        const { children, window } = props;

        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
        });

        return (
            <Slide appear={false} direction="up" in={!trigger} sx={{ display: trigger ? 'flex' : 'none', justifyContent: 'flex-start', mt: 1, mb: 1 }}>
                <AppBar sx={{ position: trigger ? 'fixed' : 'relative', top: 'auto', bottom: 0 }}>
                    {children}
                </AppBar>
            </Slide>
        );
    }

    return (
        <Grid item xs={12} sx={{ mt: { xs: 12, sm: 3 } }}>
            <Box sx={{ backgroundColor: theme.palette.primary.main }}>
                <AppBar sx={{ position: 'fixed', top: 'auto', bottom: 0 }}>
                    <Container sx={{ py: 0.5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Box sx={{}}>
                            <Typography sx={{ color: theme.palette.primary.contrastText, textAlign: 'center' }}>
                                &#169; Copyright {new Date().getFullYear()}-{format(new Date().setFullYear(new Date().getFullYear() + 1), 'yy')} {OrgInfo.FullNamePvtLtd}. All Rights Reserved | Designed by {OrgInfo.Name}
                            </Typography>
                        </Box>
                    </Container>
                </AppBar>
            </Box>
        </Grid>
    )
}