import ValidationDataModel from '../../Validation/ValidationDataModel';
import { Validator } from '../../../Utils/Validator';

function ValidteResponseText(value, prop, obj, minLen, maxLen) {
    if (!value) {
        obj.IsValid = true;
        return;
    }

    let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: obj.DisplayName, maxLen: maxLen || 500, minLen: minLen || 5, skipRequiredValidation: true });

    if (!result) {
        obj.IsValid = true;
    }

    return result;
}

function ValidteResponseNumber(value, prop, obj) {
    let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.number, prop: prop, title: obj.DisplayName, skipRequiredValidation: true });

    if (result) {
        obj.IsValid = false;
    }

    result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.greaterThan, minValue: 1, prop: prop, title: obj.DisplayName, skipRequiredValidation: true });

    if (!result) {
        obj.IsValid = true;
    }

    return result;
}

function ValidteResponseSelector(value, prop, obj, isRequired) {
    if (!isRequired && !value) {
        obj.IsValid = true;
        return;
    }

    let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.requiredSelection, prop: prop, title: obj.DisplayName });

    if (!result) {
        obj.IsValid = true;
    }

    return result;
}

export default function SurveyFilterValidationModel() {
    return {
        Survey: new ValidationDataModel({
            DisplayName: 'Survey',
            Validate: function (value) {
                return ValidteResponseSelector(value, 'Survey', this, true);
            }
        })
    }
}