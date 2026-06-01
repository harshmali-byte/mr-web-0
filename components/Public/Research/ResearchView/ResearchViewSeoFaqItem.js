import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ResearchViewSeoFaqItem({ faq }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Accordion key={faq.Index} variant="outlined" elevation={0} onChange={() => setIsExpanded(!isExpanded)}>
            <AccordionSummary expandIcon={isExpanded ? <RemoveIcon /> : <AddIcon />}  >
                <Typography sx={{ fontWeight: 'bold' }}>{faq.Question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div id={`researchPostSeoFaq_${faq.Index}`} dangerouslySetInnerHTML={{ __html: faq.Answer }} />
            </AccordionDetails>
        </Accordion>
    )
}