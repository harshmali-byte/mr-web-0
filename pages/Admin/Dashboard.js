import React from 'react';
import { useState } from 'react';
import { useAuth } from "../../components/Auth/AuthContext"
import AdminDashboard from "../../components/Admin/Dashboard/AdminDashboard";
import { IconButton, Badge, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AdminMenus } from '../../components/Common/AdminConstants';

export default function Dashboard() {
    const auth = useAuth();
    const [OpenUpsertLead, setOpenUpsertLead] = useState(false);

    function ToolBarAction() {
        return (
            <IconButton color="inherit" onClick={() => setOpenUpsertLead(true)}>
                <Badge color="secondary">
                    <AddCircleOutlineIcon />
                </Badge>
            </IconButton>
        )
    }

    return (
        <AdminDashboard toolBarMenu={ToolBarAction()} selectedMenuName={AdminMenus.Dashboard}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="h6" style={{ fontSize: 14, marginRight: 5 }}>Welcome</Typography>
                <Typography variant="h5" component="h5">{auth.authData ? auth.authData.FirstName : ''} {auth.authData ? auth.authData.LastName : ''}</Typography>
            </div>
        </AdminDashboard>
    )
}