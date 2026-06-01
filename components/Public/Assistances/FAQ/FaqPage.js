import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Head from 'next/head'
import FaqItem from "./FaqItem";
import { FaqData } from './FaqData';
import { OrgInfo } from '../../../Common/Constants';

export default function FaqPage() {

    function addHeaders() {
        return (
            <Head>
                <title>Customer FAQ</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content={`To learn more about our Research Reports and industry coverage, please visit our Frequently Asked Questions (FAQs) section curated with an aim to simplify your purchase decisions by providing you with comprehensive insights on our ${OrgInfo.FullName} Report, payment information, discounts, and licensing among others.`} />
            </Head>
        )
    }

    return (
        <Card elevation={0}>
            <CardContent>
                {addHeaders()}
                <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                    FAQ
                </Typography>
                {
                    FaqData.map((faq, index) => {
                        return <FaqItem key={`faqItem_${index}`} faq={faq} />
                    })
                }
            </CardContent>
        </Card>
    )
}