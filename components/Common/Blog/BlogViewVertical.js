import React from 'react';
import { Box, Typography, Avatar, Card, CardMedia, CardContent, Button, Divider } from '@mui/material';

export default function BlogViewVertical({ data, width }) {

    return (
        <Box sx={{ width: width, p: 2, display: 'flex', flex: 1 }}>
            <Card elevation={5} raised={true} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 5, position: 'relative' }} >

                <Avatar sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#EFEFEF' }}>
                    <Typography variant="body2" component="span" sx={{ fontSize: 11, textAlign: 'center', color: "black" }} >
                        {data.publishDate}
                    </Typography>
                </Avatar>

                <CardMedia
                    component="img"
                    alt={data.url}
                    image={`/${process.env.NEXT_PUBLIC_ORG}/Services/B2BLead/Blogs/${data.url}.png`}
                    height="180"
                    title={data.url}
                    sx={{}}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Typography variant="body2" component="h4" sx={{ fontWeight: '600', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        {data.title}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        {data.description}
                    </Typography>
                </CardContent>

                <Box>
                    <Button href={`/blog/${data.url}`} target="_blank" variant='contained' color='themeColor' sx={{ width: '100%', borderRadius: 0 }}>Read More</Button>
                </Box>
            </Card>
        </Box>
    )
}