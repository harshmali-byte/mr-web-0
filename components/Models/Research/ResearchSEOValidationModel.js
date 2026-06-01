import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function ResearchSEOValidationModel() {
    return {
        MetaTitle: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Meta Title', 'MetaTitle', 5, 800, true);
            }
        }),
        MetaUrl: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Meta Url', 'MetaUrl', 5, 800, true);
            }
        }),
        MetaDescription: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "Meta Description", 'MetaDescription', 5, 800, true);
            }
        }),
        MetaTags: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "Meta Tags", 'MetaTags', 5, null, true);
            }
        }),
        PostKey: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "Post Key", 'PostKey', 5, null, true);
            }
        }),
        CanonicalUrl: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, "Canonical Url", 'CanonicalUrl', 5, null, true);
            }
        })
    }
}