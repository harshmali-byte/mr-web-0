import CaptchaModel from '../../Captcha/CaptchaModel';
import QuickGuideModel from './QuickGuideModel';

export default class RfqQueryModel {
    constructor() {
        return {
            Request: new QuickGuideModel(),
            Captcha: new CaptchaModel()
        }
    }
}