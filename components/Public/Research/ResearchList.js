import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Breadcrumbs, Link, Grid, Pagination, Skeleton, Typography, Paper, Box, Chip } from '@mui/material';
import * as Constants from '../../Common/Constants';
import { format } from 'date-fns';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { CategoryService } from '../../Services/CategoryService';

export default function ResearchList({ categoryUrl, pageNo, response }) {
    const router = useRouter();
    const [category, setCategory] = useState(null);

    let abortController = new AbortController();

    useEffect(() => {
        CategoryService.FetchCategories(abortController)
            .then(
                (data) => {
                    if (abortController.signal.aborted) {
                        return;
                    }
                    let cat = data.find(c => c.CategoryUrl === categoryUrl)
                    setCategory(cat);
                },
                (error) => {
                    setCategory(null);
                });

        return (() => {
            abortController.abort();
        })
    }, [categoryUrl]);

    function onPageChange(e, newPageNo) {
        if (!category || !category.CategoryUrl) {
            return;
        }

        router.push(`/Category/${category.CategoryUrl}/${newPageNo}`);
    }

    function BuildList() {
        return (
            <>
                {
                    response.Data.map(post => {
                        let url = `/${post.CategoryUrl}/${post.MetaUrl ? post.MetaUrl : post.PostKey}`;

                        return (
                            <Grid key={post.Id} item xs={12}>
                                <Paper sx={{ p: 1 }}>
                                    <Paper elevation={0} sx={{ pt: 1, pb: 1 }}>
                                        <Link underline="hover" color="primary" href={url} target="_blank" sx={{ fontSize: 20 }}>{post.PostKey || post.Name}</Link>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.MetaDescription}
                                        </Typography>
                                    </Paper>
                                    <Box elevation={0} sx={{ display: 'flex', pb: 1 }}>
                                        {
                                            post.NumberOfPages && post.NumberOfPages > 0
                                                ? <Box elevation={0} sx={{ pr: 2, mr: 1, display: 'flex' }}>
                                                    <Chip color="default" label={`Pages: ${post.NumberOfPages}`} variant="outlined" />
                                                </Box>
                                                : null
                                        }
                                        {
                                            post.PublishDate
                                                ? <Box elevation={0} sx={{ pr: 2, mr: 1, display: 'flex' }}>
                                                    <Chip color="default" label={`${format(new Date(post.PublishDate), 'MMM-RRRR')}`} variant="outlined" />
                                                </Box>
                                                : null
                                        }
                                        {
                                            post.PriceSingleUser
                                                ? <Box elevation={0} sx={{ pr: 2, mr: 1, display: 'flex' }}>
                                                    <Chip color="default" label={`$${post.PriceSingleUser}*`} variant="outlined" />
                                                </Box>
                                                : null
                                        }
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </>
        )
    }

    function ShowPagination() {
        return (
            <Paper elevation={0} sx={{ p: 2, display: 'flex' }}>
                <Pagination count={Constants.GetPageSize(response.Paging && response.Paging.TotalPages ? response.Paging.TotalPages : 1)}
                    showFirstButton={true} showLastButton={true}
                    page={pageNo ? parseInt(pageNo) : 1} siblingCount={5}
                    onChange={onPageChange}
                />
            </Paper>
        )
    }

    function addHeaders() {
        return (
            <Head>
                <meta name="robots" content='index, follow' />
                {
                    category && category.Name
                        ? <title>{`${category.Name} Report ${!pageNo || isNaN(pageNo) || pageNo <= 0 ? 1 : pageNo}`}</title>
                        : null
                }
            </Head>
        )
    }

    if (!response) {
        return <Skeleton variant="rectangular" height={50} />
    }

    return (
        <>
            {addHeaders()}
            <Paper elevation={0} sx={{ pl: 2, pr: 2 }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                    <Link underline="hover" color="inherit" href="/Categories" target="_blank">Industry</Link>
                    {
                        category && category.CategoryUrl
                            ? <Link underline="none" color="text.primary">{category.Name}</Link>
                            : null
                    }

                </Breadcrumbs>
            </Paper>

            {ShowPagination()}

            <Paper elevation={0} sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {BuildList()}
                </Grid>
            </Paper>

            {ShowPagination()}
        </>
    )
}