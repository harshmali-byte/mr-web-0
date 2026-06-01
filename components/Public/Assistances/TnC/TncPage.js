import React from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';
import Head from 'next/head'
import { OrgInfo } from '../../../Common/Constants';
import { TncData } from './TnCData';
import TnCItem from './TnCItem';

export default function TncPage() {

    function addHeaders() {
        return (
            <Head>
                <title>Terms and conditions</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content={`${OrgInfo.FullName} and its affiliates provide their services to you subject to the following conditions. If you visit or shop at brandessenceresearch.com, you accept these conditions`} />
            </Head>
        )
    }

    return (
        <Card elevation={0}>
            <CardContent>
                {addHeaders()}
                <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                    Terms And Conditions
                </Typography>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="p" component="p" sx={{ mt: 2, mb: 2 }}>
                        {OrgInfo.FullName} and its affiliates provide their services to you subject to the following conditions. If you visit or shop at brandessenceresearch.com, you accept these conditions. Please read them carefully. We reserve the right from time to time to make changes to these Terms and Conditions at our absolute discretion. The Terms and Conditions applying to each transaction with us are those which are available on the website at the time that you place your order and it is your responsibility to check the Terms and Conditions before placing an order.
                    </Typography>
                    {
                        TncData.map((data, index) => {
                            return <TnCItem key={`tncItem_${index}`} data={data} />
                        })
                    }
                </Paper>
            </CardContent>
        </Card>
    )
}