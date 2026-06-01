import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from "../../Utils/Validator";

export default function SubscribeModelValidation() {
    return {
        EmailId: new ValidationDataModel({
            DisplayName: 'Email Id',
            Validate: function (value) {
                let prop = 'EmailId';
                let displayName = 'Email Id';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.required, prop: prop, title: displayName });
                if (result) {
                    return result;
                }

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: displayName, maxLen: 500 });
                if (!result) {
                    this.IsValid = true;
                }

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.email, prop: prop, title: displayName });
                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        })
    }
}