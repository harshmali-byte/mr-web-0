import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function BlogInfoValidationModel() {
    return {
        Summary: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Summary', 'Summary', 5, 1000000, true);
            }
        })
    }
}