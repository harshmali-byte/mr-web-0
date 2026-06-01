import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Card, Typography, CardContent, Grid, Avatar, Container, Button, Dialog } from '@mui/material';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRouter } from 'next/router';

const Loader = dynamic(() => import('../../Common/Loader'), { fallback: <div>Loading...</div> });

export default function FeaturedCategories({ homeFeatureCategories }) {
    const router = useRouter();
    const [viewLess, setViewLess] = useState(true);
    const [rowInitialItems, setRowInitialItems] = useState(5);
    const [openCategory, setOpenCategory] = useState(null);
    const [viewCategories, setViewCategories] = useState([]);

    const updateSize = () => {
        let initialItems = 5;

        if (window.innerWidth < 769) {
            initialItems = 3;
        }
        else if (window.innerWidth < 1025) {
            initialItems = 4;
        }
        else {
            initialItems = 5;
        }

        setRowInitialItems(initialItems);

        if (homeFeatureCategories) {
            if (viewLess) {
                setViewCategories(homeFeatureCategories.slice(0, initialItems))
            }
            else {
                setViewCategories(homeFeatureCategories)
            }
        }
    }

    useEffect(() => {
        updateSize();
    }, [])

    useEffect(() => {
        window.onresize = updateSize;
    }, []);

    useEffect(() => {
        if (homeFeatureCategories) {
            if (viewLess) {
                setViewCategories(homeFeatureCategories.slice(0, rowInitialItems))
            }
            else {
                setViewCategories(homeFeatureCategories)
            }
        }
    }, [viewLess])

    function viewMore() {
        setViewLess(!viewLess)
    }

    function redirectToCategory(cat) {
        setOpenCategory(cat);
        router.push(`/Category/${cat.url ? cat.url : cat.name.replace(/\s+/g, '-')}`);
    }

    if (!viewCategories || viewCategories.length === 0) {
        return <Loader />
    }

    return (
        <Container sx={{ position: 'relative', mt: 7 }}>
            {
                openCategory
                    ? <Dialog open={true}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                            <Loader rounded={true} />
                            <Typography component="div" variant="body1" sx={{ textTransform: 'none' }}>Redirecting to {openCategory.name}</Typography>
                        </Card>
                    </Dialog>
                    : null
            }
            <Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography component="h2" variant="h4" sx={{ fontWeight: '500' }}>FEATURED CATEGORIES</Typography>
                </Box>
                <Grid container spacing={0} sx={{ marginTop: 2, justifyContent: 'center' }}>
                    {
                        viewCategories.map(cat => {
                            return (
                                <Grid item key={cat.name}>
                                    <Button variant="text" sx={{ m: 0 }}>
                                        <Card sx={{ p: 0, display: 'flex' }} elevation={8} >
                                            <CardContent
                                                onClick={() => redirectToCategory(cat)}
                                                sx={{ width: 140, height: 140, p: 0.7, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-around' }}
                                            >
                                                <Box sx={{}}>
                                                    <Image src={`/PublicHome/FeatureCategories/${process.env.NEXT_PUBLIC_ORG}/${cat.logo}`} loading="lazy" width={50} height={50} alt={cat.name} />
                                                </Box>
                                                <Box sx={{}}>
                                                    <Typography component="div" variant="body1" sx={{ textTransform: 'none' }}>{cat.name}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Button>
                                </Grid>
                            )
                        })
                    }

                    <Grid item>
                        <Button variant="text" sx={{ m: 0, p: 0.5 }}>
                            <Card sx={{ backgroundColor: '#FFFFFF', width: 140, height: 140 }} onClick={() => viewMore()} elevation={8}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box sx={{ height: 50, textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        <Typography component="div" variant="body1" sx={{ textTransform: 'none' }}>{viewLess ? "View More" : "View Less"}</Typography>
                                    </Box>
                                    <Box sx={{ height: 50 }}>
                                        <Avatar sx={{ bgcolor: '#E8E8E8', width: 30, height: 30 }}>
                                            {
                                                viewLess
                                                    ? <KeyboardArrowDownIcon color="themeColor" sx={{ fontSize: 30 }} />
                                                    : <KeyboardArrowUpIcon color="themeColor" sx={{ fontSize: 30 }} />
                                            }
                                        </Avatar>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}