import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const PublicLayout = dynamic(() => import('../../../components/Public/Layout/PublicLayout'));
const BuyConfirmation = dynamic(() => import('../../../components/Public/Confirmation/BuyConfirmation'));
const RequestConfirmation = dynamic(() => import('../../../components/Public/Confirmation/RequestConfirmation'));
const Loader = dynamic(() => import('../../../components/Common/Loader'));

export default function ThankYouSource() {
    const router = useRouter();
    const { requestType } = router.query;
    const [reqType, setReqType] = useState(null);

    useEffect(() => {
        if (!requestType) {
            return;
        }

        setReqType(requestType.toLowerCase());
    }, [requestType])

    if (!reqType) {
        return (
            <Loader />
        )
    }

    return (
        <PublicLayout isNotContainer={true}>
            {
                reqType === 'buy'
                    ? <BuyConfirmation />
                    : <RequestConfirmation requestType={requestType} />
            }
        </PublicLayout>
    )
}