import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Container, Button } from "@mui/material";
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import ScrollToElement from '../../../../Common/ScrollToElement';

const HomeSectionTitle = dynamic(() => import('../../../Home/HomeSectionTitle'));
const ToggleSwitch = dynamic(() => import('../../../../Common/ToggleSwitch'));
const B2BStatisticsLeadItem = dynamic(() => import('./B2BStatisticsLeadItem'));

export default function B2BStatistics({ Data }) {
    const theme = useTheme();
    const [currentMonthMode, setCurrentMonthMode] = useState(false);
    const [leadData, setLeadData] = useState([]);

    useEffect(() => {
        if (!Data) {
            return;
        }

        setLeadData(Data['month']);
    }, [Data])

    useEffect(() => {
        if (!Data) {
            return;
        }

        let data = currentMonthMode ? Data['month'] : Data['year'];
        setLeadData(data);

    }, [Data, currentMonthMode])


    function SwitchCurrentMonthMode() {
        setCurrentMonthMode(!currentMonthMode);
    }

    function ShowLeadData() {
        if (!leadData) {
            return null;
        }

        return (
            <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start', my: 2 }}>
                {
                    leadData.map((lead, index) => {
                        return (
                            <Grid item container xs={12} sm={4} md={3} spacing={3} key={`${lead.statType}_${index}`}
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'row', sm: 'column' } }}
                            >
                                <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <B2BStatisticsLeadItem lead={lead} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', mt: { xs: 0, md: 4 }, pl: { xs: 1, sm: 0 } }}>
                                        {
                                            Data.checks[lead.statType].map((check, index) => {
                                                return (
                                                    <Grid container spacing={1} key={`check_item_${lead.statType}_${index}`} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                        <Grid item xs={1}>
                                                            <Image src={`/${process.env.NEXT_PUBLIC_ORG}/Tick.png`} loading="lazy" layout='fixed' alt={check} width={15} height={15} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography component='span'>{check}</Typography>
                                                        </Grid>

                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    if (!Data) {
        return null;
    }

    return (
        <Box sx={{ marginTop: { xs: 4, sm: 7 }, p: { xs: 0, md: 5 }, pt: { xs: 5 }, pb: { xs: 3 }, backgroundColor: theme.palette.secondary.main }}>
            <Container>
                <Box>
                    <HomeSectionTitle title="REAL-TIME" focusTitle="LEAD STATISTICS" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Typography component="span" variant="span" sx={{}}>Year to Date</Typography>
                    <Box sx={{ px: 1 }}><ToggleSwitch checked={currentMonthMode} onChange={SwitchCurrentMonthMode} /></Box>
                    <Typography component="span" variant="span" sx={{}}>Current Month</Typography>
                </Box>
                <ShowLeadData />
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Button variant='contained' color="info" onClick={(event) => ScrollToElement(event, '#requestform')} sx={{ cursor: 'pointer' }}>
                        Speak to expert
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}