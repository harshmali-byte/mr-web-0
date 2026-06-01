import ValidationDataModel from '../../../Validation/ValidationDataModel';
import { Validator } from '../../../../Utils/Validator';

export default function StickyEmailRequestValidationModel() {
    return {
        Email: new ValidationDataModel({
            DisplayName: 'Business Email',
            Validate: function (value) {
                let prop = 'Email';
                let displayName = 'Business Email';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.required, prop: prop, title: displayName });

                if (result)
                    return result;

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.email, prop: prop, title: displayName });

                if (result)
                    return result;

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: displayName, maxLen: 500, minLen: 5 });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        })
    }
}