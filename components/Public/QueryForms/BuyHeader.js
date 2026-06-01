import React from 'react';
import { Box, Link, Stepper, Step, StepLabel, Breadcrumbs, Container } from '@mui/material';
import Image from 'next/image';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';

const stepperSteps = [
    { label: 'Order Details', iconName: 'OrderDetails.png' },
    { label: 'Payment Details', iconName: 'PaymentDetails.png' },
    { label: 'Order Confirmation', iconName: 'OrderConfirmation.png' }
];

export default function BuyHeader({ research, activeStep }) {
    const theme = useTheme();

    const StepIcon = ({ iconName }) => (
        <span className='step-icon' style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Image src={`/Checkout/${iconName}`} alt={iconName} loading="lazy" width={60} height={50} />
        </span>
    );

    if (!research) {
        return null;
    }

    return (
        <>
            <Container maxWidth='xl'>
                <Box elevation={0} >
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{
                        '& .MuiBreadcrumbs-ol': {
                            flexWrap: 'nowrap',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            whiteSpace: 'nowrap'
                        },
                        '& .MuiBreadcrumbs-li:last-child': {
                            textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'
                        },
                    }}>
                        <Link underline="hover" color="inherit" href="/" target="_blank"><HomeIcon /></Link>
                        <Link underline="hover" color="inherit" href={`/Category/${research.CategoryUrl}`} target="_blank">{research.Category}</Link>
                        <Link underline="none" color="text.primary" href={research.ResearchUrl} target="_blank" sx={{}} >{research.Name}</Link>
                    </Breadcrumbs>
                </Box>
            </Container>

            <Box sx={{ mt: 1, pt: 5, backgroundColor: theme.palette.secondary.main }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {
                        stepperSteps.map((step, index) => (
                            <Step key={index} sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                ['& .MuiStepConnector-line']: {
                                    borderTopWidth: 3
                                },
                                ['& .MuiStepConnector-horizontal']: {
                                    top: { xs: 134, sm: 114 }
                                }
                            }}>
                                <Box sx={{ height: { xs: 187, sm: 167 }, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <StepLabel icon={<StepIcon iconName={step.iconName} />}>{step.label}</StepLabel>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 5 }}>
                                        {
                                            index <= activeStep
                                                ? <CircleIcon sx={{ color: theme.palette.success.main }} />
                                                : <CircleOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                                        }
                                    </Box>
                                </Box>
                            </Step>
                        ))
                    }
                </Stepper>
            </Box>
        </>
    )
}