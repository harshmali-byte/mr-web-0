import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function ResearchDetailsValidationModel() {
    return {
        Name: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Title', 'Name', 5, 800);
            }
        }),
        Code: new ValidationDataModel({
            Validate: function (value) {
                return Validator.TextValidator(value, 'Code', 'Code', 2);
            }
        }),
        CategoryId: new ValidationDataModel({
            Validate: function (value) {
                return Validator.SelectorValidator(value, "Category", 'CategoryId');
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
        }),
        PriceSingleUser: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'PriceSingleUser';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.currency, prop: prop, title: 'Single User Price', skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        PriceMultiUser: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'PriceMultiUser';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.currency, prop: prop, title: 'Multi User Price', skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        PriceEnterprise: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'PriceEnterprise';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.currency, prop: prop, title: 'Enterprise Price', skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        }),
        NumberOfPages: new ValidationDataModel({
            Validate: function (value) {
                let prop = 'NumberOfPages';

                let result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.number, prop: prop, title: 'Number Of Pages', skipRequiredValidation: true });

                if (!result) {
                    this.IsValid = true;
                }

                return result;
            }
        })
    }
}