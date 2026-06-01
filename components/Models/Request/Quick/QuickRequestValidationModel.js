import ValidationDataModel from '../../Validation/ValidationDataModel';
import { Validator } from '../../../Utils/Validator';

export default function QuickRequestValidationModel() {
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
        }),
        CountryId: new ValidationDataModel({
            DisplayName: 'Country',
            Validate: function (value, model) {
                let prop = 'CountryId';
                let displayName = 'Country';

                let result = Validator.ValidateValue({ value: model.ContactNo, type: Validator.ValidateType.required, prop: 'ContactNo', title: 'Contact Number', maxLen: 0, minLen: 10 });
                if (result) {
                    this.IsValid = true;
                    return null;
                }

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.requiredSelection, prop: prop, title: displayName });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        ContactNo: new ValidationDataModel({
            DisplayName: 'Contact Number',
            Validate: function (value) {
                let prop = 'ContactNo';
                let displayName = 'Contact Number';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.required, prop: prop, title: displayName });

                if (result) {
                    this.IsValid = true;
                    return null;
                }

                return result;
            }
        })
    }
}