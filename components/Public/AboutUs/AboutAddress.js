import { Box } from "@mui/material";
import Image from 'next/image';

export default function AboutAddress() {
    return (
        <Box sx={{ mb: { xs: 0, sm: -6, md: -9 } }}>
            <Box sx={{ position: 'relative', alignItems: 'center', textAlign: 'center', height: 610 }}>
                <Image src={`/${process.env.NEXT_PUBLIC_ORG}/AboutUs/Map.png`} loading="lazy" layout='fill' alt='Map' />
            </Box>
        </Box>
    )
}