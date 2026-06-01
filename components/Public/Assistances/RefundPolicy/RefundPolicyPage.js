import React from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';
import Head from 'next/head'
import { OrgInfo } from '../../../Common/Constants';

export default function RefundPolicyPage() {
    function addHeaders() {
        return (
            <Head>
                <title>Refund Policy</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content={`Creating a market research report is a complex, diligent activity that entails thorough planning and preparation. The market reports sold in our website contains confidential data about various industry verticals.`} />
            </Head>
        )
    }

    return (
        <Card elevation={0}>
            <CardContent>
                {addHeaders()}
                <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                    Refund Policy
                </Typography>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="p" component="p" sx={{ mt: 2, mb: 2 }}>
                        Creating a market research report is a complex, diligent activity that entails thorough planning and preparation. The market reports sold in our website contains confidential data about various industry verticals. Therefore, we do not provide our clients with the option to return the reports or accept refund requests after procurement.  We request you to read the outline of the report you are opting for in advance, so as to make informed purchase decision. You can always speak to our support executives to get comprehensive insights on a report before deciding to purchase it. Under any circumstances, if you are no longer interested in the report, the terms and conditions of the payment will still apply.
                    </Typography>
                    <Typography variant="p" component="p" sx={{ mt: 2, mb: 2 }}>
                        {`When you place an order with ${OrgInfo.FullName}, we endeavour to deliver the product as soon as possible. Electronic delivery is always the fastest option. The Hard copy of products is generally dispatched from India, and delivery to some markets may be delayed through local carriers and local customs. Where possible we encourage clients to order products electronically. Some clients may witness a delay in delivery on account of the difference in time zones in such cases client agree to allow reasonable time to deliver the report. Please note that if you make your purchase over a weekend or holiday, you will be contacted the following business day. In case of additional requirements from the client's end, the seller might need a few more hours/days to dispatch the final report. ${OrgInfo.Name} usually provide its reports in 3-5 business days or as per decided timeline on emails (excluding weekends).`}
                    </Typography>
                </Paper>
            </CardContent>
        </Card>
    )
}