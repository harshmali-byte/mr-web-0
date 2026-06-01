import CaptchaModel from '../../../Captcha/CaptchaModel';
import StickyEmailRequestModel from './StickyEmailRequestModel';

export default class StickyEmailRequestQueryModel {
    constructor() {
        return {
            Request: new StickyEmailRequestModel(),
            Captcha: new CaptchaModel()
        }
    }
}