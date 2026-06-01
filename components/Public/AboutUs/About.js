import { Box, Container, Divider } from "@mui/material";
import Head from 'next/head';
import dynamic from 'next/dynamic';

const AboutHeader = dynamic(() => import('./AboutHeader'));
const OurVmV = dynamic(() => import('./VMV/OurVmV'));
const AboutWhoWeAre = dynamic(() => import('./AboutWhoWeAre'));
const AboutDeliveryModel = dynamic(() => import('./DeliveryModel/AboutDeliveryModel'));
const AboutWeDifferent = dynamic(() => import('./WeDifferent/AboutWeDifferent'));
const AboutSideStream = dynamic(() => import('./SideStream/AboutSideStream'));
const AboutOurServices = dynamic(() => import('./Services/AboutOurServices'));
const AboutClients = dynamic(() => import('./AboutClients'));
const AboutSubscribe = dynamic(() => import('./Subscribe/AboutSubscribe'));
const AboutAddress = dynamic(() => import('./AboutAddress'));

export default function About() {
    function addHeaders() {
        return (
            <Head>
                <title>About Us</title>
                {
                    process.env.NEXT_PUBLIC_ORG === 'MR'
                        ? <meta name="robots" content='index, follow' />
                        : <meta name="robots" content='noindex, follow' />
                }

                <meta name="description" content={`Creating customized reports to support every phase of your business. We provide research reports on over 70+ categories ranging from life sciences and consumer goods to BFSI and ICT.`} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}AboutUs`} />
            </Head>
        )
    }
    return (
        <Box>
            {addHeaders()}
            <AboutHeader />
            <Container sx={{ mt: { xs: 5, sm: 0 }, mb: 5 }}>
                <OurVmV />
            </Container>

            <Divider />
            <Container sx={{ mt: 5 }}>
                <AboutWhoWeAre />
            </Container>
            <AboutDeliveryModel />
            <Container sx={{ mt: 5, mb: 5 }}>
                <AboutWeDifferent />
            </Container>
            <Divider />
            <Container sx={{ mt: 5, mb: 5 }}>
                <AboutSideStream />
            </Container>
            <Divider />
            <Container sx={{ mt: 5, mb: 5 }}>
                <AboutOurServices />
            </Container>
            <Divider />
            <Container sx={{ mt: 0, mb: 5 }}>
                <AboutClients />
            </Container>
            <AboutSubscribe />
            <AboutAddress />
        </Box>
    )
}