import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SurveyQuestionTypes } from '../../../Common/Constants';

const Options = {
    SingleSelect: dynamic(import('./SurveySingleSelectOptions')),
    MultiSelect: dynamic(import('./SurveyMultiSelectOptions')),
    NumberInput: dynamic(import('./SurveyNumberInputOptions')),
    TextInput: dynamic(import('./SurveyTextInputOptions')),
    RangeInput: dynamic(import('./SurveyRangeSelectOptions'))
}

export default function SurveyOptions({ question, options, currentResponse, onOptionSelected, setToastMessage }) {
    const [Value, setValue] = useState(null);
    const [preSelectedOptions, setPreSelectedOptions] = useState([]);
    const [preAnswerText, setAnswerText] = useState('');

    useEffect(() => {
        if (!question) {
            return;
        }

        let queType = SurveyQuestionTypes.find(f => f.id === question.QuestionType);

        if (!queType || !queType.name) {
            return;
        }

        let val = Options[queType.name]
        setValue(val);
    }, [question])

    useEffect(() => {
        if (!currentResponse) {
            setPreSelectedOptions([]);
            setAnswerText('');
            return;
        }

        if (currentResponse.AnswerText && currentResponse.AnswerText.trim().length > 0) {
            setPreSelectedOptions([]);
            setAnswerText(currentResponse.AnswerText.trim());
            return;
        }
        else {
            setAnswerText('');
        }

        if (currentResponse.SurveyQuestionOptionsIds) {
            setPreSelectedOptions(currentResponse.SurveyQuestionOptionsIds)
        }
        else {
            setPreSelectedOptions([]);
        }
    }, [currentResponse])

    if (!question || !Value || !options) {
        return null;
    }

    return <Value question={question} options={options} preSelectedOptions={preSelectedOptions} preAnswerText={preAnswerText} onOptionSelected={onOptionSelected} setToastMessage={setToastMessage} />
}