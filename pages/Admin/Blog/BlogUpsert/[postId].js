import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../../../components/Common/Loader';
import UpsertBlog from '../../../../components/Admin/Blog/UpsertBlog';

export default function BlogUpsert() {
    const router = useRouter();
    const { postId } = router.query;

    const [blogPostId, setBlogPostId] = useState(0);

    useEffect(() => {
        if (!postId) {
            setBlogPostId(0);
            return;
        }

        setBlogPostId(postId);
    }, [postId])

    if (!blogPostId || parseInt(blogPostId) <= 0) {
        return <Loader />
    }

    return (
        <UpsertBlog postId={blogPostId} />
    )
}