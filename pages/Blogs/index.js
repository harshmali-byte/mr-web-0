import React from 'react';
import fetchBlogs from '../../components/SSR/Blogs';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const BlogList = dynamic(() => import('../../components/Public/Blog/BlogList'));

export default function Blogs({ pageNo, response }) {
    return (
        <PublicLayout>
            <BlogList pageNo={pageNo} response={response} />
        </PublicLayout>
    )
}

export async function getServerSideProps({ params }) {
    return await fetchBlogs(params);
}