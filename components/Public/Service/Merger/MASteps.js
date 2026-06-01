import React from 'react';
import { Grid, Box, Typography, Container, Paper } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import MASectionTitle from './Sections/MASectionTitle';

export default function MASteps() {
    const theme = useTheme();

    function BuildStep({ number, title, description, pxPad }) {
        return (
            <TimelineItem sx={{ pl: { xs: 0, sm: 2, md: 5 } }}>
                <TimelineOppositeContent sx={{ display: 'none' }}></TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot sx={{ px: pxPad || 1.5, boxShadow: 5 }} color='inherit'>
                        <Typography variant='h6' sx={{ color: theme.palette.info.main, fontSize: 14, fontWeight: 'bold' }}>{number}</Typography>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pt: 2.2 }}>
                    <Typography variant='body1' sx={{ color: theme.palette.info.main, mb: 1, fontSize: 14, fontWeight: 'bold' }}>{title}</Typography>
                    <Typography component='div' sx={{ fontSize: 14 }}>{description}</Typography>
                </TimelineContent>
            </TimelineItem>
        )
    }

    return (
        <Container sx={{ mb: 2 }}>
            <Paper elevation={4} sx={{ pb: 5 }}>
                <Grid container sx={{ mt: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Grid item xs={11} sm={12}>
                        <MASectionTitle title="Steps involved in Merger and Acquisitions" mt={{ xs: -3.5, sm: -2.5 }} />
                    </Grid>
                    <Grid item xs={12} sm={11} sx={{ mt: 2 }}>
                        <Box sx={{ color: theme.custom.greyText, p: 1, display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='title' sx={{ textAlign: 'center' }}>
                                To ensure a successful M&A process, organizations must pay close attention to timing, compliance, and transaction details. Neglecting any of these elements can lead to delays, penalties, and other problems. To help avoid these issues, organizations should create a comprehensive M&A plan that prioritizes accuracy and precision. The 10 major steps in any M&A process are:
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ justifyContent: 'flex-start' }}>
                    <Timeline>
                        <BuildStep number={1} title="Strategy Development" description={`The first step in an M&A strategy is to define the goals of the deal. This should include the purpose of the acquisition, the target company, and the desired outcome. This helps to ensure that all parties are on the same page and have a shared understanding of the intended outcome.`} />
                        <BuildStep number={2} title="Target Identification" description={`In the target identification phase, legal teams must conduct thorough research to identify potential target companies. They must assess the company's current situation, evaluate the legal, financial, and operational risks associated with the target, and consider the potential benefits of the transaction. Additionally, they must analyze the competition and industry trends to gain a better understanding of the target's market position. Through this process, legal teams can gain insight into the target's strengths and weaknesses, which will guide the due diligence process.`} />
                        <BuildStep number={3} title="Valuation Analysis" description={`In order to properly evaluate and assess the target company's suitability in accordance with the M&A strategic plan, legal teams must have access to comprehensive data on the target's activities, customers, financials, products, and more. After the relevant entities are identified, it is necessary to determine whether they are in good standing and meet all applicable legal requirements. In case they are not, then this could be a deal breaker. Thus, it is crucial to assess whether the issues can be resolved and how long it will take to move forward.`} />
                        <BuildStep number={4} title="Negotiations" description={`After valuation models of the target company have been created, your firm can submit an offer and proceed to the negotiation phase, during which terms will be discussed in greater detail.`} />
                        <BuildStep number={5} title="Conduct Due Diligence" description={`The M&A due diligence process involves an extensive review of the target company's financial and operational documents, such as balance sheets, income statements, cash flow statements, contracts, leases, and loan agreements. Additionally, external sources, such as customers, suppliers, and competitors, are consulted. This allows buyers to gain a comprehensive understanding of the target company's current state and potential risks. Through the due diligence process, buyers can make more informed decisions and create a better M&A deal.`} />
                        <BuildStep number={6} title="Closing the Deal" description={`Once all necessary filings have been made, the parties can move forward with the closing. The legal team will need to ensure that all documents necessary to complete the transaction are ready. This includes all signed contracts, loan documents, and stock certificates. The legal team will also ensure that the closing is executed in accordance with applicable laws and regulations. Finally, the legal team must ensure that the closing is properly recorded and that all related documents are filed in a timely manner.`} />
                        <BuildStep number={7} title="Restructuring and Financing" description={`In order to ensure that the financing options explored during the M&A planning process are properly implemented, an independent director/manager, springing member, or special member may be appointed. These directors serve on the boards of the entities involved in the merger or acquisition in order to protect the assets of the corporation and make sure that the financing options discussed beforehand are properly executed. Furthermore, they can help to ensure that the purchase and sale agreement are finalized and that the deal is ultimately closed without any delays.`} />
                        <BuildStep number={8} title="Integration and Planning of Back-office"
                            description=
                            {
                                <>
                                    <Typography sx={{ fontSize: 14 }}>{`The operational side of integration is just as important. It involves the realignment of business processes, the transfer of assets, and the integration of data, applications, and technologies. It also includes the consolidation of employees, customers, and vendors.`}</Typography>
                                    <Typography sx={{ mt: 1, fontSize: 14 }}>{`Developing a clear and concise integration plan is essential for a successful merger or acquisition. It should include a timeline for each step of the process, a budget for activities, and milestones for completion. To maximize efficiency, businesses should consider leveraging existing resources and infrastructure.`}</Typography>
                                    <Typography sx={{ mt: 1, fontSize: 14 }}>{`Overall, the integration of an acquired company requires careful planning, patience, and collaboration. By following these steps, both parties can ensure a smooth transition and a successful outcome.`}</Typography>
                                </>
                            }
                        />
                        <BuildStep number={9} title="Compliance After Merger" description={`Post-merger integration is an essential step that is often overlooked, yet it is vital in achieving the goal of a "business as usual" state. Furthermore, it is a determining factor in whether the merger is successful or not.`} />
                        <BuildStep number={10} title="Back to Business" pxPad={1}
                            description=
                            {
                                <>
                                    <Typography sx={{ fontSize: 14 }}>{`After the merger is finalized, it is essential to regularly assess the success of the newly formed entity by conducting ongoing reviews to guarantee compliance with all relevant regulations.`}</Typography>
                                    <Typography sx={{ mt: 1, fontSize: 14 }}>{`Mergers and acquisitions bring a number of changes within the organization. The size of the organizations change, its stocks, shares and assets also change, even the ownership may also change due to the mergers and acquisitions. The mergers and acquisitions play a major role on the activities of the organizations. However, the impact of mergers and acquisitions varies from entity to entity; it depends upon the group of people who are being discussed here. The impact of mergers and acquisitions also depend on the structure of the deal.`}</Typography>
                                </>
                            }
                        />
                    </Timeline>
                </Box>
            </Paper>
        </Container>
    )
}