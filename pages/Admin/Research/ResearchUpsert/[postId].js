import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UpsertResearch from '../../../../components/Admin/Research/UpsertResearch';
import Loader from '../../../../components/Common/Loader';

export default function ResearchUpsert() {
    const router = useRouter();
    const { postId } = router.query;

    const [researchPostId, setResearchPostId] = useState(0);

    useEffect(() => {
        if (!postId) {
            setResearchPostId(0);
            return;
        }

        setResearchPostId(postId);
    }, [postId])

    if (!researchPostId || parseInt(researchPostId) <= 0) {
        return <Loader />
    }

    return (
        <UpsertResearch postId={researchPostId} />
    )
}