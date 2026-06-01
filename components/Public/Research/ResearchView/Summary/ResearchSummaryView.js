import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from '../Summary/ResearchSummaryView.module.css';
import { ApiHandler } from '../../../../Api/ApiHandler';
// import SummaryNavigation from '../../../../Common/SummaryNavigation';
import dynamic from 'next/dynamic';

const SummaryNavigation = dynamic(() => import('../../../../Common/SummaryNavigation'));

export default function ResearchSummaryView({ Research, hideImageActionButtons, fetchImageApi }) {
    const theme = useTheme();

    useEffect(() => {
        if (!Research || !Research.Summary) {
            return;
        }

        const container = document.querySelector("#researchPostSummary")

        let images = container.querySelectorAll('.img');
        //let segmentsContainer = container.querySelectorAll('.segments-viewer');

        if (images && images.length > 0) {
            images.forEach((img) => {
                FetchImage(img);
            });
        }

        if (!hideImageActionButtons) {
            let actionbuttons = container.querySelectorAll('.actionbuttons');

            if (actionbuttons && actionbuttons.length > 0) {
                actionbuttons.forEach((ab) => {
                    FetchActionButtons(ab);
                });
            }
        }

        // ShowSegments(segmentsContainer);

    }, [Research]);

    function FetchActionButtons(ab) {
        ab.innerHTML =
            `<div class=${styles.researchPostSummaryImageContainer}>
                ${ab.innerHTML}
               <div class=${styles.researchPostSummaryImageButtons}>
                    <a href=/requestsample/postid/${Research.Id} target="_blank"
                        style="background-color: ${theme.palette.info.main}">Get Sample Report Now</a>
                </div>
            </div>`;
    }

    function FetchImage(img) {
        if (!img || !img.attributes['src']) {
            return;
        }

        let model = new Object();
        model.SearchText = img.attributes['src'].value;
        model.Id = Research.Id;
        model.InfoType = 'Summary';
        let height = img.attributes['imgHeight'] && img.attributes['imgHeight'].value ? img.attributes['imgHeight'].value : 200;
        let width = img.attributes['imgWidth'] && img.attributes['imgWidth'].value ? img.attributes['imgWidth'].value : 200;
        let imgCss = img.attributes['imgCss'] && img.attributes['imgCss'].value ? img.attributes['imgCss'].value : '';

        ApiHandler.ApiService.PostDownloadCancellable(model, fetchImageApi)
            .then(
                (result) => {
                    try {
                        if (result) {
                            img.innerHTML =
                                `<div class=${styles.researchPostSummaryImageContainer}>
                                    <img src="${URL.createObjectURL(result)}"
                                        alt="${img.attributes['alt'].value}" height="${height}" width="${width}" style="${imgCss}" />
                                    ${hideImageActionButtons ? `` :
                                    `<div class=${styles.researchPostSummaryImageButtons}>
                                        <a href=/Checkout?report_id=${Research.Id} target="_blank"
                                            style="background-color: ${theme.palette.primary.main}">Buy Now</a>
                                        <a href=/requestSample/PostId/${Research.Id} target="_blank"
                                            style="background-color: ${theme.palette.themeColor.main}">Get Sample Report Now</a>
                                    </div>`
                                }
                                </div>`;
                        }
                    }
                    catch {
                    }
                });
    }

    function showSummary() {
        return <div id="researchPostSummary" dangerouslySetInnerHTML={{ __html: Research.Summary }} />
    }

    function BuildSummaryContainer() {
        const isGreaterThanMDScreen = useMediaQuery(theme.breakpoints.up('md'));
        const elevation = isGreaterThanMDScreen ? 5 : 0;
        const padding = isGreaterThanMDScreen ? 3 : 0;

        return (
            <Paper elevation={elevation} sx={{ p: padding }}>
                {showSummary()}
            </Paper>
        )
    }

    // function ShowSegments(segmentsContainer) {
    //     if (!segmentsContainer || segmentsContainer.length === 0) {
    //         if (setShowSegments) {
    //             setShowSegments(true);
    //         }

    //         return;
    //     }
    //     segmentsContainer.forEach(segCont => {
    //         //segCont.innerHTML = <div dangerouslySetInnerHTML={{ __html: <ResearchSegments Research={Research} /> }} />;
    //         //segCont.innerHTML = renderToString(<ResearchSegments Research={Research} />)
    //         segCont.innerHTML = `${renderToString(<ResearchSegments Research={Research} />)}`;
    //     })
    // }

    if (!Research || !Research.Summary) {
        return null;
    }

    return (
        <div>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'row' }, mt: { xs: 2, lg: 0 } }}>
                <Grid item xs={12} lg={9}>
                    <Box className={styles.researchPostSummary}>
                        {BuildSummaryContainer()}
                    </Box>
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Paper className={styles.researchPost} sx={{ p: 2, top: 50 }} elevation={0}>
                        <Paper elevation={0}>
                            <Typography variant="body1" component="span" sx={{ fontSize: 25 }}>SUMMARY</Typography>
                        </Paper>
                        <SummaryNavigation Research={Research} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}