import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function ResearchInfoValidationModel() {
    return {
        Summary: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Summary', 'Summary', 5, 1000000, true);
            }
        }),
        TableOfContents: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Table of Contents', 'TableOfContents', 5, 1000000, true);
            }
        }),
        ListOfTables: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "List of Tables", 'ListOfTables', 5, 1000000, true);
            }
        }),
        ListOfFigures: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "List of Figures", 'ListOfFigures', 5, 1000000, true);
            }
        }),
        Schemas: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "Schemas", 'Schemas', 5, 1000000, true);
            }
        })
    }
}