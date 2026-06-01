import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../../components/Public/Layout/PublicLayout'));
const B2BLeadView = dynamic(() => import('../../components/Public/Service/B2B/B2BLeadView'));

export default function B2BLead({ leadData, statData, blogsData }) {
    return (
        <PublicLayout isNotContainer={true}>
            <B2BLeadView leadData={leadData} statData={statData} blogsData={blogsData} />
        </PublicLayout>
    )
}


export async function getServerSideProps() {
    let leadRes = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ORG}/Services/B2BLead/B2BLeadServies.json`);
    let statRes = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ORG}/Services/B2BLead/B2BStats.json`);
    let blogsRes = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ORG}/Services/B2BLead/B2BBlogs.json`);
    let leadData = await leadRes.json()
    let statData = await statRes.json()
    let blogsData = await blogsRes.json()

    return {
        props: {
            leadData: leadData,
            statData: statData,
            blogsData: blogsData
        }
    }
}