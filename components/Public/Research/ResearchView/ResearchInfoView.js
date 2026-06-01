import React, { useState, useEffect } from 'react';
import { Paper, Grid, Box } from '@mui/material';
import { ApiHandler } from '../../../Api/ApiHandler';
import { Loader } from '../../../Common/Commons';
import styles from './Summary/ResearchSummaryView.module.css';
import { useTheme } from '@mui/material/styles';

export default function ResearchInfoView({ Research, InfoType, tableOfContent, setTableOfContent }) {
    const theme = useTheme();
    const [Info, setInfo] = useState(tableOfContent);
    const [IsLoading, setIsLoading] = useState(false);
    const [Message, setMessage] = useState(null);

    let abortController = new AbortController();

    useEffect(() => {
        if (!Research || !Research.Id || Research.Id <= 0 || tableOfContent) {
            return;
        }
        fetchResearchInfo();

        return (() => {
            abortController.abort();
        })

    }, [Research])

    useEffect(() => {
        if (!Info) {
            return;
        }

        let researchLoaded = setInterval(function () {
            let container = document.querySelector("#researchPostInfo");

            if (!container) {
                return;
            }
            clearInterval(researchLoaded);
            let images = container.querySelectorAll('.img');
            if (images && images.length > 0) {
                images.forEach((img) => {
                    fetchImage(img);
                });
            }
        }, 500)

    }, [Info])

    function fetchImage(img) {
        if (!img) {
            return;
        }

        let model = new Object();
        model.SearchText = img.attributes['src'].value;
        model.Id = Research.Id;
        model.InfoType = InfoType;
        let height = img.attributes['imgHeight'] && img.attributes['imgHeight'].value ? img.attributes['imgHeight'].value : 200;
        let width = img.attributes['imgWidth'] && img.attributes['imgWidth'].value ? img.attributes['imgWidth'].value : 200;
        let imgCss = img.attributes['imgCss'] && img.attributes['imgCss'].value ? img.attributes['imgCss'].value : '';

        ApiHandler.ApiService.PostDownloadCancellable(model, ApiHandler.ApiUrls.Research.GetImage)
            .then(
                (result) => {
                    try {
                        if (result) {
                            img.innerHTML =
                                `<div class=${styles.researchPostSummaryImageContainer}>
                                    <img src="${URL.createObjectURL(result)}"
                                        alt="${img.attributes['alt'].value}" height="${height}" width="${width}" style="${imgCss}" />
                                    <div class=${styles.researchPostSummaryImageButtons}>
                                        <a href=/Checkout?report_id=${Research.Id} target="_blank"
                                            style="background-color: ${theme.palette.primary.main}">Buy Now</a>
                                        <a href=/requestSample/PostId/${Research.Id} target="_blank"
                                            style="background-color: ${theme.palette.themeColor.main}">Get Sample Report Now</a>
                                    </div>
                                </div>`;
                        }
                    }
                    catch {
                    }
                });
    }

    function fetchResearchInfo() {
        setIsLoading(true);

        let model = new Object();
        model.Id = Research.Id;
        model.InfoType = InfoType;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.ResearchInfo.GetInfoById, abortController)
            .then(
                (result) => {
                    setIsLoading(false);

                    if (abortController.signal.aborted) {
                        return;
                    }

                    if (!result || !result.IsSuccess) {
                        setTableOfContent(null);
                        setInfo(null);
                        setMessage({ Message: "Unable to find research post. Please contact sales team", Severity: 'error' });
                        return;
                    }

                    if (!result.Data) {
                        setTableOfContent(null);
                        setInfo(null);
                        return;
                    }

                    setTableOfContent(result.Data[InfoType]);
                    setInfo(result.Data[InfoType]);
                },
                (error) => {
                    console.log(error);
                    setMessage({ Message: "Error occurred to find research. Please contact sales team", Severity: 'error' });
                }
            )
    }

    function showInfo() {
        if (IsLoading) {
            return <Loader />
        }
        return <div id="researchPostInfo" dangerouslySetInnerHTML={{ __html: Info }} />
    }

    if (!Info) {
        return null;
    }

    return (
        <div>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'row' }, mt: { xs: 2, lg: 0 } }}>
                <Grid item xs={12} lg={12}>
                    <Box className={styles.researchPostSummary}>
                        <Paper elevation={5} sx={{ p: 2, display: { xs: 'none', md: 'block' } }}>
                            {showInfo()}
                        </Paper>
                        <Box sx={{ p: 0, display: { xs: 'block', md: 'none' } }}>
                            {showInfo()}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}