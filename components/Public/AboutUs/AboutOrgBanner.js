
import dynamic from 'next/dynamic';

const Banners = {
    AI: dynamic(import('./AI/AboutBanner')),
    MR: dynamic(import('./MR/AboutBanner')),
}

export default function AboutOrgBanner() {
    const Banner = Banners[process.env.NEXT_PUBLIC_ORG]
    return <Banner />
}