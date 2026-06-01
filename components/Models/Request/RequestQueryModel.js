import CaptchaModel from '../Captcha/CaptchaModel';
import RequestModel from "./RequestModel";

export default class RequestQueryModel {
    constructor() {
        return {
            Request: new RequestModel(),
            Captcha: new CaptchaModel()
        }
    }
}