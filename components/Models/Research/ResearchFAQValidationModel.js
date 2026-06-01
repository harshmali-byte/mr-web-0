import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function ResearchFAQModelModel() {
    return {
        Ratings: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }

                let prop = 'Ratings';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.number, prop: prop, title: prop, skipRequiredValidation: true });

                if (result) {
                    return result;
                }

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.greaterThanEqualTo, prop: prop, title: prop, minValue: 0, skipRequiredValidation: true });

                if (result) {
                    return result;
                }

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lessThanEqualTo, prop: prop, title: prop, minValue: 5, skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        Question: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Question', 'Question', 5, 500, true);
            }
        }),
        Answer: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "Answer", 'Answer', 5, 500, true);
            }
        })
    }
}