import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../../Auth/AuthContext';
import DashboardMenuItem from './DashboardMenuItem';
import DashboardSubMenu from './DashboardSubMenu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import BookIcon from '@mui/icons-material/Book';
import AttractionsIcon from '@mui/icons-material/Attractions';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import DirectionsIcon from '@mui/icons-material/Directions';
import PollIcon from '@mui/icons-material/Poll';
import BallotIcon from '@mui/icons-material/Ballot';
import { useTheme } from '@mui/material/styles';
import { AdminMenus, IsAdmin } from '../../Common/AdminConstants';

const researchMenu = [
    { icon: <AddIcon />, label: 'Create', url: '/Admin/Research/ResearchUpsert' },
    { icon: <ListIcon />, label: 'List', url: '/Admin/Research/ResearchUpsert' }
];

const blogMenu = [
    { icon: <AddIcon />, label: 'Create', url: '/Admin/Blog/BlogUpsert' },
    { icon: <ListIcon />, label: 'List', url: '/Admin/Blog/BlogUpsert' }
];

export default function DashboardMenu({ selectedMenuName }) {
    const auth = useAuth();
    const theme = useTheme();
    const router = useRouter();

    const [showDashboard, setShowDashboard] = useState(false);
    const [showResearch, setShowResearch] = useState(false);
    const [showBlog, setShowBlog] = useState(false);
    const [showRedirects, setShowRedirects] = useState(false);
    const [showSurveysClients, setShowSurveysClients] = useState(false);
    const [showSurveysAdmin, setShowSurveysAdmin] = useState(false);

    useEffect(() => {
        if (!auth || !auth.authData) {
            return;
        }

        let access = auth.authData.RoleAccess;
        if (!access || access.length === 0) {
            if (IsAdmin(auth.authData.Name)) {
                setShowDashboard(true);
                setShowResearch(true);
                setShowBlog(true);
                setShowSurveysClients(true);
                setShowSurveysAdmin(true);
            }
            return;
        }

        access.every((ra) => {
            switch (ra.Name) {
                case AdminMenus.Dashboard:
                    setShowDashboard(true);
                    break;
                case AdminMenus.Research:
                    setShowResearch(true);
                    break;
                case AdminMenus.Blog:
                    setShowBlog(true);
                    break;
                case AdminMenus.Redirects:
                    setShowRedirects(true);
                    break;
                case AdminMenus.SurveyClient:
                    setShowSurveysClients(true);
                    break;
                case AdminMenus.SurveyAdmin:
                    setShowSurveysAdmin(true);
                    break;
            }
            return true;
        })
    }, [auth])

    function onLogout() {
        auth.signOut();
        router.replace('/');
    }

    return (
        <div>
            <DashboardMenuItem show={showDashboard} redirectTo="/Admin/Dashboard" listIcon={<DashboardIcon />} text="Dashboard" isSelected={selectedMenuName === AdminMenus.Dashboard} />
            <DashboardSubMenu show={showResearch} listIcon={<BookIcon />} primaryText="Research" secondaryText="Create, List" subMenus={researchMenu} isSelected={selectedMenuName === AdminMenus.Research} />
            <DashboardSubMenu show={showBlog} listIcon={<AttractionsIcon />} primaryText="Blog" secondaryText="Create, List" subMenus={blogMenu} isSelected={selectedMenuName === AdminMenus.Blog} />
            <DashboardMenuItem show={showRedirects} redirectTo="/Admin/Redirect/RedirectUpsert" listIcon={<DirectionsIcon />} text="Redirects" isSelected={selectedMenuName === AdminMenus.Redirects} />
            <DashboardMenuItem show={showSurveysAdmin} redirectTo="/Admin/Survey/Admin/List" listIcon={<BallotIcon />} text="Admin Surveys" isSelected={selectedMenuName === AdminMenus.SurveyAdmin} />
            <DashboardMenuItem show={showSurveysClients} redirectTo="/Admin/Survey/Client/List" listIcon={<PollIcon />} text="Surveys" isSelected={selectedMenuName === AdminMenus.SurveyClient} />

            <ListItem onClick={onLogout} sx={{
                '&.MuiListItem-root:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText
                }
            }}>
                <ListItemIcon>
                    <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </div>
    )
}