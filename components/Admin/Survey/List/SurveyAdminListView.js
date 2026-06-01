import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AdminMenus } from '../../../Common/AdminConstants';

const AdminDashboard = dynamic(() => import('../../Dashboard/AdminDashboard'));
const SurveyTable = dynamic(() => import('./SurveyTable'));

export default function SurveyAdminListView() {
    const [authorization, setAuthorization] = useState(null);

    return (
        <AdminDashboard selectedMenuName={AdminMenus.SurveyAdmin} setAuthorization={setAuthorization}>
            <SurveyTable authorization={authorization} isAdminView={true} />
        </AdminDashboard>
    )
}