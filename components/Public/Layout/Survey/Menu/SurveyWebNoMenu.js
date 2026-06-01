import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

const SurveyLogo = dynamic(() => import('../../../../Common/Logos/Survey/SurveyLogo'));

export default function SurveyWebNoMenu({ survey }) {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', pt: 1, pl: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Grid item xs={2} sx={{ position: 'absolute', left: 0 }} >
                    <SurveyLogo surveyId={survey.Id} clientName={survey.ClientName} logoWidth={230} logoHeight={120} />
                </Grid>
                <Grid item xs={10} sx={{ height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 9 }}>
                    <Typography variant='h1' sx={{ color: theme.palette.primary.main, fontSize: 30, textAlign: 'center', fontWeight: '900' }}>{survey.Name}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}