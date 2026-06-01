import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function SurveyOptionSubmit({ onOptionSubmit }) {
    return (
        <Box>
            <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' onClick={onOptionSubmit}>Submit Answer</Button>
            </Box>
        </Box>
    )
}