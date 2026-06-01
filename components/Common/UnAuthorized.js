import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function UnAuthorized({ pageName }) {
    return (
        <Paper sx={{ px: 2, py: 5 }}>
            <Box>
                <Typography sx={{ textAlign: 'center' }}>{`You are not Authorized to view ${pageName ? pageName : 'this'} page or page does not exist.`}</Typography>
            </Box>
        </Paper>
    )
}