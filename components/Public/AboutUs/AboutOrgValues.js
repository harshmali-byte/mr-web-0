
import dynamic from 'next/dynamic';

const Values = {
    AI: dynamic(import('./AI/Value/OurValues')),
    MR: dynamic(import('./MR/Value/OurValues')),
}

export default function AboutOrgValues() {
    const Value = Values[process.env.NEXT_PUBLIC_ORG]
    return <Value />
}