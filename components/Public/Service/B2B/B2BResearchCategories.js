import dynamic from 'next/dynamic';
import { Box, Typography, Container, Button } from "@mui/material";
import Image from 'next/image';
import ScrollToElement from '../../../Common/ScrollToElement';

const ResearchCategoriesListView = dynamic(() => import('../../Categories/ResearchCategoriesListView'));
const HomeSectionTitle = dynamic(() => import('../../Home/HomeSectionTitle'));

export default function B2BResearchCategories() {
    return (
        <Container sx={{ mb: 3 }}>
            <Box sx={{ pb: 4, pt: 4 }}>
                <HomeSectionTitle title="OUR" focusTitle="MORE SERVICES" sxProps={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', textAlign: 'center' }} />
                <Typography component="div" variant="span" sx={{ pl: { xs: 3, lg: 30 }, pr: { xs: 3, lg: 30 }, textAlign: 'center' }}>Providing services to a wide range of industries. Our lead generation capabilities can be leveraged across multiple industries, including</Typography>
            </Box>
            <Box>
                <ResearchCategoriesListView disableLink={true} />
            </Box>
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button variant='contained' color="info" onClick={(event) => ScrollToElement(event, '#requestform')} sx={{ cursor: 'pointer' }}
                    startIcon={<Image src={`/Download.png`} loading="lazy" layout='fixed' alt='Download' width={15} height={15} />}
                >
                    Download Methodology
                </Button>
            </Box>
        </Container>
    )
}