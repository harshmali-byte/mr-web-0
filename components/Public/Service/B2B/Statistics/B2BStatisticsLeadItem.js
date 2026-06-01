import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';

export default function B2BStatisticsLeadItem({ lead }) {

    function borderColor() {
        if (lead.statType === 'Hot') {
            return '#FF5938';
        }
        if (lead.statType === 'Warm') {
            return '#10C600';
        }
        if (lead.statType === 'Cold') {
            return '#375EF9';
        }
    }

    return (
        <Paper sx={{ borderRadius: '50%', border: `1px solid ${borderColor()}`, height: 170, width: 170, display: 'flex', justifyContent: 'center', alignItems: 'center' }} elevation={5}>
            <Grid container sx={{ textAlign: 'center', display: 'flex' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', my: 0, py: 0 }}>
                    <Image src={`/Services/B2BLead/${lead.statType}.png`} loading="lazy" layout='fixed' alt={lead.statType} width={40} height={40} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 0, py: 0 }}>
                    <Typography component='span' sx={{ fontSize: 40, fontWeight: 'bold', lineHeight: 1 }}>{lead.number}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 0, py: 0 }}>
                    <Typography component='span' sx={{ fontSize: 14, fontWeight: 'bold' }}>{`${lead.statType.toUpperCase()} LEADS`}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}