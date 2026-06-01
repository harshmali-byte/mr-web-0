import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Carousel from 'react-simply-carousel';
import { useTheme } from '@mui/material/styles';
import Loader from '../Loader';

export default function Clients({ gridRows }) {
    const theme = useTheme();
    const [activeSlide, setActiveSlide] = useState(0);
    const [logos, setLogos] = useState([]);
    const [gridItems, setGridItems] = useState(0);
    const [showDots, setShowDots] = useState(true);
    const [rows, setRows] = useState(0);

    useEffect(() => {
        let images = importAll(require.context('/public/PublicHome/AllClientLogos', false, /\.(png|jpe?g)$/));
        setLogos(images);
    }, [])

    useEffect(() => {
        updateSize();
    }, [rows])

    useEffect(() => {
        setRows(gridRows || 3);
    }, [])

    useEffect(() => {
        window.onresize = () => setRows(gridRows || 3);
    }, []);

    const updateSize = () => {
        if (window.innerWidth < 469) {
            setGridItems(rows * 2);
            setShowDots(false);
        }
        else if (window.innerWidth < 769) {
            setGridItems(rows * 3);
            setShowDots(true);
        }
        else if (window.innerWidth < 1025) {
            setGridItems(rows * 4);
            setShowDots(true);
        }
        else {
            setGridItems(rows * 6);
            setShowDots(true);
        }
    }

    function importAll(resource) {
        let images = [];
        resource.keys().map((item) => {
            images.push(item.replace('./', ''));
        });

        return images;
    }

    if (!logos || logos.length === 0 || gridItems === 0) {
        return (
            <Box>
                <Container>
                    <Loader />
                </Container>
            </Box>
        )
    }

    function getLogoRow(pageId) {
        let logoArray = logos.slice(((pageId - 1) * gridItems), (pageId * gridItems));
        return (
            <>
                {
                    logoArray.map((logo, index) => {
                        return (
                            <Grid key={`${pageId}-${index}`} item xs={6} sm={4} md={3} lg={2} sx={{}}>
                                <Box sx={{ position: 'relative', alignItems: 'center', textAlign: 'center' }}>
                                    <Image src={`/PublicHome/AllClientLogos/${logo}`} loading="lazy" layout='responsive' height={75} width={150} alt={logo} />
                                </Box>
                            </Grid>
                        )
                    })
                }
            </>
        )
    }

    function showLogos() {
        let pageCount = Math.ceil(logos.length / gridItems);
        let pages = Array.from({ length: pageCount }, (v, i, k) => i + 1);

        return pages.map((pageId) => {
            return (
                <Grid key={pageId} container spacing={{ xs: 5, sm: 10 }} sx={{ width: { xs: window.innerWidth - 40, sm: window.innerWidth - 60, md: window.innerWidth - 50, lg: 1100 } }}>
                    {
                        getLogoRow(pageId)
                    }
                </Grid>
            )
        })
    }

    return (
        <Carousel
            autoplay
            centerMode={true}
            delay={3000}
            itemsToShow={1}
            speed={400}
            containerProps={{
                style: {
                    width: "100%",
                    justifyContent: "space-between",
                    userSelect: "text"
                }
            }}
            activeSlideIndex={activeSlide}
            backwardBtnProps={{
                show: false
            }}
            forwardBtnProps={{
                show: false
            }}
            onRequestChange={setActiveSlide}
            dotsNav={{
                show: showDots,
                itemBtnProps: {
                    style: {
                        height: 3,
                        width: 30,
                        borderRadius: 1,
                        border: 1,
                        borderColor: theme.palette.secondary.main,
                        borderStyle: 'solid',
                        margin: 5,
                        marginTop: 20,
                        background: theme.palette.secondary.main,
                    }
                },
                activeItemBtnProps: {
                    style: {
                        height: 3,
                        width: 30,
                        borderRadius: 1,
                        border: 1,
                        borderColor: theme.palette.primary.main,
                        borderStyle: 'solid',
                        background: theme.palette.primary.main,
                        margin: 5,
                        marginTop: 20,
                    }
                }
            }}
        >
            {showLogos()}
        </Carousel>
    )
}