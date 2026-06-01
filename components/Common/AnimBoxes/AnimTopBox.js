import { Card } from '@mui/material';

export default function AnimTopBox({ children }) {
    return (
        <Card elevation={0} variant="outlined" sx={{
            transition: 'transform, 450ms, box-shadow 450ms',
            '&:hover': { boxShadow: '0px 5px 6px 1px #D9D6D6', transform: 'translateY(-7px)' }
        }}>
            {children}
        </Card>
    )
}