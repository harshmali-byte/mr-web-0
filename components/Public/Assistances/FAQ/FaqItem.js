import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FaqItem({ faq }) {
    function buildDescription() {
        return (
            <List>
                {
                    faq.description
                        ? <Typography>{faq.description}</Typography>
                        : null
                }

                {
                    faq.descriptionList && faq.descriptionList.map((li, index) => {
                        return (
                            <ListItem key={`li${index}`} alignItems="flex-start" sx={{ borderBottom: '1px solid #ccc', '&.MuiListItem-root:last-child': { borderBottom: 'none' } }}>
                                <ListItemText
                                    secondary={
                                        <>
                                            {
                                                li.title && <Typography
                                                    sx={{ display: 'inline', mr: 1 }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {li.title}
                                                </Typography>
                                            }

                                            {
                                                li.description
                                                && <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {li.description}
                                                </Typography>
                                            }
                                        </>
                                    } />
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold' }}>{faq.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {buildDescription()}
            </AccordionDetails>
        </Accordion>
    )
}