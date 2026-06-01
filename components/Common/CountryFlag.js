import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const noFlagCountries = ['an', 'kv', 'tp'];

export default function CountryFlag({ countryCode, countryName, flagWidth, flagHeight, ...props }) {
    const [src, setSrc] = useState('');

    useEffect(() => {
        if (!countryCode) {
            return;
        }
        let flagSrc = noFlagCountries.indexOf(countryCode.toLowerCase()) >= 0 ? `/CountryFlags/svg/${countryCode.toLowerCase()}.svg` : `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
        setSrc(flagSrc);

    }, [countryCode])

    if (!src) {
        return null;
    }

    return (
        <Image
            src={src}
            alt={countryName ? countryName : countryCode}
            loading="lazy"
            placeholder='empty'
            width={flagWidth || 20} height={flagHeight || 15}
            {...props}
        />
    )
}