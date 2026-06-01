import React, { useState, useEffect } from 'react';
import Script from "next/script";
import { Typography, Box, Grid } from '@mui/material';
import ResearchInfoModel from '../../../Models/Research/ResearchInfoModel';
import { ApiHandler } from '../../../Api/ApiHandler';
import { Loader } from '../../../Common/Commons';
import styles from './Summary/ResearchSummaryView.module.css';
import dynamic from 'next/dynamic';

const ResearchViewSeoFaqItem = dynamic(() => import('./ResearchViewSeoFaqItem'));

export default function ResearchViewSeo({ research }) {
    const [IsLoading, setIsLoading] = useState(false);

    const infoName = ['Faq', 'Ratings', 'Schemas'];
    const [model, setModel] = useState(null);

    let fetchInfoAbortController = new AbortController();

    useEffect(() => {
        fetchInfo();

        return (() => {
            fetchInfoAbortController.abort();
        })
    }, [])

    function fetchInfo() {
        if (!research || research.Id === 0) {
            setModel(new ResearchInfoModel(research));
            return;
        }

        setIsLoading(true);

        let model = new Object();
        model.Id = research.Id;
        model.InfoType = infoName.join();

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.ResearchInfo.GetInfoById, fetchInfoAbortController)
            .then(
                (result) => {
                    setIsLoading(false);

                    if (fetchInfoAbortController.signal.aborted) {
                        return;
                    }

                    if (!result || !result.IsSuccess) {
                        setModel(new ResearchInfoModel(research));
                        return;
                    }

                    if (!result.Data) {
                        setModel(new ResearchInfoModel(research));
                        return;
                    }

                    let model = new ResearchInfoModel(research);
                    infoName.forEach(info => {
                        model[info] = result.Data[info]
                    });

                    if (model && model.Faq) {
                        try {
                            model.Faq = JSON.parse(model.Faq);
                        }
                        catch {
                            console.log('Unable to fetch FAQ. Please contact administrator to edit and save FAQs');
                        }
                    }

                    setModel(model);
                },
                (error) => {
                    console.log("Error occured while fetching SEO data: " + error);
                }
            )
    }

    function buildSchemaScript() {
        if (!model || !model.Schemas) {
            return;
        }
        document.head.insertAdjacentHTML('beforeend', model.Schemas);
    }

    function buildFaqScript() {
        if (!model || !model.Faq || !model.Faq.length === 0) {
            return;
        }

        let faqs = []

        model.Faq.forEach(faq => {
            let f = new Object();
            f['@type'] = "Question";
            f.name = faq.Question;

            f.acceptedAnswer = new Object();
            f.acceptedAnswer['@type'] = 'Answer';
            f.acceptedAnswer.text = faq.Answer;
            faqs.push(f);
        })

        return (
            <>
                <Script
                    id="faq" type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            {
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": ${JSON.stringify(faqs)}
                            }
                        `,
                    }}
                />
            </>
        )
    }

    function showFaq() {
        if (!model || !model.Faq) {
            return;
        }

        return (
            <Box sx={{ p: '10px 30px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={styles.researchViewInfo}>
                            <Typography component="h2" variant="h2" color="primary" sx={{ mb: 2 }}>
                                {research.PostKey} Related Frequently Asked Questions
                            </Typography>
                            {
                                model.Faq.map(faq => {
                                    return (
                                        <ResearchViewSeoFaqItem key={faq.Index} faq={faq} />
                                    )
                                })
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    if (IsLoading) {
        return (
            <Loader />
        )
    }

    if (!model) {
        return null;
    }

    return (
        <>
            {showFaq()}
            {buildFaqScript()}
            {buildSchemaScript()}
        </>
    )
}