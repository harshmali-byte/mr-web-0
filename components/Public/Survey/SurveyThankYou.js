import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

export default function SurveyThankYou() {
    const theme = useTheme();

    return (
        <Box sx={{ my: 5 }}>
            <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, backgroundColor: '#fffdfd' }}>
                <Typography variant="h3" sx={{ fontSize: 25, textAlign: 'center', mt: 2, color: theme.palette.primary.main }}>A quick note to express our gratitude for completing our survey. Your input is incredibly valuable to us.</Typography>
                <Typography variant="h3" sx={{ fontSize: 25, textAlign: 'center', mt: 2, color: theme.palette.primary.dark }}>Thank you for your time!</Typography>
            </Paper>
            <Box sx={{ my: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="span" sx={{ fontSize: 14, textAlign: 'center', mt: 2 }}>If you are interested to create survey for your organization,</Typography>
                <Link href="/ContactUs" sx={{ fontSize: 14, textAlign: 'center' }}>feel free to contact us here</Link>
            </Box>
        </Box>
    )
}