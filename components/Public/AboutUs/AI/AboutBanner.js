
import { Box } from '@mui/material';
import styles from '../AboutHeader.module.css';

export default function AboutBanner() {
    return (
        <Box sx={{ position: 'relative' }}>
            <video id="background_video" autoPlay loop muted className={[styles.frontVideoStyle]}>
                <source type='video/mp4' src={`/${process.env.NEXT_PUBLIC_ORG}/AboutUs/Banner.mp4`} />
            </video>
        </Box>
    )
}