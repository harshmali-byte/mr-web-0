import React from 'react';
import Error404 from '../components/Public/Errors/Error404';
import PublicLayout from '../components/Public/Layout/PublicLayout';

export default function ErrorPage404() {
    return (
        <PublicLayout>
            <Error404 />
        </PublicLayout>
    )
}