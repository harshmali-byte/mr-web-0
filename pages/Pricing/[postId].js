import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const PricingView = dynamic(() => import('../../components/Public/Pricing/PricingView'));
const Loader = dynamic(() => import('../../components/Common/Loader'));

export default function PricingPostId() {
    const router = useRouter();
    const { postId } = router.query;
    const [pId, setPId] = useState(null);

    useEffect(() => {
        if (!postId) {
            return;
        }

        setPId(postId);
    }, [postId])

    if (!pId) {
        return (
            <Loader />
        )
    }

    return (
        <PublicLayout isNotContainer={true}>
            <PricingView postId={postId} />
        </PublicLayout>
    )
}