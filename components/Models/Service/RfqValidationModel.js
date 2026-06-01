import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function RfqValidationModel() {
    return {
        FullName: new ValidationDataModel({
            DisplayName: 'Full Name',
            Validate: function (value) {
                let prop = 'FullName';
                let displayName = 'Full Name';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.required, prop: prop, title: displayName });

                if (result) {
                    return result;
                }
                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: displayName, maxLen: 500, minLen: 5 });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        CompanyName: new ValidationDataModel({
            DisplayName: 'Company Name',
            Validate: function (value) {
                let prop = 'CompanyName';
                let displayName = 'Company Name';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.required, prop: prop, title: displayName });

                if (result)
                    return result;

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: displayName, maxLen: 500, minLen: 5 });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
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
            Validate: function (value) {
                let prop = 'CountryId';
                let displayName = 'Country';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.requiredSelection, prop: prop, title: displayName });

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

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        JobTitleId: new ValidationDataModel({
            DisplayName: 'Job Title',
            Validate: function (value) {
                let prop = 'JobTitleId';
                let displayName = 'Job Title';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.requiredSelection, prop: prop, title: displayName });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        Description: new ValidationDataModel({
            DisplayName: 'Query',
            Validate: function (value) {
                let prop = 'Description';
                let displayName = 'Query';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: displayName, maxLen: 500, minLen: 0, skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }
                return result;
            }
        }),
        InterestId: new ValidationDataModel({
            DisplayName: 'Interest',
            Validate: function (value) {
                let prop = 'InterestId';
                let displayName = 'Interest';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.requiredSelection, prop: prop, title: displayName });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        })
    }
}