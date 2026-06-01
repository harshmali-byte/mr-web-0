import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const ServicesView = dynamic(() => import('../../components/Public/Service/ServicesView'));

export default function Services() {
    return (
        <PublicLayout isNotContainer={true}>
            <ServicesView />
        </PublicLayout>
    )
}