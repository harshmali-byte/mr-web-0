import React from 'react';
import { Grid, Container } from "@mui/material";
import MASectionTitle from './MASectionTitle';
import MAQABox from './MAQABox';
import MAQAListItem from './MAQAListItem';
import ProsCons from './ProsCons';

export default function Acquisition() {
    return (
        <Container sx={{ mb: 2 }}>
            <Grid container sx={{ mt: 6, display: 'flex', flexDirection: 'column', backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <MASectionTitle title="ACQUISITION" />
                <MAQABox question="What is an Acquisition?"
                    answers={
                        [
                            {
                                id: 'A-Q-1-A-1',
                                text: `An acquisition is the process of one company purchasing most or all of another company's shares in order to gain control of it. This process involves the acquirer purchasing more than 50% of the target firm's stock and other assets.`
                            },
                            {
                                id: 'A-Q-1-A-2',
                                text: `An acquisition can take place with or without the target company's approval, but if it is approved there may be a no-shop clause in place during the process. Acquisitions are a common practice in business and are done to increase market share, acquire new technology and resources, expand geographically, or increase efficiency.`
                            }
                        ]
                    }
                />
                <MAQABox question="What is the Motive for Acquisition?"
                    answers={
                        [
                            {
                                id: 'A-Q-2-A-1',
                                text: `Acquiring another company can provide access to new technologies and intellectual property, as well as new sources of revenue. It can also help the parent company to expand into new markets and diversify its customer base. Finally, it can provide access to the other company's customer base and distribution channels, which can help the parent company to grow its business.`
                            }
                        ]
                    }
                />
                <MAQABox question="How Does an Acquisition Work?"
                    answers={
                        [
                            {
                                id: 'A-Q-3-A-1',
                                text: `The best way to go about making an acquisition is to take a proactive approach. Start by clearly defining your company's long-term objectives. Then do research to identify those companies that could help you achieve those objectives. Once you've identified the companies that are the best fit for your goals, you can begin the process of making an acquisition. There are four main steps in acquisition process:`
                            }
                        ]
                    }
                >
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <MAQAListItem imageName="SelectTeam" title="1. Select a team" paras={
                            [
                                {
                                    id: 'A-Q-3-A-1-li-1-p-1',
                                    text: `A successful working group within a company requires clear communication and collaboration between representatives from all areas of the business. All members must be able to work together harmoniously to ensure the group's success.`
                                }
                            ]
                        } />
                        <MAQAListItem imageName="PreparePlan" title="2. Prepare a plan" paras={
                            [
                                {
                                    id: 'A-Q-3-A-1-li-2-p-1',
                                    text: `What is the reason you took this decision? What is your main aim? What about financing the deal? Make a list of goals and ensure your plan is such that you meet at least one of it.`
                                }
                            ]
                        } />
                        <MAQAListItem imageName="DecidePrice" title="3. Decide your Price" paras={
                            [
                                {
                                    id: 'A-Q-3-A-1-li-3-p-1',
                                    text: `Nailing down the value of an acquisition is difficult; however, there are certain steps you can take to ensure you get the most out of the deal. Hiring a qualified accountant is essential to understanding the financials of the acquisition, while a solicitor can help to ensure the contract is legally sound. Additionally, it is important to consider the potential need for additional funding and to plan accordingly.`
                                }
                            ]
                        } />
                        <MAQAListItem imageName="Approach" title="4. Approach" paras={
                            [
                                {
                                    id: 'A-Q-3-A-1-li-3-p-1',
                                    text: `If the potential target has an online presence, you can also use email or social media to make contact. Be sure to provide a clear and concise explanation of why you think your acquisition is the right move for them, and how it will benefit them in the long run.`
                                },
                                {
                                    id: 'A-Q-3-A-1-li-3-p-2',
                                    text: `Once you've made contact, it's time to negotiate. This can be a tricky process as you need to agree on a suitable price and other terms. It's important to remain realistic and flexible throughout the process, and to be open to compromise.`
                                },
                                {
                                    id: 'A-Q-3-A-1-li-3-p-3',
                                    text: `Finally, if you're successful in your negotiations, it's time to draw up the contracts. Take your time to go through all the details of the agreement and make sure you're both comfortable and happy with the terms. Once you've done this, it's time to finalize the deal and welcome your new acquisition.`
                                }
                            ]
                        } />
                    </Grid>
                </MAQABox>

                <ProsCons
                    title="What are the Advantages and Disadvantages of an Acquisition?"
                    pros={
                        [
                            "Reduced entry barriers",
                            "Market power",
                            "New competencies and resources",
                            "Access to experts",
                            "Access to capital",
                            "Fresh ideas and perspective"
                        ]
                    }
                    cons={
                        [
                            "Culture clashes",
                            "Duplication",
                            "Conflicting objectives",
                            "Poorly matched businesses",
                            "Pressure on suppliers",
                            "Brand damage"
                        ]
                    }
                />

            </Grid>
        </Container>
    )
}