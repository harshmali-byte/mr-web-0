import React from 'react';
import Image from 'next/image';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const SegmentItem = dynamic(() => import('./SegmentItem'));
const MarketItem = dynamic(() => import('./MarketItem'));
const RegionCountries = dynamic(() => import('./RegionCountries'));

export default function ResearchSegments({ Research }) {
    if (!Research) {
        return null;
    }

    return (
        <Grid container spacing={3} className={`Segment_${process.env.NEXT_PUBLIC_ORG}`}>
            <SegmentItem body={Research.Segments} title="Segments" iconImage={<Image src={`/${process.env.NEXT_PUBLIC_ORG}/Research/Segmentation.png`} width={40} height={40} alt="Segmentation" />} />
            <RegionCountries />
            <MarketItem body={Research.MarketPlayers} title="Key Players" iconImage={<Image src={`/${process.env.NEXT_PUBLIC_ORG}/Research/Company.png`} width={40} height={40} alt="Company" />} />
        </Grid>
    )
}