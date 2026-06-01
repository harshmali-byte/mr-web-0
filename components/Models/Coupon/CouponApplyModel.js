import CouponModel from "./CouponModel";

export default class CouponApplyModel {
    constructor(props) {
        return {
            Coupon: new CouponModel(props ? props.Coupon : null),
            OfferPrice: props && props.OfferPrice ? props.OfferPrice : '',
            SavedAmount: props && props.SavedAmount ? props.SavedAmount : '',
        }
    }
}