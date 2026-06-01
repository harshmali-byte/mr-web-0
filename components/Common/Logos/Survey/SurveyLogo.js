import React from 'react';
import Image from 'next/image';

export default function SurveyLogo({ logoWidth, logoHeight, surveyId, clientName }) {
    return (
        <Image src={`/Survey/BrandClientLogos/${clientName.replaceAll(' ', '')}.png`} alt={`${clientName} Logo`} width={logoWidth || 100} height={logoHeight || 60}
            onClick={() => window.location.href = "/"}
            priority={true}
            as="image"
        />
    )
}