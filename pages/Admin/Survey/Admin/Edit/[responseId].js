import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { AdminMenus } from '../../../../../components/Common/AdminConstants';

const AdminDashboard = dynamic(() => import('../../../../../components/Admin/Dashboard/AdminDashboard'));
const SurveyEdit = dynamic(() => import('../../../../../components/Admin/Survey/Upsert/SurveyEdit'));
const Loader = dynamic(() => import('../../../../../components/Common/Loader'));

export default function EditSurvey() {
    const router = useRouter();
    const { responseId } = router.query;

    const [resId, setResId] = useState(0);
    const [authorization, setAuthorization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!responseId) {
            return;
        }

        let rId = 0;
        try {
            rId = parseInt(responseId);
        }
        catch {
            rId = 0;
        }
        setResId(rId);
    }, [responseId])

    useEffect(() => {
        if (!resId) {
            return;
        }
        setIsLoading(false);
    }, [resId])

    if (isLoading) {
        return <Loader />
    }

    return (
        <AdminDashboard selectedMenuName={AdminMenus.SurveyAdmin} setAuthorization={setAuthorization}>
            <SurveyEdit authorization={authorization} responseId={resId} isAdminView={true} />
        </AdminDashboard>
    )
}