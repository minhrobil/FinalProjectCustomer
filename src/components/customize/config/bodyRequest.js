import { getDataRedux } from "../redux/store";
import { language } from "../language/translate";
export const body_spend_point_post_job = (job_id) => {
    body_change_point = {
        amount: getDataRedux().config.config.point.spendForPostJob,
        type: "spend",
        action: "post",
        object_id: job_id,
        content: language('global.text_content_post_job')
    }
    return body_change_point
}
export const body_spend_point_view_job = (job_id) => {
    body_change_point = {
        amount: getDataRedux().config.config.point.spendForViewJob,
        type: "spend",
        action: "view",
        object_id: job_id,
        content: language('global.text_content_view_job')
    }
    return body_change_point
}
export const body_spend_point_pin_job = (job_id) => {
    body_change_point = {
        amount: getDataRedux().config.config.point.spendForPinJob,
        type: "spend",
        action: "pin",
        object_id: job_id,
        content: language('global.text_content_pin_job')
    }
    return body_change_point
}
export const body_spend_point_renew_job = (job_id) => {
    body_change_point = {
        amount: getDataRedux().config.config.point.spendForRenew,
        type: "spend",
        action: "renew",
        object_id: job_id,
        content: language('global.text_content_renew_job')
    }
    return body_change_point
}
export const body_spend_point_view_account = (account_id) => {
    body_change_point = {
        amount: getDataRedux().config.config.point.spendForViewAccount,
        type: "spend",
        action: "view",
        object_id: account_id,
        content: language('global.text_content_view_account')
    }
    return body_change_point
}
export const body_pin_job = () => {
    return {
        action: "pin",
        is_pin: true,
        pin_date: new Date()
    }
}
export const body_renew_job = (expired_date) => {
    return {
        expired_date: expired_date
    }
}
export const body_publish_job = () => {
    return {
        action: "normal",
        status: 1
    }
}
export const body_unpublish_job = () => {
    return {
        action: "normal",
        status: 0
    }
}