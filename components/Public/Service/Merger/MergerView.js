import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Paper, Link, Divider, Breadcrumbs, Modal } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import dynamic from 'next/dynamic';
import { LocalStorage } from '../../../Common/Commons';
import { LocalStorageKeys } from '../../../Common/Constants';

// SSR Components
import ServiceRequest from '../ServiceRequest';
import Service3DFramework from '../Service3DFramework';
import ServiceCaseStudy from '../ServiceCaseStudy';
import MAImpact from './MAImpact';
import MASteps from './MASteps';
import MARebranding from './MARebranding';
import MAMotives from './MAMotives';
import MAValuation from './MAValuation';
import MAFinanced from './MAFinanced';
import MATrxTypes from './MATrxTypes';
import MAUnderstanding from './MAUnderstanding';
import MATypes from './MATypes';
import MADifference from './MADifference';
import Acquisition from './Sections/Acquisition';
import Mergers from './Sections/Mergers';
import MADefinition from './MADefinition';
import MAGuideBook from './MAGuideBook';
import MAProcess from './MAProcess';
import MACapabilities from './MACapabilities';
import MergerHeader from './MergerHeader';

const StickyMAActions = dynamic(() => import('../../../Common/StickyCallToActions/StickyMAActions'));
const MAGuideBookRequest = dynamic(() => import('./Download/MAGuideBookRequest'));
// const ServiceRequest = dynamic(() => import('../ServiceRequest'));
// const Service3DFramework = dynamic(() => import('../Service3DFramework'));
// const ServiceCaseStudy = dynamic(() => import('../ServiceCaseStudy'));
// const MAImpact = dynamic(() => import('./MAImpact'));
// const MASteps = dynamic(() => import('./MASteps'));
// const MARebranding = dynamic(() => import('./MARebranding'));
// const MAMotives = dynamic(() => import('./MAMotives'));
// const MAValuation = dynamic(() => import('./MAValuation'));
// const MAFinanced = dynamic(() => import('./MAFinanced'));
// const MATrxTypes = dynamic(() => import('./MATrxTypes'));
// const MAUnderstanding = dynamic(() => import('./MAUnderstanding'));
// const MATypes = dynamic(() => import('./MATypes'));
// const MADifference = dynamic(() => import('./MADifference'));
// const Acquisition = dynamic(() => import('./Sections/Acquisition'));
// const Mergers = dynamic(() => import('./Sections/Mergers'));
// const MADefinition = dynamic(() => import('./MADefinition'));
// const MAGuideBook = dynamic(() => import('./MAGuideBook'));
// const MAProcess = dynamic(() => import('./MAProcess'));
// const MACapabilities = dynamic(() => import('./MACapabilities'));
// const MergerHeader = dynamic(() => import('./MergerHeader'));

export default function MergerView({ MAGuideBooData }) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let localData = LocalStorage.GetData(LocalStorageKeys.RequestFormFilled);

        if (localData && JSON.parse(localData).findIndex(s => s.reportId === 'MA' && s.requestType === 'DownloadMAGuideBook') > -1) {
            setShowModal(false);
            return;
        }

        setTimeout(() => {
            setShowModal(true);
        }, 30000)
    }, [])

    function addHeaders() {
        return (
            <Head>
                <title>Merger & Acquisition Advisory Services: Expert Guidance for Successful Transactions</title>

                {
                    process.env.NEXT_PUBLIC_ORG === 'MR'
                        ? <meta name="robots" content='index, follow' />
                        : <meta name="robots" content='noindex, follow' />
                }
                <meta name="description" content="Maximize the value of your M&A strategy with our professional advisory services. Our team of experts provides customized solutions to guide you through every step of the process." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}Services/Merger-And-Aquisition`} />
            </Head>
        )
    }

    return (
        <Box>
            {addHeaders()}
            {
                showModal && <Modal
                    open={showModal}
                    onClose={(e, reason) => { if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') { setShowModal(false) } }}
                    aria-labelledby="Download M&A Guide book"
                    aria-describedby="Download M&A Guide book"
                    sx={{ overflow: 'auto' }}
                >
                    <Box>
                        <MAGuideBookRequest onCloseModal={(visibility) => setShowModal(visibility)} />
                    </Box>
                </Modal>
            }
            <Paper elevation={0} sx={{ pl: 2, pr: 2 }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                    <Link underline="none" color="inherit" href="/Services" target="_blank">Services</Link>
                    <Link underline="none" color="inherit">M&A Advisory</Link>
                </Breadcrumbs>
            </Paper>
            <MergerHeader />
            <MACapabilities />
            <Divider />
            <MAProcess />
            <Divider />
            <MAGuideBook MAGuideBooData={MAGuideBooData} showDownloadPopup={setShowModal} />
            <MADefinition />
            <Mergers />
            <Acquisition />
            <MADifference />
            <MATypes />
            <MAUnderstanding />
            <MATrxTypes />
            <MAFinanced />
            <MAValuation />
            <MAMotives />
            <MARebranding />
            <MASteps />
            <MAImpact />
            <ServiceCaseStudy />
            <Service3DFramework />
            <ServiceRequest requestType="RfqRequestMA" />
            <StickyMAActions />
        </Box>
    )
}