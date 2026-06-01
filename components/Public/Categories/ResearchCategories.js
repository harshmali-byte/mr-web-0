import React from 'react';
import Head from 'next/head';
import { Paper } from '@mui/material';
import dynamic from 'next/dynamic';

const ResearchCategoriesListView = dynamic(() => import('./ResearchCategoriesListView'));

export default function ResearchCategories() {

    function addHeaders() {
        return (
            <Head>
                <title>Categories</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content="Categories" />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}Categories`} />
            </Head>
        )
    }

    return (
        <Paper elevation={0} sx={{ mt: 2 }}>
            {addHeaders()}
            <ResearchCategoriesListView />
        </Paper>
    )
}