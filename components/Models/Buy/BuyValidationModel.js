import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function BuyValidationModel() {
    return {
        FullName: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Full Name', 'FullName', 5);
            }
        }),
        Email: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'Email';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.email, prop: prop, title: 'Email' });

                if (result)
                    return result;

                result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lengthLimit, prop: prop, title: 'Email', maxLen: 500, minLen: 5 });

                if (!result) {
                    this.IsValid = true;
                }
                return result;
            }
        }),
        ContactNo: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'ContactNo';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.required, prop: prop, title: 'Contact Number' });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        CompanyName: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, "Company Name", 'CompanyName', 5);
            }
        }),
        JobTitleId: new ValidationDataModel({
            Validate: function (value) {
                return Validator.SelectorValidator(value, "Job Title", 'JobTitleId');
            }
        }),
        CountryId: new ValidationDataModel({
            Validate: function (value) {
                return Validator.SelectorValidator(value, 'Country', 'CountryId');
            }
        }),
        Address: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Address', 'Address', 5);
            }
        }),
        Zip: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'ZIP', 'Zip');
            }
        }),
        City: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'City', 'City');
            }
        }),
        State: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'State', 'State');
            }
        }),
        PaymentMode: new ValidationDataModel({
            Validate: function (value) {
                return Validator.SelectorValidator(value, 'Payment Mode', 'PaymentMode');
            }
        }),
        PurchasePlan: new ValidationDataModel({
            Validate: function (value) {
                return Validator.SelectorValidator(value, 'PurchasePlan', 'PurchasePlan');
            }
        }),
        Description: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Description', 'Description');
            }
        })
    }
}