import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BlogViewVertical from '../../../../Common/Blog/BlogViewVertical';
import HomeSectionTitle from '../../../Home/HomeSectionTitle';
import Carousel from 'react-simply-carousel';

export default function B2BBlogs({ Data }) {
    const theme = useTheme();
    const [activeSlide, setActiveSlide] = useState(0);
    const [dotHeight, setDotHeight] = useState(13);
    const [dotWidth, setDotWidth] = useState(13);
    const [cardWidth, setCardWidth] = useState(250);

    const updateSize = () => {
        if (window.innerWidth < 469) {
            setDotHeight(23);
            setDotWidth(20);
            setCardWidth(window.innerWidth);
        }
        else if (window.innerWidth < 769) {
            setDotHeight(23);
            setDotWidth(20);
            setCardWidth(window.innerWidth / 2);
        }
        else if (window.innerWidth < 1025) {
            setDotHeight(13);
            setDotWidth(10);
            setCardWidth(window.innerWidth / 4);
        }
        else {
            setDotHeight(13);
            setDotWidth(10);
            setCardWidth(window.innerWidth / 5);
        }
    }

    useEffect(() => {
        updateSize();
    }, [])

    useEffect(() => {
        window.onresize = updateSize;
    }, []);

    function showItems() {
        return (
            Data.map((data, index) => {
                return (
                    <BlogViewVertical data={data} key={index} width={cardWidth} />
                )
            })
        )
    }

    return (
        <Box>
            <Box sx={{ py: 4 }}>
                <HomeSectionTitle title="" focusTitle="Blogs" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={10} md={7} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography component="div" variant="span" sx={{ textAlign: 'center' }}>Providing services to a wide range of industries. Our lead generation capabilities can be leveraged across multiple industries, including</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Container>
                <Box>
                    <Carousel
                        autoplay
                        delay={3000}
                        itemsToShow={3}
                        speed={400}
                        containerProps={{
                            display: 'flex'
                        }}
                        activeSlideIndex={activeSlide}
                        forwardBtnProps={{
                            children: ">",
                            style: {
                                display: 'none'
                            }
                        }}
                        backwardBtnProps={{
                            children: "<",
                            style: {
                                display: 'none'
                            }
                        }}

                        onRequestChange={setActiveSlide}
                        hideNavIfAllVisible
                        disableNavIfAllVisible
                        disableNavIfEdgeActive
                        responsiveProps={[{ minWidth: 768, itemsToShow: 3 }, { maxWidth: 767, itemsToShow: 1 }]}
                        dotsNav={{
                            show: true,
                            itemBtnProps: {
                                style: {
                                    height: dotHeight,
                                    width: dotWidth,
                                    border: 1,
                                    borderColor: '#707070',
                                    borderStyle: 'solid',
                                    margin: 5,
                                    borderRadius: "50%",
                                    background: "transparent"
                                }
                            },
                            activeItemBtnProps: {
                                style: {
                                    height: dotHeight,
                                    width: dotWidth,
                                    border: 1,
                                    borderColor: theme.palette.themeColor.light,
                                    borderStyle: 'solid',
                                    margin: 5,
                                    borderRadius: "50%",
                                    background: theme.palette.themeColor.main,
                                }
                            }
                        }}
                    >
                        {showItems()}
                    </Carousel>
                </Box>
            </Container>
        </Box>
    )
}