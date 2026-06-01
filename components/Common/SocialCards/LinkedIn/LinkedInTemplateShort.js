import React, { useState } from 'react';
import { Tooltip, Link, Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import AnimTopBox from '../../AnimBoxes/AnimTopBox';

export default function LinkedInTemplate({ imageName, name, email, mobile, linkedInUrl, lgW, designation }) {
    const [copyTooltip, setCopyTooltip] = useState('Click to copy email id');

    function redirectToLinkedIn() {
        window.open(linkedInUrl);
    }

    function copyText(text) {
        navigator.clipboard.writeText(text);
        setCopyTooltip('Email Copied');
    }

    return (
        <Grid item xs={12} md={12} lg={lgW || 9} sx={{}}>
            <AnimTopBox>
                <Box elevation={0} variant="outlined" sx={{ px: 2, py: 1 }}>
                    <Grid container>
                        <Grid item container xs={12}>
                            <Grid item xs={3} sx={{ cursor: 'pointer' }} onClick={redirectToLinkedIn}>
                                <Image src={`/LinkedInProfile/${imageName}Short.png`} alt={imageName} layout="fixed" width={50} height={50} priority="true" />
                            </Grid>
                            <Grid container item xs={9}>
                                <Grid item xs={11} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='body' component='span' sx={{ fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }} onClick={redirectToLinkedIn}>{name}</Typography>
                                    <Typography variant='span' component='span' sx={{ fontSize: 12, color: '#3B3B3B' }}>{designation}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Link href={linkedInUrl} target="_blank" ><LinkedInIcon color="info" /></Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon style={{ fontSize: 12, marginRight: 3 }} />
                            <Tooltip title={copyTooltip} onClose={() => setCopyTooltip('Click to copy email id')}>
                                <Typography variant='caption' component='span' sx={{ cursor: 'pointer' }} onClick={() => copyText(email)}>{email}</Typography>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
            </AnimTopBox>
        </Grid>
    )
}