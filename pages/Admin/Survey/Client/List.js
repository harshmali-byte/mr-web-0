import React from 'react';
import dynamic from 'next/dynamic';

const SurveyClientListView = dynamic(() => import('../../../../components/Admin/Survey/List/SurveyClientListView'));

export default function SurveyList() {
    return (
        <SurveyClientListView />
    )
}