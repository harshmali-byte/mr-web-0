import React from 'react';
import { TabPanel } from '@mui/lab';
import { Link } from '@mui/material';

export default function HomeNewsAppearanceTabPanel({ children, value, index, url, ...other }) {
    return (
        <TabPanel value={value} sx={{ pl: { xs: 3, lg: 15 }, pr: { xs: 3, lg: 15 }, backgroundColor: '#E8E8E8' }}>
            <Link href={url} underline="none" target="_blank">{children}</Link>
        </TabPanel>
    )
}