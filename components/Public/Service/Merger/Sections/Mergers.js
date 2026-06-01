import React from 'react';
import { Grid, Container } from "@mui/material";
import MASectionTitle from './MASectionTitle';
import MAQABox from './MAQABox';
import ProsCons from './ProsCons';

export default function Mergers() {
    return (
        <Container sx={{ mb: 2 }}>
            <Grid container sx={{ mt: 6, display: 'flex', flexDirection: 'column', backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <MASectionTitle title="MERGERS" />
                <MAQABox question="What is a Merger?"
                    answers={
                        [
                            {
                                id: 'M-Q-1-A-1',
                                text: `A merger is a process where two or more entities, such as companies, organizations, or governments, join together to form a single new entity. The resulting entity is typically larger than any of the entities that preceded it, and it is typically formed for the purpose of increasing efficiency, expanding its reach, or gaining a competitive advantage.`
                            }
                        ]
                    }
                />
                <MAQABox question="What is the Motive for Merger?"
                    answers={
                        [
                            {
                                id: 'M-Q-1-A-1',
                                text: `Mergers in the corporate world are often driven by a desire to expand into new markets, increase the size and scope of the organization's goals, and gain a larger portion of the current market share.`
                            }
                        ]
                    }
                />
                <MAQABox question="How Does a Merger Work?"
                    answers={
                        [
                            {
                                id: 'M-Q-1-A-1',
                                text: `It is the merging of two organizations on equal terms to form a single, legal entity. The phrase "mergers of equivalents" is sometimes used to refer to when two organizations decide to combine and are generally equal in terms of measures, customers, and the scale of projects.`
                            },
                            {
                                id: 'M-Q-1-A-2',
                                text: `A corporate consolidation is the joining of two organizations into one, which frequently happens through a merger or acquisition. Through the consolidation, assets from both organizations are combined, and the new organization may have better market share, economies of scale, or other advantages.`
                            },
                            {
                                id: 'M-Q-1-A-3',
                                text: `Post-consolidation, the two entities combine to f orm a new entity. This new entity has its own distinct mission, vision, and strategies. It may also have new product offerings, services, and target markets. The new entity benefits from the combined resources of both entities and is able to better compete in the market due to increased size and capabilities.`
                            }
                        ]
                    }
                />

                <ProsCons
                    title="What are the Advantages and Disadvantages of Merger?"
                    pros={
                        [
                            "By merging, elements contending in a similar market can gain a larger market share.",
                            "Merger is often chosen by some organizations as it offers the benefit of economies of scale, resulting in a reduction in operational costs.",
                            "Occasionally, merger outcomes in income development squeeze into the goal of some organizations that seek to achieve inorganic income growth.",
                            "Merger allows organizations to quickly expand their operations to different geographies without the high costs associated with physical market entry."
                        ]
                    }
                    cons={
                        [
                            "In some cases, the rate of development for the newly combined element is slower than for the elements that were combined.",
                            "The process of communication and collaboration between employees of different organizations can be complicated.",
                            "This often leads to a more significant factor that could play a role in implementing a business model."
                        ]
                    }
                />
            </Grid>
        </Container>
    )
}