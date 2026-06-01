import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

const SurveyLogo = dynamic(() => import('../../../../Common/Logos/Survey/SurveyLogo'));

export default function SurveyMobileNoMenu({ survey }) {
    const theme = useTheme();

    return (
        <Box className="mobile-menu" sx={{ flexGrow: 1, display: 'flex', mt: 1 }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <SurveyLogo surveyId={survey.Id} clientName={survey.ClientName} logoWidth={130} logoHeight={80} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='h1' sx={{ color: theme.palette.primary.main, fontSize: 20, textAlign: 'center' }}>{survey.Name}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}