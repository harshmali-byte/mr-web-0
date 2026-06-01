import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function RedirectDetailsValidationModel() {
    return {
        Source: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Source', 'Source', 5, 3000);
            }
        }),
        Destination: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Destination', 'Destination', 5, 3000);
            }
        })
    }
}