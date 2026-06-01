import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Breadcrumbs, Link, Paper, Modal, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { LocalStorage } from '../../../Common/Commons';
import HomeIcon from '@mui/icons-material/Home';
import { ApiHandler } from '../../../Api/ApiHandler';
import { OrgInfo, LocalStorageKeys, RobotIndexes } from '../../../Common/Constants';
import styles from '../../Research/ResearchView/Summary/ResearchSummaryView.module.css';
import dynamic from 'next/dynamic';

//SSR Component
const BlogHeaderView = dynamic(() => import('./BlogHeaderView'));
const ResearchSummaryView = dynamic(() => import('../../Research/ResearchView/Summary/ResearchSummaryView'));
const ResearchRequestQuery = dynamic(() => import('../../Research/Request/ResearchRequestQuery'));

export default function BlogView({ blog }) {
    const [showModal, setShowModal] = useState(false);
    const [showStickyRequest, setShowStickyRequest] = useState(false);

    useEffect(() => {
        let localData = LocalStorage.GetData(LocalStorageKeys.RequestFormFilled);

        if (localData && JSON.parse(localData).findIndex(s => s.reportId === blog.Id && s.requestType === 'blogDownloadSample') > -1) {
            setShowModal(false);
            return;
        }

        setTimeout(() => {
            setShowModal(true);
        }, 30000)
    }, [])

    function AddCommonTags() {
        return (
            <>
                {blog.MetaTitle && <title>{blog.MetaTitle}</title>}
                {blog.MetaDescription && <meta name="description" content={blog.MetaDescription} />}
                {blog.MetaTags && <meta name="keywords" content={blog.MetaTags} />}
                {blog.CanonicalUrl && <link rel="canonical" href={blog.CanonicalUrl} />}
            </>
        )
    }

    function AddOgTags() {
        return (
            <>
                <meta property="og:site_name" content={OrgInfo.FullName} />
                <meta property="og:locale" content="en_us" />
                <meta property="og:type" content="article" />
                {blog.MetaTitle && <meta property="og:title" content={blog.MetaTitle} />}
                {blog.MetaDescription && <meta property="og:description" content={blog.MetaDescription} />}
                {blog.CanonicalUrl && <meta property="og:url" content={blog.CanonicalUrl} />}
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}OGTag.png`} />
            </>
        )
    }

    function AddTwitterTags() {
        return (
            <>
                {blog.MetaTitle && <meta name="twitter:title" content={blog.MetaTitle} />}
                {blog.MetaDescription && <meta name="twitter:description" content={blog.MetaDescription} />}
                {blog.MetaDescription && <meta name="twitter:card" content={blog.MetaDescription} />}
                {blog.CanonicalUrl && <meta name="twitter:url" content={blog.CanonicalUrl} />}
                <meta name="twitter:site" content="@BrandEssenceMR" />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}TwitterTag.png`} />
            </>
        )
    }

    function addHeaders() {
        return (
            <Head>
                {AddCommonTags()}
                {AddOgTags()}
                {AddTwitterTags()}
                <meta name="robots" content={RobotIndexes[blog.RobotIndex || 0].title} />
            </Head>
        )
    }

    if (!blog) {
        return null;
    }

    return (
        <div className={styles[`Research_${process.env.NEXT_PUBLIC_ORG}`]}>
            {addHeaders()}
            <Paper elevation={0} sx={{ p: '0 30px 5px 30px' }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon sx={{ mt: '0.3rem' }} /></Link>
                    <Link underline="hover" color="inherit" href="/Blogs" target="_blank">Blogs</Link>
                    <Link underline="none" color="text.primary">{blog.Name}</Link>
                </Breadcrumbs>
            </Paper>
            {
                showModal && <Modal
                    open={showModal}
                    onClose={(e, reason) => { if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') { setShowModal(false) } }}
                    aria-labelledby="Download free sample poupup"
                    aria-describedby="Download free sample poupup"
                    sx={{ overflow: 'auto' }}
                >
                    <Box>
                        <ResearchRequestQuery research={blog} requestType="blogDownloadSample" onCloseModal={(visibility) => { setShowModal(visibility); setShowStickyRequest(true); }}
                            upsertUrl={ApiHandler.ApiUrls.Request.BlogRequest}
                        />
                    </Box>
                </Modal>
            }

            <Paper elevation={0} sx={{ p: '10px 30px' }}>
                <BlogHeaderView Blog={blog} />
                <ResearchSummaryView Research={blog} hideImageActionButtons={true} fetchImageApi={ApiHandler.ApiUrls.Blog.GetImage} />
            </Paper>
        </div>
    )
}