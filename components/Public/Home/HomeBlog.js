import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, CardActions, Paper } from '@mui/material';
import HomeSectionTitle from './HomeSectionTitle';
import { HomeBlogData } from './HomeBlogData';
import Carousel from 'react-simply-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Loader from '../../Common/Loader';

export default function HomeBlog() {
    const theme = useTheme();
    const [activeSlide, setActiveSlide] = useState(0);
    const [showNavigationButtons, setShowNavigationButtons] = useState(true);
    const [cardWidth, setCardWidth] = useState(240);
    const [isLoading, setIsLoading] = useState(true);

    const updateSize = () => {
        if (window.innerWidth <= 420) {
            setShowNavigationButtons(false);
            setCardWidth(window.innerWidth - 45)
        }
        else if (window.innerWidth <= 768) {
            setShowNavigationButtons(false);
            setCardWidth(window.innerWidth / 2 - 55)
        }
        else if (window.innerWidth <= 1280) {
            setShowNavigationButtons(false);
            setCardWidth(window.innerWidth / 3 - 65)
        }
        else {
            setShowNavigationButtons(true);
            setCardWidth(240)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        window.onresize = updateSize;
        updateSize();
    }, [])

    if (isLoading) return <Loader />

    return (
        <Box>
            <Box sx={{ pb: { xs: 0, sm: 2 }, mt: 7 }}>
                <HomeSectionTitle title="OUR TRENDING" focusTitle="BLOG" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
            </Box>
            <Container>
                <Carousel
                    containerProps={{
                        style: {
                            width: "100%",
                            justifyContent: "space-between",
                            userSelect: "text"
                        }
                    }}
                    activeSlideIndex={activeSlide}
                    activeSlideProps={{}}
                    onRequestChange={setActiveSlide}
                    responsiveProps={[{ minWidth: 1024, itemsToShow: 4 }, { maxWidth: 1024, itemsToShow: 3 }, { maxWidth: 920, itemsToShow: 2 }, { maxWidth: 767, itemsToShow: 2 }, { maxWidth: 400, itemsToShow: 1 }]}
                    backwardBtnProps={{
                        show: showNavigationButtons,
                        children: <Typography variant="span" component="span" sx={{
                            display: 'flex',
                            p: '6px 3px 6px 9px',
                            borderRadius: 25,
                            backgroundColor: '#E8E8E8',
                            color: '#747579'
                        }}>
                            <ArrowBackIosIcon sx={{ fontSize: 15 }} titleAccess="Previous" />
                        </Typography>,
                        style: {
                            borderWidth: 0,
                            backgroundColor: 'transparent',
                            alignSelf: "center"
                        }
                    }}
                    forwardBtnProps={{
                        show: showNavigationButtons,
                        children: <Typography variant="span" component="span" sx={{
                            display: 'flex',
                            p: '6px 5px 6px 6px',
                            borderRadius: 25,
                            backgroundColor: '#E8E8E8',
                            color: '#747579'
                        }}>
                            <ArrowForwardIosIcon sx={{ fontSize: 15 }} titleAccess="Next" />
                        </Typography>,
                        style: {
                            borderWidth: 0,
                            backgroundColor: 'transparent',
                            alignSelf: "center"
                        }
                    }}
                    dotsNav={{ show: false }}
                    speed={400}
                >
                    {
                        HomeBlogData.map((blog, index) => {
                            return (
                                <Box key={index} sx={{ p: { xs: 1, sm: 2, md: 3, lg: 1 }, display: 'flex', flex: 1 }}>
                                    <Card sx={{ width: cardWidth, display: 'flex', flexDirection: 'column' }} >
                                        <Paper sx={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', height: 250 }} elevation={0}>
                                            <Image src={`/PublicHome/Blog/${blog.image}`} loading="lazy" layout="fill" objectFit='cover' alt={blog.title} />
                                        </Paper>
                                        <CardContent sx={{ display: 'flex', flex: 1 }}>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: theme.custom.textColor }}>
                                                {blog.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ position: 'absolute', bottom: 1 }}>
                                            <Button variant="text" href={blog.url} target="_blank" disableRipple={true} sx={{ textDecoration: 'underline', mt: { xs: 1, sm: 0 }, "&.MuiButton-root:hover": { bgcolor: "transparent" } }} >
                                                Read More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            )
                        })
                    }
                </Carousel>
            </Container>
        </Box>
    )
}