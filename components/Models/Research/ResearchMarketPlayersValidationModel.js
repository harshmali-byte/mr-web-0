import ValidationDataModel from '../Validation/ValidationDataModel';
import { Validator } from '../../Utils/Validator';

export default function ResearchMarketPlayersValidationModel() {
    return {
        MarketPlayers: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Market Players', 'MarketPlayers', 5, 1000000, true);
            }
        }),
        Segments: new ValidationDataModel({
            Validate: function (value) {
                if (!value) {
                    return null;
                }
                return Validator.TextValidator(value, 'Segments', 'Segments', 5, 1000000, true);
            }
        })
    }
}