import React from 'react';
import { Box, Typography, Container, Paper } from "@mui/material";
import MAImageBox from './MAImageBox';
import { useTheme } from '@mui/material/styles';

export default function MAImpact() {
    const theme = useTheme();

    function TypeItem({ title, description }) {
        return (
            <Box>
                <Typography variant='body2' sx={{ fontWeight: 'bold', mt: 1, mb: 0.5 }} >
                    {title}
                </Typography>
                <Typography variant='body2' component='div' sx={{ color: theme.custom.greyText }}>
                    {description}
                </Typography>
            </Box>
        )
    }

    function BuildDescription() {
        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant='body2'>
                    {`The most obvious change that occurs due to a merger or acquisition is the change in the size of the organization. This could be in terms of the number of employees, the number of assets, the number of products or services, the number of markets served, and the number of financial resources. Therefore, the size of the organization changes significantly due to mergers and acquisitions.`}
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Overall, mergers and acquisitions bring a variety of changes to an organization in terms of size, ownership, and financial resources. These changes may be beneficial or detrimental depending on the structure of the deal and the group of people involved. Therefore, it is important for organizations to analyze the potential impact of such a decision before proceeding with a merger or acquisition.`}
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    {`Mergers and acquisitions have possible impact on:`}
                </Typography>
            </Box>
        )
    }

    return (
        <Container sx={{ mt: 5, mb: 2 }}>
            <Paper elevation={4} sx={{ p: 3 }}>
                <Box>
                    <MAImageBox imgSrc="/Services/M_A/ImpactOfM_A.png" imgAlt="Types of M&A Transactions"
                        title="Impact of Mergers and Acquisitions" description={<BuildDescription />}
                        imgHeight={{ xs: 130, sm: 280, md: 220, lg: 230 }}
                        xsImgGridItemSize={6} xsDescGridItemSize={6}
                        smImgGridItemSize={6} smDescGridItemSize={6}
                        mdImgGridItemSize={3} mdDescGridItemSize={9}
                    />
                </Box>
                <Box>
                    <TypeItem title="Employees" description={`Mergers and acquisitions may have significant repercussions for employees. Layoffs, change in corporate culture and potential emotional and physical distress are all potential outcomes of such an event. While the merged company may become more efficient and require fewer personnel, this can result in employees being let go. Those who remain may experience challenges adjusting to the new corporate environment, with changes to operating procedures and ways of working. This can cause stress and fatigue among the workforce.`} />
                    <TypeItem title="Management" description={`This stress leads to a lack of motivation among the managerial level professionals, which in turn leads to a decrease in their productivity and eventually job loss. Furthermore, the corporate culture clash results in internal conflict and disagreements among the managerial level professionals which can further reduce their productivity.`} />
                    <TypeItem title="Shareholders" description={`The economic impact of mergers and acquisitions on shareholders can be both positive and negative. If an acquisition is done properly and the synergies achieved are more than the premium paid for it, then the shareholders of the acquiring company can benefit from the increased value of the stock. On the other hand, if the acquisition is not planned properly, then the shareholders of the acquiring company can suffer from losses due to the acquisition premium and augmented debt load.`} />
                    <TypeItem title="Competition" description={`Mergers and acquisitions have a significant impact on market competition. However, the exact impact depends on the industry and the size of the companies involved. In general, mergers and acquisitions can lead to increased market power and greater competition, while they can also create opportunities for innovation and new market opportunities.`} />
                </Box>
            </Paper>
        </Container>
    )
}