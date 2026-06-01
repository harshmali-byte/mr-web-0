import React, { useState, useEffect } from 'react';
import { Grid, Link, Typography, Box } from '@mui/material';
import { CategoryService } from '../../Services/CategoryService';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Loader = dynamic(() => import('../../Common/Loader'));

export default function ResearchCategoriesListView({ disableLink }) {
    const [PostCategories, setPostCategories] = useState([]);

    let abortController = new AbortController();

    useEffect(() => {
        GetCategories();

        return (() => {
            abortController.abort();
        })
    }, []);

    function GetCategories() {
        CategoryService.FetchCategories(abortController)
            .then(
                (data) => {
                    if (abortController.signal.aborted) {
                        setPostCategories(null);
                        return;
                    }
                    setPostCategories(data);
                },
                (error) => {
                    setPostCategories(null);
                })
    }


    function BuildPostCategories() {
        return (
            <>
                {
                    PostCategories.map((sm, i) => {
                        return (
                            <Grid item key={sm.Id} xs={12} sm={6} md={4} lg={3} >
                                <Box sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Link underline={disableLink ? "none" : "hover"} color="inherit" href={disableLink ? undefined : `/Category/${sm.CategoryUrl}`} target="_blank">{sm.Name}</Link>
                                    </Box>
                                    <Box>
                                        <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Research/Categories/${sm.CategoryUrl}.png`} loading="lazy" layout='fixed' alt={sm.Name} width={35} height={35} />
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })
                }
            </>
        )
    }

    if (!PostCategories) {
        return (
            <Box>
                <Typography variant="body1" component="span">Not able to find Categories. Please refresh page to try again</Typography>
            </Box>
        )
    }

    if (PostCategories.length === 0) {
        return <Loader />
    }

    return (
        <Grid container spacing={2}>
            <BuildPostCategories />
        </Grid>
    )
}