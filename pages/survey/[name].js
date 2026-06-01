import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const SurveyView = dynamic(() => import('../../components/Public/Survey/SurveyView'));

export default function Survey() {
    const router = useRouter();
    const { name } = router.query;

    return (
        <SurveyView name={name} />
    )
}