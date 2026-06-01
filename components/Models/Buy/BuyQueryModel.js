import CaptchaModel from "../Captcha/CaptchaModel";
import BuyModel from "./BuyModel";

export default class BuyQueryModel {
    constructor(model) {
        return {
            Request: new BuyModel(model),
            Captcha: new CaptchaModel()
        }
    }
}