export default class CaptchaModel {
    constructor(props) {
        return {
            Save: props && props.Save ? props.Save : '',
            Edit: props && props.Edit ? props.Edit : '',
            Captcha: props && props.Captcha ? props.Captcha : '',
            Answer: props && props.Answer ? props.Answer : '',
            Id: props && props.Id ? props.Id : ''
        }
    }
}