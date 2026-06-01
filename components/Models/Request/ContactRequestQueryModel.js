import CaptchaModel from '../Captcha/CaptchaModel';
import ContactRequestModel from "./ContactRequestModel";

export default class ContactRequestQueryModel {
    constructor() {
        return {
            Request: new ContactRequestModel(),
            Captcha: new CaptchaModel()
        }
    }
}