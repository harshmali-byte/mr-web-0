import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function BlogDetailsValidationModel() {
    return {
        Name: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Title', 'Name', 5, 800);
            }
        }),
        ResearchPostKey: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Research Post Key', 'ResearchPostKey', 5, 1000000, true);
            }
        }),
        PostPublishDate: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'PostPublishDate';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.isDate, prop: prop, title: 'Publish Date', skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        })
    }
}