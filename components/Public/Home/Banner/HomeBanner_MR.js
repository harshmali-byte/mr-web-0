
import { Box, useMediaQuery } from '@mui/material';
import styles from './HomeBanner.module.css';
import { useTheme } from '@mui/material/styles';

export default function HomeBanner_MR() {
    const theme = useTheme();

    function BuildImageContainer() {
        const isGreaterThanMDScreen = useMediaQuery(theme.breakpoints.up('md'));

        return (
            <Box className={[isGreaterThanMDScreen ? styles.frontImage_MR : styles.frontImageMobile_MR, styles.frontImageStyle]}></Box>
        )
    }

    return BuildImageContainer()
}