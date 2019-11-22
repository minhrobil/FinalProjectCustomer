import {
    CHANGE_STATUS,
    PUBLISH_STATUSES,
    UNPUBLISH_STATUSES
} from './types';
import api from '../api';
import { NotificationManager } from 'react-notifications';

export const changeStatus = (data) => dispatch => {
    console.log(data);
    
    return new Promise((resolve, reject) => {
        return api.post('/common/status', data).then(res => {
            console.log(res.data)
            dispatch({type: CHANGE_STATUS, payload: res.data.data});
            resolve(true)
        }).catch(err => {
            reject(err);
        })
    });
}

export const publish = (data) => dispatch => {
    
    return new Promise((resolve, reject) => {
        return api.post('/common/publish', data).then(res => {
            
            dispatch({type: PUBLISH_STATUSES, payload: res.data.data});
            resolve(true)
        }).catch(err => {
            reject(err);
        })
    });
}
export const unpublish = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/common/unpublish', data).then(res => {
            
            dispatch({type: UNPUBLISH_STATUSES, payload: res.data.data});
            resolve(true)
        }).catch(err => {
            reject(err);
        })
    });
}