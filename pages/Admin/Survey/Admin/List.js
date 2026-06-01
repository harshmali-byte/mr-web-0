import React from 'react';
import dynamic from 'next/dynamic';

const SurveyAdminListView = dynamic(() => import('../../../../components/Admin/Survey/List/SurveyAdminListView'));

export default function SurveyList() {
    return (
        <SurveyAdminListView />
    )
}