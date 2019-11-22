import {
    GET_ALL_COUNTRY,
    ADD_A_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
    BATCH_DELETE,
    UPDATE_STATUS_COUNTRY,
} from 'Actions/types';
import api from '../api';
import { NotificationManager } from 'react-notifications';
import qs from 'qs';

export const getAllCountry = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/country/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            dispatch({ type: GET_ALL_COUNTRY, payload: res.data.data });
            resolve(res.data);
        }).catch(error => {
            reject(error);
            NotificationManager.error(error.response.data.msg);
        })
    })
}

export const addCountry = (country) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/country/save', country).then(res => {
            dispatch({ type: ADD_A_COUNTRY, payload: res.data.data });
            resolve(res.data);
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const updateCountry = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/country/save', data).then(response => {
            dispatch({ type: UPDATE_COUNTRY, payload: response.data.data });
            NotificationManager.success(response.data.msg);
            resolve(response.data);
        }).catch(error => {
            NotificationManager.error(error.response.data.msg);
            reject(error.response.data);
        })
    })
}
export const batchDelete = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/country/delete', ids).then(res => {
            dispatch({ type: BATCH_DELETE, payload: res.data.data });
            NotificationManager.success('Delete success');
            resolve(res.data);
        }).catch(error => {
            NotificationManager.error('Delete false');
            reject(error);
        })
    })
}
export const updateCountryStatus = (data) => dispatch => {

    return new Promise((resolve, reject) => {
        api.post('/common/status', data).then(res => {
            dispatch({ type: UPDATE_STATUS_COUNTRY, payload: res.data.data });
            resolve(res.data);
        })
            .catch(error => {
                reject(error);
            })
    })
}
