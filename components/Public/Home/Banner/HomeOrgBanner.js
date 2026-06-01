
import dynamic from 'next/dynamic';

const Components = {
    AI: dynamic(import('./HomeBanner_AI')),
    MR: dynamic(import('./HomeBanner_MR')),
}

export default function HomeOrgBanner() {
    const Component = Components[process.env.NEXT_PUBLIC_ORG]
    return <Component />
}