import React from 'react';
import Head from 'next/head'
import ReportBuyForm from '../QueryForms/ReportBuyForm';

export default function ReportCheckout({ reportId, research, purchasePlan }) {
    function addHeaders() {
        if (!research) {
            return null;
        }

        return (
            <Head>
                <meta name="robots" content='noindex, nofollow' />
                {
                    research.PostKey
                        ? <title>{`Checkout_${research.PostKey}`}</title>
                        : <title>Checkout</title>
                }
            </Head>
        )
    }

    return (
        <>
            {addHeaders()}
            <ReportBuyForm postId={reportId} research={research} purchasePlan={purchasePlan} />
        </>
    )
}