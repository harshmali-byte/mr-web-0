export default class CouponModel {
    constructor(props) {
        return {
            Name: props && props.Name ? props.Name : '',
            CouponApplyMessage: props && props.CouponApplyMessage ? props.CouponApplyMessage : '',
            Rules: props && props.Rules ? props.Rules : ''
        }
    }
}