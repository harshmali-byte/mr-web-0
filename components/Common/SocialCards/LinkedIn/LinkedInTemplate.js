import React, { useState } from 'react';
import { Tooltip, Link, Grid, Typography, Card } from '@mui/material';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function LinkedInTemplate({ imageName, name, email, mobile, linkedInUrl, lgW }) {
    const [copyEmailTooltip, setCopyEmailTooltip] = useState('Click to copy email id');
    const [copyMobileTooltip, setCopyMobileTooltip] = useState('Click to copy mobile number');

    function redirectToLinkedIn() {
        window.open(linkedInUrl);
    }

    function copyEmailText(text) {
        navigator.clipboard.writeText(text);
        setCopyEmailTooltip('Email Copied');
    }

    function copyMobileText(text) {
        navigator.clipboard.writeText(text);
        setCopyMobileTooltip('Mobile Number Copied');
    }

    return (
        <Grid item xs={12} md={12} lg={lgW || 9}>
            <Card elevation={2}>
                <Grid container>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'stretch', position: 'relative', cursor: 'pointer' }} onClick={redirectToLinkedIn}>
                        <Image src={`/LinkedInProfile/${imageName}.png`} alt={imageName} layout="fill" priority="true" />
                    </Grid>
                    <Grid item container xs={8} sx={{ pb: 2, pt: 1, pl: 2, pr: 2 }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}><Link href={linkedInUrl} target="_blank" ><LinkedInIcon color="info" /></Link></Grid>
                        <Grid item xs={12}><Typography variant='body' component='span' sx={{ fontSize: { xs: 20, sm: 30, cursor: 'pointer' } }} onClick={redirectToLinkedIn}>{name}</Typography></Grid>
                        <Grid item xs={12}><Typography variant='caption' component='span'>Business Development</Typography></Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <EmailIcon style={{ fontSize: 10, marginRight: 3 }} />
                            <Tooltip title={copyEmailTooltip} onClose={() => setCopyEmailTooltip('Click to copy email id')}>
                                <Typography variant='caption' component='span' sx={{ cursor: 'pointer' }} onClick={() => copyEmailText(email)}>{email}</Typography>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <PhoneIcon style={{ fontSize: 10, marginRight: 3 }} />
                            <Tooltip title={copyMobileTooltip} onClose={() => setCopyMobileTooltip('Click to copy mobile number')}>
                                <Typography variant='caption' component='span' sx={{ cursor: 'pointer' }} onClick={() => copyMobileText(mobile)}>{mobile}</Typography>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}