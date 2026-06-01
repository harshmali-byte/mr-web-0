import CaptchaModel from '../Captcha/CaptchaModel';
import RfqModel from './RfqModel';

export default class RfqQueryModel {
    constructor() {
        return {
            Request: new RfqModel(),
            Captcha: new CaptchaModel()
        }
    }
}