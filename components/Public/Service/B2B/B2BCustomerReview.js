import { Box } from '@mui/material';
import CustomerReview from '../../../Common/CustomerReviews/CustomerReview';
import { useTheme } from '@mui/material/styles';

export default function B2BCustomerReview() {
    const theme = useTheme();

    return (
        <Box sx={{ marginTop: { xs: 4, sm: 7 }, p: { xs: 0, md: 5 }, pt: { xs: 5 }, pb: { xs: 3 }, backgroundColor: theme.palette.secondary.main }}>
            <CustomerReview isVertical={true} textAlign="center" />
        </Box>
    )
}