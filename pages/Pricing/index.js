import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const PricingView = dynamic(() => import('../../components/Public/Pricing/PricingView'));

export default function Pricing() {
    return (
        <PublicLayout isNotContainer={true}>
            <PricingView />
        </PublicLayout>
    )
}