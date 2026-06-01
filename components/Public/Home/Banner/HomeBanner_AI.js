
import { Box } from '@mui/material';
import styles from './HomeBanner.module.css';

export default function HomeBanner_AI() {
    return (
        <Box sx={{ position: 'relative' }}>
            <video id="background_video" autoPlay loop muted className={[styles.frontVideoStyle]}>
                <source type='video/mp4' src='/PublicHome/Banner.mp4' />
            </video>
        </Box>
    )
}