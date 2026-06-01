import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeSectionTitle from '../../Public/Home/HomeSectionTitle';
import Carousel from 'react-simply-carousel';
import CustomerReviewHorizontal from './CustomerReviewHorizontal';
import CustomerReviewVertical from './CustomerReviewVertical';
import { HomeCustomerSaysData } from './HomeCustomerSaysData';

export default function CustomerReview({ isVertical, textAlign }) {
    const theme = useTheme();
    const [activeSlide, setActiveSlide] = useState(0);
    const [dotHeight, setDotHeight] = useState(13);
    const [dotWidth, setDotWidth] = useState(13);

    const updateSize = () => {
        if (window.innerWidth < 469) {
            setDotHeight(23);
            setDotWidth(20);
        }
        else if (window.innerWidth < 769) {
            setDotHeight(23);
            setDotWidth(20);
        }
        else if (window.innerWidth < 1025) {
            setDotHeight(13);
            setDotWidth(10);
        }
        else {
            setDotHeight(13);
            setDotWidth(10);
        }
    }

    useEffect(() => {
        updateSize();
    }, [])

    useEffect(() => {
        window.onresize = updateSize;
    }, []);

    function showCustomerSays() {
        return (
            HomeCustomerSaysData.map((says, index) => {
                return (
                    isVertical ? <CustomerReviewVertical says={says} key={index} textAlign={textAlign} /> : <CustomerReviewHorizontal says={says} key={index} textAlign={textAlign} />
                )
            })
        )
    }

    return (
        <Box>
            <Box sx={{ paddingBottom: { xs: 0, sm: 2 } }}>
                <HomeSectionTitle title="WHAT OUR" focusTitle="CUSTOMERS SAY" sxProps={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }} />
            </Box>
            <Container>
                <Box>
                    <Carousel
                        autoplay
                        delay={3000}
                        itemsToShow={2}
                        speed={400}
                        containerProps={{
                            width: { xs: 12 }
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
                        responsiveProps={[{ minWidth: 768, itemsToShow: 2 }, { maxWidth: 767, itemsToShow: 1 }]}
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
                        {showCustomerSays()}
                    </Carousel>
                </Box>
            </Container>
        </Box>
    )
}