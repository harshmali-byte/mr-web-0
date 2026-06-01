
import dynamic from 'next/dynamic';

const Values = {
    AI: dynamic(import('./AI/Value/OurValue')),
    MR: dynamic(import('./MR/Value/OurValue')),
}

export default function AboutOrgValue() {
    const Value = Values[process.env.NEXT_PUBLIC_ORG]
    return <Value />
}