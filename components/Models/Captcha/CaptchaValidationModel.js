import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function CaptchaValidationModel() {
    return {
        Answer: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'Answer'
                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.number, prop: prop, title: 'Answer' });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        })
    }
}