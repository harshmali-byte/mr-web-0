import React from 'react';
import Head from 'next/head';
import ErrorPage404 from '../404';

export default function ErrorCodePage({ code }) {

    function returnErrorPage() {
        switch (code) {
            case 404:
                return <ErrorPage404 />
            default:
                return <ErrorPage404 />
        }
    }

    function addHeaders() {
        return (
            <Head>
                <meta name="robots" content='noindex, nofollow' />
            </Head>
        )
    }

    return (
        <>
            {addHeaders()}
            {returnErrorPage()}
        </>
    )
}