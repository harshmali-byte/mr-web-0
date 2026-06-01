import CaptchaModel from '../../Captcha/CaptchaModel';
import QuickRequestModel from "./QuickRequestModel";

export default class QuickRequestQueryModel {
    constructor() {
        return {
            Request: new QuickRequestModel(),
            Captcha: new CaptchaModel()
        }
    }
}