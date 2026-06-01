
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Box, Paper, Link, Breadcrumbs, Divider } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

import B2BHeader from './B2BHeader';
import B2BServices from './Service/B2BServices';
import B2BStatistics from './Statistics/B2BStatistics';
import B2BExplainer from './Explainer/B2BExplainer';
import B2BBlogs from './Blogs/B2BBlogs';

const B2BResearchCategories = dynamic(() => import('./B2BResearchCategories'));
const B2BOurTeam = dynamic(() => import('./B2BOurTeam'));
const B2BCustomerReview = dynamic(() => import('./B2BCustomerReview'));
const B2BTrustedClients = dynamic(() => import('./B2BTrustedClients'));
const ServiceRequest = dynamic(() => import('../ServiceRequest'));

export default function B2BLeadView({ leadData, statData, blogsData }) {

    function addHeaders() {
        return (
            <Head>
                <title>Mastering B2B Lead Generation Strategies {new Date().getFullYear()} by Expert</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content="Discover proven B2B lead generation techniques and tactics to attract more high-quality leads to your business." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}Services/b2b-lead-generation`} />
            </Head>
        )
    }

    return (
        <Box>
            {addHeaders()}
            <Paper elevation={0} sx={{ pl: 2, pr: 2 }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                    <Link underline="none" color="inherit" href="/Services" target="_blank">Services</Link>
                    <Link underline="none" color="inherit">B2B Lead Generation</Link>
                </Breadcrumbs>
            </Paper>
            <B2BHeader />
            <B2BServices Data={leadData} />
            <B2BStatistics Data={statData} />
            <B2BBlogs Data={blogsData} />
            <B2BExplainer />
            <B2BOurTeam />
            <B2BCustomerReview />
            <B2BTrustedClients />
            <ServiceRequest requestType="B2BLeadGeneration" title="LET'S DISCUSS" focusTitle=" " subtitle="more about your marketing needs!" queryPlaceholder="Any Query" />
            <Divider />
            <B2BResearchCategories />
        </Box>
    )
}