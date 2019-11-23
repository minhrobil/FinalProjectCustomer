// export const baseUrl = 'http://35.187.254.248/thoxaydung/'

import configsys from "./config"
export const baseUrl = configsys.baseUrl;
export const base_asset = "http://joombooking.com/assets/"
const google_api_key = "AIzaSyAX2PANITOz9OwOu1oaj3QGZGQelGywIyA"
const pusher = "2bae7f804ef1483a7795"

export const TIME_OUT = 10000;
export const GET_METHOD = (sessionid = null) => {
    return ({
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            sessionid,

        }
    })
}
export const POST_METHOD = (sessionid = null, body, method = 'POST') => {
    return ({
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            sessionid
        },
        body: JSON.stringify(
            body
        )
    })

}
export const PUT_METHOD = (sessionid = null, body, method = 'PUT') => {
    return ({
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            sessionid
        },
        body: JSON.stringify(
            body
        )
    })

}
export const DELETE_METHOD = (sessionid = null, body = {}, method = 'DELETE') => {
    return ({
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            sessionid
        },
        body: JSON.stringify(
            body
        )
    })

}

let didTimeOut = false;
export const fetchTimeout = (url, object) => timeout => {
    return new Promise((resolve, reject) => {
        const funcTimeout = setTimeout(() => {
            didTimeOut = true;
            reject(new Error('Request timed out'));
        }, timeout);

        fetch(url, object)
            .then(response => {
                // Clear the timeout as cleanup
                clearTimeout(funcTimeout);
                if (!didTimeOut) {
                    resolve(response);
                }
            })
            .catch(err => {
                // console.log('fetch failed! ', err);
                // Rejection already happened with setTimeout
                if (didTimeOut) return;
                // Reject with error 
                reject(err);
            }); 
    })
}
const API = {
    tracking_payment_popup:{url: baseUrl + 'tracking/payment-popup'},
    get_pop_up_list:{url: baseUrl + 'posts?'},
    get_pop_up_detail:{url: baseUrl + 'post/'},
    read_post:{url: baseUrl + 'post/'},
    get_rating_value:{url: baseUrl + 'ratings/value?account='},
    list_my_rating:{url: baseUrl + 'my-ratings'},
    list_rating_account:{url: baseUrl + 'ratings?account='},
    get_rating_account:{url: baseUrl + 'ratings/value?account='},
    count_unread_chat: { url: baseUrl + 'conversations/unread' },
    create_rating: { url: baseUrl + 'rating' },
    log_error: {url: baseUrl + "tracking/error"},
    log_info: {url: baseUrl + "tracking/info"},
    list_account_contacted: {url: baseUrl + "accounts/contacted"},
    auth: { url: baseUrl + 'auth?accesstoken=' },
    config: { url: baseUrl + 'config', method: GET_METHOD },
    account_detail: { url: baseUrl + 'account/', method: GET_METHOD },
    account_update: { url: baseUrl + 'account/' },
    call_api: { url: baseUrl + 'call?' },
    tracking: { url: baseUrl + 'tracking/account' }, 
    list_chat: { url: baseUrl + 'conversations?' },
    create_conversation: { url: baseUrl + 'conversation' },
    update_conversation: { url: baseUrl + 'conversation/' },
    search_conversation: { url: baseUrl + 'conversations/search?' },
    get_chat_detail: { url: baseUrl + 'conversation/' },
    create_chat: { url: baseUrl + 'chat' },
    check_chat: { url: baseUrl + 'conversation/check?receiver=' },
    list_partner: { url: baseUrl + 'partners' },
    get_partner_detail: { url: baseUrl + 'partner/' },
    list_category:{url: baseUrl + 'categories'},
    list_worker: { url: baseUrl + 'accounts?type=worker', method: GET_METHOD },
    list_invite: { url: baseUrl + 'list-invited', method: GET_METHOD },
    point: { url: baseUrl + 'point', method: POST_METHOD },
    google_places_autocomplete: { url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?&types=geocode&language=vi&region=vn&components=country:vn&key=" + google_api_key + "&input=" },
    google_place_id: { url: "https://maps.googleapis.com/maps/api/place/details/json?&key=" + google_api_key + "&placeid=" },
    google_place_name_from_coordinate: { url: "https://maps.googleapis.com/maps/api/geocode/json?&key=" + google_api_key + "&latlng=" },
    point_history: { url: baseUrl + 'points?account=', method: GET_METHOD },
    createAcc: { url: baseUrl + 'account' },
    avatar: { url: baseUrl + 'account/upload-avatar' },
    list_notification: { url: baseUrl + 'messages-posts' },
    subscribe_onsignal: { url: baseUrl + 'subscriber' },
    unsubscribe_onsignal: { url: baseUrl + 'subscriber/token' },
    notification_detail: { url: baseUrl + 'messages/account/' }, 
    delete_all_notification: { url: baseUrl + 'messages/account/empty' },
    delete_notification: { url: baseUrl + 'messages/account/' }, 
    end_point: { url: "https://thoxaydung.xyz/endpoint.json" },
    delete_product_images:{ url: baseUrl + 'products/'},
    list_product: { url: baseUrl + 'products?' },
    create_product: { url: baseUrl + 'products' },
    update_product: { url: baseUrl + 'products/' },
    detail_product: { url: baseUrl + 'products/' }, 
    delete_product: { url: baseUrl + 'products/' },
    list_my_product: { url: baseUrl + 'my-products?' }

}
export const JobAPI = {
    list_job_by_worker: { url: baseUrl + 'jobs/worker?', method: GET_METHOD },
    list_job_by_host: { url: baseUrl + 'jobs/host?', method: GET_METHOD }, 
    job_detail: { url: baseUrl + 'job/', method: GET_METHOD },
    create_job: { url: baseUrl + 'job', method: GET_METHOD },
    update_job: { url: baseUrl + 'job/', method: POST_METHOD },
    edit_job_images: { url: baseUrl + 'job/', method: POST_METHOD },
    delete_job_images: { url: baseUrl + 'job/', method: POST_METHOD },
    pin_job: { url: baseUrl + 'job/', method: PUT_METHOD },
    renew_job: { url: baseUrl + 'job/', method: PUT_METHOD },
    assigned_job: { url: baseUrl + 'job/', method: PUT_METHOD },
    call_job: { url: baseUrl + 'call?job=', method: PUT_METHOD },
}
export const PhoneCallAPI = {
    host_call_worker: { url: baseUrl + 'call/worker/', method: PUT_METHOD },
    worker_call_host: { url: baseUrl + 'call/job/', method: PUT_METHOD }
}

export default API
import axios from 'axios';
import { getAsyncStorage, removeAsyncStorage } from '../utilities/AsyncStorage';
import AsyncStorageKeys from './asyncStorageKeyConfig';
const callBack = type => callback => callback(type);

export const config = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})
