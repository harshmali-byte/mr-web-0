import React from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';
import Head from 'next/head'
import { OrgInfo } from '../../../Common/Constants';

export default function DisclaimerPage() {

    function addHeaders() {
        return (
            <Head>
                <title>Disclaimer</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content={`This site is provided by ${OrgInfo.FullName} on an "as is" and "as available" basis. ${OrgInfo.FullName} makes no representations or warranties of any kind express or implied, as to the operation of this site or the information, content, materials, or products included on this site.`} />
            </Head>
        )
    }

    return (
        <Card elevation={0}>
            <CardContent>
                {addHeaders()}
                <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                    Disclaimer
                </Typography>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="p" component="p" sx={{ mt: 2, mb: 2 }}>
                        {`This site is provided by ${OrgInfo.FullName} on an "as is" and "as available" basis. ${OrgInfo.FullName} makes no representations or warranties of any kind express or implied, as to the operation of this site or the information, content, materials, or products included on this site. You expressly agree that your use of this site is at your individual risk. To the full extent permissible by applicable law, ${OrgInfo.FullName} disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose. ${OrgInfo.FullName} does not warrant that this site, its servers, or e-mail sent from ${OrgInfo.FullName} is free of viruses or other harmful components. ${OrgInfo.FullName} will not be liable for any damages of any kind arising from the use of this site, but not limited to direct, indirect, incidental, corrective, and consequential damages. This particular Disclaimer is subject to change and can be modified at any given point in terms to new policies or products made available.`}
                    </Typography>
                </Paper>
            </CardContent>
        </Card>
    )
}