import React from 'react';
import Image from 'next/image';

export default function BrandLogo({ logoWidth, logoHeight, showGrey }) {
    return (
        <Image src={showGrey ? `/BrandLogoGrey_${process.env.NEXT_PUBLIC_ORG}.gif` : `/BrandLogo_${process.env.NEXT_PUBLIC_ORG}.gif`} alt={`${process.env.NEXT_PUBLIC_DOMAIN} Logo`} loading="lazy" width={logoWidth || 60} height={logoHeight || 60} onClick={() => window.location.href = "/"} />
    )
}