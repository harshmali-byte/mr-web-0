
import { Grid, Box, Typography, Container, Card, CardContent } from "@mui/material";

export default function B2BExplainerItem({ title, description, onClick, isActive }) {
    return (
        <Card elevation={0} variant="outlined" sx={{ backgroundColor: isActive ? '#FFFFFF' : 'transparent', my: 1, cursor: 'pointer' }} onClick={onClick}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}