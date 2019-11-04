import {
    GET_ALL_DESTINATION,
    ADD_A_DESTINATION,
    UPDATE_DESTINATION,
    DELETE_DESTINATION,
    BATCH_DELETE
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAllDestination = (filter = {}) => dispatch => {
    console.log(filter)
    return new Promise((resolve, reject) => {
        api.get('/destination/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ALL_DESTINATION, payload: res.data.data });


        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);

            })
    })
}

export const createDestination = (destination) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/destination/save', destination).then(res => {
            console.log(res.data);
            dispatch({ type: ADD_A_DESTINATION, payload: res.data.data });
            resolve(res.data);

        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);

            })
    })
}

export const updateDestination = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/destination/save', data).then(response => {

            dispatch({ type: UPDATE_DESTINATION, payload: response.data.data });
            NotificationManager.success(response.data.msg);



            resolve(response.data);

        }).catch(error => {
            NotificationManager.error(error.response.data.msg);
            reject(error.response.data);


        })
    })
}
export const deleteDestination = (idDestination) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/destination/delete', idDestination).then(res => {
            dispatch({ type: DELETE_DESTINATION, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success('Delete Success');
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const batchDelete = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/destination/delete', data).then(res => {
            dispatch({ type: BATCH_DELETE, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success('Delete Success');
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}