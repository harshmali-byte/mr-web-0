import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Breadcrumbs, Link, Grid, Pagination, Skeleton, Typography, Paper, Box, Chip } from '@mui/material';
import * as Constants from '../../Common/Constants';
import { format } from 'date-fns';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

export default function BlogList({ pageNo, response }) {
    const router = useRouter()

    function onPageChange(e, newPageNo) {
        router.push(`/Blogs/${newPageNo}`);
    }

    function BuildList() {
        return (
            <>
                {
                    response.Data.map(post => {
                        if (!post.BlogUrl) {
                            return null;
                        }

                        return (
                            <Grid key={post.Id} item xs={12} sx={{ borderBottom: 1, borderColor: 'grey.200' }}>
                                <Paper elevation={0} sx={{ pt: 1, pb: 1 }}>
                                    <Link underline="hover" color="primary" href={post.BlogUrl} target="_blank">{post.Name}</Link>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.MetaDescription}
                                    </Typography>
                                </Paper>
                                <Box elevation={0} sx={{ display: 'flex', pb: 1 }}>
                                    {
                                        post.PublishDate
                                            ? <Box elevation={0} sx={{ pr: 2, mr: 1, display: 'flex' }}>
                                                <Chip color="default" label={`${format(new Date(post.PublishDate), 'MMM-RRRR')}`} variant="outlined" />
                                            </Box>
                                            : null
                                    }
                                </Box>
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

    if (!response) {
        return <Skeleton variant="rectangular" height={50} />
    }

    function addHeaders() {
        return (
            <Head>
                <meta name="robots" content='index, follow' />
            </Head>
        )
    }

    return (
        <>
            {addHeaders()}
            <Paper elevation={0}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                    <Link underline="hover" color="inherit">Blogs</Link>
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