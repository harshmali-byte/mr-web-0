import React from 'react';
import Image from 'next/image';
import { Box, Typography } from "@mui/material";
import styles from './service.module.css';
// import dynamic from 'next/dynamic';
import HomeSectionTitle from '../Home/HomeSectionTitle';

// const HomeSectionTitle = dynamic(() => import('../Home/HomeSectionTitle'));

export default function Service3DFramework() {
    return (
        <Box className={[styles.FrameworkImage]}
            sx={{ mb: 2, textAlign: 'center', p: 1, pt: 3 }}>
            <HomeSectionTitle title="3D" focusTitle="FRAMEWORK" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />

            <Typography variant='body' sx={{ mt: 1, p: 1 }}>
                The Framework for Your Next Big Move
            </Typography>
            <Box sx={{ p: 2 }}>
                <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Services/3D_Framework.png`} alt='3D Framework' height='200px' width='500px' />
            </Box>
        </Box>
    )
}