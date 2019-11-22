import {
    GET_ALL_ACCOUNT,
    ADD_A_ACCOUNT,
    UPDATE_ACCOUNT,
    DELETE_ACCOUNT,
    CHANGE_STATUS,
    BATCH_DELETE
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAllACCOUNT = (filter = {}, type) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/customer/list/${type}`, {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ALL_ACCOUNT, payload: res.data.data });
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
            })
    })
}
export const createACCOUNT = (ACCOUNT) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/customer/save', ACCOUNT).then(res => {
            resolve(res.data);
            dispatch({ type: ADD_A_ACCOUNT, payload: res.data.data });
            NotificationManager.success(res.data.msg);
        })
            .catch(error => {
                reject(error.response);
                NotificationManager.error(error.response.data.msg);
            })
    })
}
export const updateACCOUNT = (ACCOUNTupdate) => dispatch => {
    console.log("account up date", ACCOUNTupdate)
    return new Promise((resolve, reject) => {
        api.post('/customer/save', ACCOUNTupdate).then(res => {
            resolve(res.data);
            dispatch({ type: UPDATE_ACCOUNT, payload: res.data.data });
            NotificationManager.success(res.data.msg);
        })
            .catch(error => {
                reject(error.response);
                NotificationManager.error(error.response.data.msg);
                console.log(error.response);
            })
    })
}
export const deleteACCOUNT = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/customer/delete', id).then(res => {
            dispatch({ type: DELETE_ACCOUNT, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success('Delete Success');
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const batchDelete = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/customer/delete', ids).then(res => {
            dispatch({ type: BATCH_DELETE, payload: res.data.data });
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
}


export const updatePermissionACCOUNT = (update) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/customer/permission', update).then(res => {
            console.log(res.data);
            resolve(res.data);
            dispatch({ type: UPDATE_ACCOUNT, payload: res.data.data });
            NotificationManager.success(res.data.msg);



        })
            .catch(error => {
                reject(error.response);
                // NotificationManager.error(error.response);
                console.log(error);

            })
    })
}

export const changeStatus = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/common/status', data).then(res => {
           
            dispatch({type: CHANGE_STATUS, payload: res.data.data});
            resolve(true)
        }).catch(err => {
            reject(err);
        })
    });
}

