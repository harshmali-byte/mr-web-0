import CaptchaModel from '../../Captcha/CaptchaModel';
import SurveyResponseModel from "./SurveyResponseModel";

export default class SurveyResponseQueryModel {
    constructor() {
        return {
            Request: new SurveyResponseModel(),
            Captcha: new CaptchaModel()
        }
    }
}